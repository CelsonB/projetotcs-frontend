import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-perfil',
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  
})




export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  isEditMode: boolean = false;
  apiUrl: string = `${environment.apiUrl}/usuarios`;
  usuarioLogado: any;

  constructor(private usuariosService: UsuariosService,private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.perfilForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  

  logout(){
    this.authService.logout();

    
    this.router.navigate(['/login']);
  }

  deletarUsuario(): void {
    const email = this.authService.getUserEmail();

    if (!email) {
      alert('Erro: Usuário não autenticado.');
      return;
    }
    if (confirm('Tem certeza que deseja deletar sua conta? Essa ação não pode ser desfeita.')) {
      this.usuariosService.deletarUsuario(email).subscribe(
        (response:any) => {
          alert('Usuário deletado com sucesso!');
          this.router.navigate(['/login']);
        }
      );
    }
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
    this.usuariosService.getUsuarioEmail(email).subscribe(
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
      const body = {"senha": updatedData.password, "nome": updatedData.name};

      console.log('Dados atualizados:', body);

      this.usuariosService.updateUsuario(email,body).subscribe(  (response: any) => {
          alert(response);

      }
    );

      this.isEditMode = false;
    } else {
      alert('Por favor, corrija os erros no formulário.');
    }
  }
}


