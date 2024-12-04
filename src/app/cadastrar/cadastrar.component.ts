// src/app/cadastro/cadastro.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario, UsuariosService } from '../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss'],
  imports: [ReactiveFormsModule ,FormsModule,CommonModule ]
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuariosService,private router: Router) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const usuario: Usuario = this.cadastroForm.value;
      this.usuarioService.cadastrarUsuario(usuario).subscribe(response => {
        alert('Usuário cadastrado com sucesso!');
        this.router.navigate(['/login']);
      }, error => {
        console.error('Erro ao cadastrar usuário:', error);
      });
    }
  }
}