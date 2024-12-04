import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // URL da sua API


  private tokenKey = 'authToken';

  private emailLogado = "";
  constructor(private http: HttpClient, private router: Router) {}

   login(email: string, password: string) {
 	 const body = { "email": email, "senha": password};
   console.log(body);
    return this.http.post(`${this.apiUrl}/login`, body).subscribe(
      (response: any) => {
        if (response.token) {
        
          alert('login realizado com sucesso');
          this.setToken(response.token);
          this.setUserEmail(email);
          this.router.navigate(['/perfil']); 
        }
      },
      (error) => {
        console.error('Erro no login:', error);
        alert('Credenciais inválidas.');
      }
    );
  }

  private setUserEmail(email: string): void {
    localStorage.setItem(this.emailLogado, email);
  }

  getUserEmail(): string | null {
    return localStorage.getItem(this.emailLogado);
  }



  
  private setToken(token: string): void	 {
    localStorage.setItem(this.tokenKey, token);
  }

  // Obter o token armazenado
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken(); // Retorna true se o token existir
  }

  // Logout do usuário
  logout(): void {
 
    const body = {};
    this.http.post(`${this.apiUrl}/logout`,body ).subscribe(
      (response: any) => {
          localStorage.removeItem(this.tokenKey);
          alert('logout realizado com sucesso');
          this.router.navigate(['/login']);
      }


    );
     
  }
 

}