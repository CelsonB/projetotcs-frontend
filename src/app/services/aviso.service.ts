import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';
import { Categoria, CategoriaService } from './categoria.service';

interface Aviso {
  id: number;
  idCategoria: number; 
  descricao: string;
}

interface NovoAviso {
  idCategoria: number; 
  descricao: string;
}


@Injectable({
  providedIn: 'root'
})
export class AvisoService {
  private apiUrl = `${environment.apiUrl}/avisos`;

  constructor(private http: HttpClient, private auth: AuthService, private categoriaService : CategoriaService) { }


  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    console.log(token);
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`); // Adiciona o token no cabeçalho Authorization
    } 
    console.log(headers);

    return headers;
  }

  

  getCategorias(): Observable<Categoria[]> {
    const headers = this.getHeaders();
    return this.http.get<Categoria[]>(this.apiUrl, {headers}); //get usuarios com header
  }
  
  listarAvisos(): Observable<Aviso[]> {
    const headers = this.getHeaders();

    return this.http.get<Aviso[]>(this.apiUrl,{headers});
  }

  listarAvisosPorCategoria(idCategoria: number): Observable<Aviso[]> {
    const headers = this.getHeaders();
    return this.http.get<Aviso[]>(`${this.apiUrl}/${idCategoria}`, { headers });
  }

  adicionarAviso(aviso: NovoAviso): Observable<Aviso> {
    const headers = this.getHeaders();

    return this.http.post<Aviso>(this.apiUrl, aviso,{headers});
  }

  atualizarAviso(aviso: Aviso): Observable<Aviso> {
    const headers = this.getHeaders();

    return this.http.put<Aviso>(`${this.apiUrl}/${aviso.id}`, aviso,{headers});
  }

  deletarAviso(id: number): Observable<void> {
    const headers = this.getHeaders();

    return this.http.delete<void>(`${this.apiUrl}/${id}`,{headers});
  }
}
