import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';



import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    LoginComponent,
    PerfilComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
})




export class AppComponent {
  constructor(public authService: AuthService) {}
  
  title = 'projetotcs-frontend';
}
