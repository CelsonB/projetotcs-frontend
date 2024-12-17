import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


export interface Categoria {
  nome: string;
  id: number; 
}


@Injectable({
  providedIn: 'root'
})



export class CategoriaService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  private apiUrl = `${environment.apiUrl}/categorias`; 



    private getHeaders(): HttpHeaders {
      const token = this.auth.getToken();
      console.log(token);
      let headers = new HttpHeaders();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`); // Adiciona o token no cabeçalho Authorization
      } 
      return headers;
    }
    
  getCategorias(): Observable<Categoria[]> {
    const headers = this.getHeaders();
    return this.http.get<Categoria[]>(this.apiUrl, {headers}); //get usuarios com header

  }

  cadastrarCategoria(categoria: string){
    const headers = this.getHeaders();
    const body = {"nome": categoria};
 
    return this.http.post(this.apiUrl, body,{headers});//cadastrar categorias

  }




  getCategoriaId(id : Number): Observable<String> {
    const headers = this.getHeaders();
    return this.http.get<string>(`${this.apiUrl}/${id}`,{headers});

  }

  atualizarCategoria(categoriaAtualizada: Categoria): Observable<any>{
    const url = `${this.apiUrl}/${categoriaAtualizada.id}`;
    console.log(url);
    const headers = this.getHeaders();
  
    const body = { "nome": categoriaAtualizada.nome};

    return this.http.put(url,body,{headers});//não tenho tempo para testar espero que funcione
  
  }

  deletarCategoria(id : Number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    console.log(url);
    const headers = this.getHeaders();
    return this.http.delete(url,{headers});//deletar com o header 

  }




}
