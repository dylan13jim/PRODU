import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { Autenticacion } from '../../servicios/autenticacion';
import { filter } from 'rxjs/operators';

interface MenuItem {
  id: string;
  titulo: string;
  icono: string;
  ruta: string;
  activo: boolean;
  requiereAuth: boolean;
}

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  
  menuColapsado = false;
  usuarioLogueado = false;
  
  menuItems: MenuItem[] = [
    {
      id: 'tablero',
      titulo: 'Tablero',
      icono: '📊',
      ruta: '/tablero',
      activo: true,
      requiereAuth: false
    },
    {
      id: 'cuentas',
      titulo: 'Mis Cuentas',
      icono: '🏦',
      ruta: '/cuentas',
      activo: false,
      requiereAuth: true
    },
    {
      id: 'transacciones',
      titulo: 'Transacciones',
      icono: '💸',
      ruta: '/transacciones',
      activo: false,
      requiereAuth: true
    },
    {
      id: 'presupuestos',
      titulo: 'Presupuestos',
      icono: '📋',
      ruta: '/presupuestos',
      activo: false,
      requiereAuth: true
    },
    {
      id: 'metas',
      titulo: 'Metas',
      icono: '🎯',
      ruta: '/metas',
      activo: false,
      requiereAuth: true
    },
    {
      id: 'perfil',
      titulo: 'Mi Perfil',
      icono: '👤',
      ruta: '/auth/perfil',
      activo: false,
      requiereAuth: true
    }
  ];

  constructor(
    private router: Router,
    private Autenticacion: Autenticacion
  ) {}

  ngOnInit(): void {
    // Verificar estado de autenticación
    this.Autenticacion.usuario$.subscribe(usuario => {
      this.usuarioLogueado = !!usuario;
    });

    // Escuchar cambios de ruta para marcar item activo
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.actualizarItemActivo(event.url);
      });

    // Marcar item activo inicial
    this.actualizarItemActivo(this.router.url);
  }

  toggleMenu(): void {
    this.menuColapsado = !this.menuColapsado;
  }

  navegarA(item: MenuItem): void {
    // Si requiere autenticación y no está logueado, redirigir a login
    if (item.requiereAuth && !this.usuarioLogueado) {
      this.router.navigate(['/auth/login']);
      return;
    }

    // Navegar a la ruta
    this.router.navigate([item.ruta]);
    
    // Marcar como activo
    this.marcarComoActivo(item.id);
  }

  private marcarComoActivo(itemId: string): void {
    this.menuItems.forEach(item => {
      item.activo = item.id === itemId;
    });
  }

  private actualizarItemActivo(url: string): void {
    this.menuItems.forEach(item => {
      item.activo = url.startsWith(item.ruta);
    });
  }

  // Filtrar items según estado de autenticación
  get itemsVisibles(): MenuItem[] {
    if (this.usuarioLogueado) {
      return this.menuItems; // Mostrar todos si está logueado
    } else {
      return this.menuItems.filter(item => !item.requiereAuth); // Solo públicos
    }
  }
}