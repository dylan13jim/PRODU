import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: 'registro', 
        component: RegistroComponent 
    },
    { 
        path: 'perfil', 
        component: PerfilComponent 
    },
];
