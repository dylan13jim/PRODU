import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  // Control del modal
  mostrarModal = false;
  
  // Estado del servidor (opcional)
  servidorConectado = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.verificarConexionServidor();
  }

  // Verificar si el backend está funcionando
  private verificarConexionServidor(): void {
    this.apiService.obtenerCategorias().subscribe({
      next: (categorias) => {
        this.servidorConectado = true;
        console.log('✅ Backend conectado');
      },
      error: (error) => {
        this.servidorConectado = false;
        console.log('❌ Backend no disponible');
      }
    });
  }

  // Mostrar modal de información del banco
  mostrarInfoBanco(): void {
    this.mostrarModal = true;
  }

  // Cerrar modal
  cerrarModal(): void {
    this.mostrarModal = false;
  }
}