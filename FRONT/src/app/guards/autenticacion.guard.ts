import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Autenticacion } from '../servicios/autenticacion';

@Injectable({
    providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {

    constructor(
        private Autenticacion: Autenticacion,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        
        return this.Autenticacion.usuario$.pipe(
        take(1),
        map(usuario => {
            
            // Si hay usuario logueado, permitir acceso
            if (usuario) {
            console.log('✅ Acceso permitido - Usuario autenticado:', usuario.nombre);
            return true;
            }
            
            // Si no hay usuario, redirigir al login
            console.log('❌ Acceso denegado - Usuario no autenticado');
            console.log('🔀 Redirigiendo a login...');
            
            // Guardar la URL a la que quería acceder para redirigir después del login
            const urlDestino = state.url;
            localStorage.setItem('urlDespuesLogin', urlDestino);
            
            // Redirigir al login
            this.router.navigate(['/auth/login']);
            return false;
        })
        );
    }

    /**
     * Método para verificar si el usuario puede acceder a una ruta específica
     * Útil para verificaciones adicionales como roles
     */
    puedeAcceder(rutaRequerida: string, rolRequerido?: string): boolean {
        const usuario = this.Autenticacion.obtenerUsuario();
        
        if (!usuario) {
        return false;
        }
        
        // Si se requiere un rol específico
        if (rolRequerido) {
        return this.Autenticacion.tieneRol(rolRequerido);
        }
        
        return true;
    }

    /**
     * Método para verificar si el token está por expirar
     */
    verificarExpiracionToken(): boolean {
        return this.Autenticacion.sesionPorExpirar();
    }
}