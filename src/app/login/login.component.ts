import { provideHttpClient , withFetch } from '@angular/common/http';
import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router'; 


@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',

  
})


export class LoginComponent 
{
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password);
  }
}

export class Logout {

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    

    this.authService.logout();
  }
}

