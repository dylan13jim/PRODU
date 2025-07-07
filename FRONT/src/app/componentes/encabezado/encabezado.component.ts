import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autenticacion } from '../../servicios/autenticacion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encabezado',
  imports: [CommonModule],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent implements OnInit {
  usuario: any = null;
  mostrarMenuUsuario = false;

  constructor(
    private Autenticacion: Autenticacion,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del usuario
    this.Autenticacion.usuario$.subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  toggleMenuUsuario(): void {
    this.mostrarMenuUsuario = !this.mostrarMenuUsuario;
  }

  cerrarSesion(): void {
    this.Autenticacion.cerrarSesion();
    this.mostrarMenuUsuario = false;
    this.router.navigate(['/']);
  }

  irAPerfil(): void {
    this.router.navigate(['/auth/perfil']);
    this.mostrarMenuUsuario = false;
  }

}
