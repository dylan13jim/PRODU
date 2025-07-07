import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // === DATOS DEL FORMULARIO ===
  email: string = '';
  password: string = '';
  
  // === ESTADOS ===
  cargando: boolean = false;
  error: string = '';
  mostrarPassword: boolean = false;

  // === CONFIGURACIÓN API ===
  private readonly API_URL = 'http://localhost:3000';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  // === MÉTODO PRINCIPAL DE LOGIN ===
  async onLogin(): Promise<void> {
    // Validar campos
    if (!this.validarFormulario()) {
      return;
    }

    this.cargando = true;
    this.error = '';

    try {
      // Llamar a tu API
      const response = await this.realizarLogin();
      
      // Si es exitoso, guardar datos y redirigir
      this.manejarLoginExitoso(response);
      
    } catch (error: any) {
      // Manejar errores
      this.manejarError(error);
    } finally {
      this.cargando = false;
    }
  }

  // === VALIDACIONES ===
  private validarFormulario(): boolean {
    if (!this.email) {
      this.error = 'El email es requerido';
      return false;
    }

    if (!this.esEmailValido(this.email)) {
      this.error = 'Ingresa un email válido';
      return false;
    }

    if (!this.password) {
      this.error = 'La contraseña es requerida';
      return false;
    }

    if (this.password.length < 3) {
      this.error = 'La contraseña debe tener al menos 3 caracteres';
      return false;
    }

    return true;
  }

  private esEmailValido(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // === LLAMADA A LA API ===
  private realizarLogin(): Promise<any> {
    const datosLogin = {
      correo: this.email,
      contraseña: this.password
    };

    return this.http.post(`${this.API_URL}/auth/login`, datosLogin).toPromise();
  }

  // === MANEJO DE RESPUESTAS ===
  private manejarLoginExitoso(response: any): void {
    console.log('✅ Login exitoso:', response);
    
    // Guardar token y usuario en localStorage
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    
    if (response.usuario) {
      localStorage.setItem('usuario', JSON.stringify(response.usuario));
    }

    // Mostrar mensaje de éxito
    alert(`¡Bienvenido ${response.usuario?.nombre || 'Usuario'}!`);
    
    // Redirigir a la aplicación principal
    this.redirigirAApp();
  }

  private manejarError(error: any): void {
    console.error('❌ Error en login:', error);
    
    if (error.status === 401) {
      this.error = 'Email o contraseña incorrectos';
    } else if (error.status === 0) {
      this.error = 'No se puede conectar con el servidor. Verifica que esté corriendo en puerto 3000.';
    } else {
      this.error = error.error?.mensaje || 'Error al iniciar sesión. Intenta nuevamente.';
    }
  }

  // === NAVEGACIÓN ===
  private redirigirAApp(): void {
    // Redirigir a la aplicación principal
    window.location.href = 'http://localhost:4200/';
  }

  irARegistro(): void {
    this.router.navigate(['/registro']);
  }

  // === UTILIDADES UI ===
  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  limpiarError(): void {
    this.error = '';
  }  
}