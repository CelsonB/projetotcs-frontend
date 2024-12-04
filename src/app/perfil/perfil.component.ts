import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [ReactiveFormsModule ,CommonModule],
})




export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  isEditMode: boolean = false;
  apiUrl: string = `${environment.apiUrl}/usuarios`;

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService) {
    this.perfilForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  

  logout(){
    this.authService.logout();
  }
  

  ngOnInit(): void {
    const email = this.authService.getUserEmail(); // Recupera o e-mail do AuthService
    if (email) {
      this.loadPerfil(email);
    } else {
      alert('Erro: Usuário não autenticado.');
    }
  }

  loadPerfil(email: string): void {
    this.http.get(`${this.apiUrl}/${email}`).subscribe(
      (data: any) => {
        this.perfilForm.patchValue({
          name: data.nome,
          email: data.email,
          password: data.senha,
        });
      },
      (error) => {
        console.error('Erro ao carregar perfil:', error);
        alert('Não foi possível carregar o perfil.');
      }
    );
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  savePerfil(): void {
    if (this.perfilForm.valid) {
      const updatedData = this.perfilForm.value;
      const email = this.authService.getUserEmail();

      const body = {"email": email, "senha": updatedData.password, "nome": updatedData.name};

      console.log('Dados atualizados:', body);
      this.http.put(`${this.apiUrl}/${email}`,body).subscribe(  (response: any) => {
          alert(response);
      }
    );

      this.isEditMode = false;
    } else {
      alert('Por favor, corrija os erros no formulário.');
    }
  }
}


