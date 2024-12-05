import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';
import { FormGroup } from '@angular/forms';

export interface Usuario {
  nome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private auth: AuthService) { }


  private apiUrl = `${environment.apiUrl}/usuarios`; // Substitua pela URL da sua API



  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    console.log(token);
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`); // Adiciona o token no cabeçalho Authorization
    }
    return headers;
  }

  getUsuarios(): Observable<Usuario[]> {
    const token = this.auth.getToken();
    const headers = this.getHeaders();

    return this.http.get<Usuario[]>(this.apiUrl, {headers}); //get usuarios com header 
  }

  cadastrarUsuario(usuario: Usuario): Observable<any> {
     return this.http.post(this.apiUrl, usuario);
  }


  getUsuarioEmail(email: string): Observable<Usuario> {
    const headers = this.getHeaders();
      return this.http.get<Usuario>(`${this.apiUrl}/${email}`,{headers});
  }

  updateUsuario(email: string | null, body: { nome: string; senha: string } ): Observable<any>{//olha que coisa linda esse body
    const headers = this.getHeaders();

    return this.http.put(`${this.apiUrl}/${email}`,body, {headers});

  }

  deletarUsuario(email: string): Observable<any> {

    const url = `${this.apiUrl}/${email}`;
    const headers = this.getHeaders();

    return this.http.delete(url,{headers});//deletar com o header 
  }


}