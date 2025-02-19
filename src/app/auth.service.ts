import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // URL da sua API


  private tokenKey = 'authToken';
  private isAdmin = false;
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
          
          if (this.isAdminUser()) {
            this.isAdmin = response.admin;
            alert('Bem-vindo, administrador!');
            this.router.navigate(['/avisosLista']); // Redirecionar para a área de admin
          } else {
            this.router.navigate(['/avisosLista']); // Redirecionar para o perfil normal
          }


        }
      },
      (error) => {
        console.error('Erro no login:', error);
        alert('Credenciais inválidas.');
      }
    );
  }

  isAdminUser(): boolean {
    
    const token = this.getToken();
    if (token) {
      const payload = this.getPayload(token);
      return payload ? payload.admin === true : false;
    }
    return false;
  }


  //decoder feito por mim mesmo pq eu não quero instalar mais uma biblioteca na ultima entrega. 
  private getPayload(token: string): any {
    try {
      const base64Payload = token.split('.')[1];
      const decodedPayload = atob(base64Payload); 
      //console.log(1);
      return JSON.parse(decodedPayload); 
    } catch (error) {
      console.error('Erro ao processar o token:', error);
      return null;
    }
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
    
        const token = this.getToken();
        console.log(token);
        let headers = new HttpHeaders();
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`); // Adiciona o token no cabeçalho Authorization
        } 


    const body = {};
    this.http.post(`${this.apiUrl}/logout`,body,{headers}).subscribe(
      (response: any) => {
          localStorage.removeItem(this.tokenKey);
          alert('logout realizado com sucesso');
          this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erro ao deslogar:', error);
        alert('Não foi possível deslogar');
      }
    );
     
  }
 

}