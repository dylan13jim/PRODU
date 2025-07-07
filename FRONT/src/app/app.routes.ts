import { Routes } from '@angular/router';
import { TableroComponent } from './paginas/tablero/tablero.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
    // === PÁGINA PRINCIPAL (TABLERO) ===
    {
        path: '', 
        component: TableroComponent
    },
    {
        path: 'tablero', 
        component: TableroComponent
    },

    // === RUTAS DE AUTENTICACIÓN (MICROFRONTEND) ===
    {
        path: 'login',
        loadComponent: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4201/remoteEntry.js',
                exposedModule: './LoginComponent'
            }).then(c => c.LoginComponent).catch(err => {
                console.error('Error cargando LoginComponent:', err);
                // Fallback - redirigir al tablero si no se puede cargar
                return import('./paginas/tablero/tablero.component').then(c => c.TableroComponent);
            })
    },
    {
        path: 'registro',
        loadComponent: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4201/remoteEntry.js',
                exposedModule: './RegistroComponent'
            }).then(c => c.RegistroComponent).catch(err => {
                console.error('Error cargando RegistroComponent:', err);
                return import('./paginas/tablero/tablero.component').then(c => c.TableroComponent);
            })
    },
    {
        path: 'perfil',
        loadComponent: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4201/remoteEntry.js',
                exposedModule: './PerfilComponent'
            }).then(c => c.PerfilComponent).catch(err => {
                console.error('Error cargando PerfilComponent:', err);
                return import('./paginas/tablero/tablero.component').then(c => c.TableroComponent);
            })
    },

    // === RUTAS DE CUENTAS (MICROFRONTEND) ===
    {
        path: 'cuentas',
        loadComponent: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4202/remoteEntry.js',
                exposedModule: './CuentasComponent'
            }).then(c => c.CuentasComponent).catch(err => {
                console.error('Error cargando CuentasComponent:', err);
                return import('./paginas/tablero/tablero.component').then(c => c.TableroComponent);
            })
    },
    {
        path: 'transacciones',
        loadComponent: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4202/remoteEntry.js',
                exposedModule: './TransaccionesComponent'
            }).then(c => c.TransaccionesComponent).catch(err => {
                console.error('Error cargando TransaccionesComponent:', err);
                return import('./paginas/tablero/tablero.component').then(c => c.TableroComponent);
            })
    },

    // === RUTAS DE FALLBACK ===
    {
        path: '**',
        redirectTo: ''
    }
];