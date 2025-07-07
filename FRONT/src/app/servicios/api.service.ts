import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
  
    private readonly API_URL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    // ==================== MÉTODOS PRIVADOS ====================
    
    private obtenerHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
        });
    }

    // ==================== AUTENTICACIÓN ====================
    
    /**
     * Iniciar sesión con email y contraseña
     */
    login(email: string, contraseña: string): Observable<any> {
        const datos = {
        correo: email,
        contraseña: contraseña
        };
        
        return this.http.post(`${this.API_URL}/auth/login`, datos);
    }

    /**
     * Registrar nuevo usuario
     */
    registrar(datosUsuario: any): Observable<any> {
        return this.http.post(`${this.API_URL}/auth/register`, datosUsuario);
    }

    // ==================== USUARIO ====================
    
    /**
     * Obtener perfil del usuario actual
     */
    obtenerPerfilUsuario(): Observable<any> {
        return this.http.get(`${this.API_URL}/usuarios/me`, {
        headers: this.obtenerHeaders()
        });
    }

    // ==================== CUENTAS ====================
    
    /**
     * Obtener todas las cuentas del usuario
     */
    obtenerCuentas(): Observable<any> {
        return this.http.get(`${this.API_URL}/cuentas`, {
        headers: this.obtenerHeaders()
        });
    }

    /**
     * Crear nueva cuenta
     */
    crearCuenta(datosCuenta: any): Observable<any> {
        return this.http.post(`${this.API_URL}/cuentas`, datosCuenta, {
        headers: this.obtenerHeaders()
        });
    }

    // ==================== TRANSACCIONES ====================
    
    /**
     * Obtener todas las transacciones del usuario
     */
    obtenerTransacciones(): Observable<any> {
        return this.http.get(`${this.API_URL}/transacciones`, {
        headers: this.obtenerHeaders()
        });
    }

    /**
     * Crear nueva transacción
     */
    crearTransaccion(datosTransaccion: any): Observable<any> {
        return this.http.post(`${this.API_URL}/transacciones`, datosTransaccion, {
        headers: this.obtenerHeaders()
        });
    }

    // ==================== PRESUPUESTOS ====================
    
    /**
     * Obtener todos los presupuestos del usuario
     */
    obtenerPresupuestos(): Observable<any> {
        return this.http.get(`${this.API_URL}/presupuestos`, {
        headers: this.obtenerHeaders()
        });
    }

    /**
     * Crear nuevo presupuesto
     */
    crearPresupuesto(datosPresupuesto: any): Observable<any> {
        return this.http.post(`${this.API_URL}/presupuestos`, datosPresupuesto, {
        headers: this.obtenerHeaders()
        });
    }

    // ==================== METAS ====================
    
    /**
     * Obtener todas las metas del usuario
     */
    obtenerMetas(): Observable<any> {
        return this.http.get(`${this.API_URL}/metas`, {
        headers: this.obtenerHeaders()
        });
    }

    /**
     * Crear nueva meta
     */
    crearMeta(datosMeta: any): Observable<any> {
        return this.http.post(`${this.API_URL}/metas`, datosMeta, {
        headers: this.obtenerHeaders()
        });
    }

    // ==================== INVERSIONES ====================
    
    /**
     * Obtener todas las inversiones del usuario
     */
    obtenerInversiones(): Observable<any> {
        return this.http.get(`${this.API_URL}/inversiones`, {
        headers: this.obtenerHeaders()
        });
    }

    /**
     * Crear nueva inversión
     */
    crearInversion(datosInversion: any): Observable<any> {
        return this.http.post(`${this.API_URL}/inversiones`, datosInversion, {
        headers: this.obtenerHeaders()
        });
    }

    /**
     * Obtener inversión por ID
     */
    obtenerInversion(id: number): Observable<any> {
        return this.http.get(`${this.API_URL}/inversiones/${id}`, {
        headers: this.obtenerHeaders()
        });
    }

    /**
     * Actualizar inversión
     */
    actualizarInversion(id: number, datosInversion: any): Observable<any> {
        return this.http.put(`${this.API_URL}/inversiones/${id}`, datosInversion, {
        headers: this.obtenerHeaders()
        });
    }

    /**
     * Eliminar inversión
     */
    eliminarInversion(id: number): Observable<any> {
        return this.http.delete(`${this.API_URL}/inversiones/${id}`, {
        headers: this.obtenerHeaders()
        });
    }

    // ==================== CATEGORÍAS ====================
    
    /**
     * Obtener todas las categorías disponibles
     */
    obtenerCategorias(): Observable<any> {
        return this.http.get(`${this.API_URL}/categorias`, {
        headers: this.obtenerHeaders()
        });
    }

    // ==================== FACTURAS ====================
    
    /**
     * Obtener todas las facturas del usuario
     */
    obtenerFacturas(): Observable<any> {
        return this.http.get(`${this.API_URL}/facturas`, {
        headers: this.obtenerHeaders()
        });
    }

    // ==================== TARJETAS ====================
    
    /**
     * Obtener todas las tarjetas del usuario
     */
    obtenerTarjetas(): Observable<any> {
        return this.http.get(`${this.API_URL}/tarjetas`, {
        headers: this.obtenerHeaders()
        });
    }

    // ==================== NOTIFICACIONES ====================
    
    /**
     * Obtener todas las notificaciones del usuario
     */
    obtenerNotificaciones(): Observable<any> {
        return this.http.get(`${this.API_URL}/notificaciones`, {
        headers: this.obtenerHeaders()
        });
    }

    // ==================== REPORTES ====================
    
    /**
     * Obtener todos los reportes del usuario
     */
    obtenerReportes(): Observable<any> {
        return this.http.get(`${this.API_URL}/reportes`, {
        headers: this.obtenerHeaders()
        });
    }

    // ==================== MÉTODOS DE UTILIDAD ====================
    
    /**
     * Verificar si el servidor está disponible
     */
    verificarConexion(): Observable<any> {
        return this.http.get(`${this.API_URL}/`);
    }

    /**
     * Método genérico para GET
     */
    get(endpoint: string): Observable<any> {
        return this.http.get(`${this.API_URL}${endpoint}`, {
        headers: this.obtenerHeaders()
        });
    }

    /**
     * Método genérico para POST
     */
    post(endpoint: string, datos: any): Observable<any> {
        return this.http.post(`${this.API_URL}${endpoint}`, datos, {
        headers: this.obtenerHeaders()
        });
    }

    /**
     * Método genérico para PUT
     */
    put(endpoint: string, datos: any): Observable<any> {
        return this.http.put(`${this.API_URL}${endpoint}`, datos, {
        headers: this.obtenerHeaders()
        });
    }

    /**
     * Método genérico para DELETE
     */
    delete(endpoint: string): Observable<any> {
        return this.http.delete(`${this.API_URL}${endpoint}`, {
        headers: this.obtenerHeaders()
        });
    }
}