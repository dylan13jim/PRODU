import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class Autenticacion {
  
  // Observable para el estado del usuario
  private usuarioSubject = new BehaviorSubject<any>(null);
  usuario$ = this.usuarioSubject.asObservable();

  // Observable para el estado de carga
  private cargandoSubject = new BehaviorSubject<boolean>(false);
  cargando$ = this.cargandoSubject.asObservable();

  constructor(private apiService: ApiService) {
    // Verificar si hay un usuario guardado al iniciar
    this.verificarUsuarioGuardado();
  }

  // ==================== MÉTODOS PRIVADOS ====================

  private verificarUsuarioGuardado(): void {
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');
    
    if (token && usuarioGuardado) {
      try {
        const usuario = JSON.parse(usuarioGuardado);
        this.usuarioSubject.next(usuario);
        
        // Verificar que el token siga siendo válido
        this.verificarTokenValido();
      } catch (error) {
        console.error('Error al parsear usuario guardado:', error);
        this.cerrarSesion();
      }
    }
  }

  private verificarTokenValido(): void {
    this.apiService.obtenerPerfilUsuario().subscribe({
      next: (usuario) => {
        // Token válido, actualizar datos del usuario
        this.usuarioSubject.next(usuario);
        localStorage.setItem('usuario', JSON.stringify(usuario));
      },
      error: (error) => {
        console.error('Token inválido:', error);
        this.cerrarSesion();
      }
    });
  }

  private guardarSesion(usuario: any, token: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioSubject.next(usuario);
  }

  private limpiarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }

  // ==================== MÉTODOS PÚBLICOS ====================

  /**
   * Iniciar sesión con email y contraseña
   */
  iniciarSesion(email: string, contraseña: string): Observable<any> {
    this.cargandoSubject.next(true);
    
    return this.apiService.login(email, contraseña).pipe(
      tap((response: any) => {
        if (response.token && response.usuario) {
          this.guardarSesion(response.usuario, response.token);
          console.log('✅ Sesión iniciada exitosamente:', response.usuario.nombre);
        }
      }),
      catchError((error) => {
        console.error('❌ Error al iniciar sesión:', error);
        throw error;
      }),
      tap(() => {
        this.cargandoSubject.next(false);
      })
    );
  }

  /**
   * Registrar nuevo usuario
   */
  registrarUsuario(datosUsuario: any): Observable<any> {
    this.cargandoSubject.next(true);
    
    return this.apiService.registrar(datosUsuario).pipe(
      tap((response: any) => {
        if (response.token && response.usuario) {
          this.guardarSesion(response.usuario, response.token);
          console.log('✅ Usuario registrado exitosamente:', response.usuario.nombre);
        }
      }),
      catchError((error) => {
        console.error('❌ Error al registrar usuario:', error);
        throw error;
      }),
      tap(() => {
        this.cargandoSubject.next(false);
      })
    );
  }

  /**
   * Cerrar sesión
   */
  cerrarSesion(): void {
    this.limpiarSesion();
    console.log('✅ Sesión cerrada');
  }

  /**
   * Verificar si el usuario está logueado
   */
  estaLogueado(): boolean {
    return !!localStorage.getItem('token') && !!this.usuarioSubject.value;
  }

  /**
   * Obtener el token actual
   */
  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Obtener el usuario actual
   */
  obtenerUsuario(): any {
    return this.usuarioSubject.value;
  }

  /**
   * Obtener datos del usuario desde el servidor
   */
  actualizarPerfilUsuario(): Observable<any> {
    return this.apiService.obtenerPerfilUsuario().pipe(
      tap((usuario) => {
        this.usuarioSubject.next(usuario);
        localStorage.setItem('usuario', JSON.stringify(usuario));
      })
    );
  }

  /**
   * Verificar si el usuario tiene un rol específico
   */
  tieneRol(rol: string): boolean {
    const usuario = this.obtenerUsuario();
    return usuario && usuario.roles && usuario.roles.includes(rol);
  }

  /**
   * Verificar si la sesión está por expirar
   */
  sesionPorExpirar(): boolean {
    const token = this.obtenerToken();
    if (!token) return false;
    
    try {
      // Decodificar token JWT (simple)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const ahora = Date.now() / 1000;
      const tiempoRestante = payload.exp - ahora;
      
      // Si queda menos de 5 minutos
      return tiempoRestante < 300;
    } catch (error) {
      console.error('Error al verificar expiración del token:', error);
      return true;
    }
  }

  // ==================== MÉTODOS DE UTILIDAD ====================

  /**
   * Método temporal para simular login (solo para desarrollo)
   */
  simularLogin(): void {
    const usuarioTemporal = {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      correo: 'juan@email.com',
      avatar: 'https://via.placeholder.com/150'
    };
    
    this.guardarSesion(usuarioTemporal, 'token-temporal-123');
    console.log('✅ Login simulado exitoso');
  }

  /**
   * Limpiar datos temporales (solo para desarrollo)
   */
  limpiarDatosTemporal(): void {
    this.limpiarSesion();
    console.log('✅ Datos temporales limpiados');
  }

  /**
   * Verificar conexión con el servidor
   */
  verificarConexionServidor(): Observable<any> {
    return this.apiService.verificarConexion();
  }
}