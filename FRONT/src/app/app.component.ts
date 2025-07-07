import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EncabezadoComponent } from "./componentes/encabezado/encabezado.component";
import { MenuLateralComponent } from "./componentes/menu-lateral/menu-lateral.component";

@Component({
  selector: 'app-root',
  imports: [EncabezadoComponent, MenuLateralComponent, RouterOutlet],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'aplicacion-principal';
}
