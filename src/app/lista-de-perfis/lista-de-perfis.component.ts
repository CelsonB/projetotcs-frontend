import { Component, OnInit } from '@angular/core';
import { Usuario, UsuariosService } from '../services/usuarios.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-lista-de-perfis',
  imports: [CommonModule],
  templateUrl: './lista-de-perfis.component.html',
  styleUrl: './lista-de-perfis.component.scss'
})
export class ListaDePerfisComponent implements OnInit{

  usuarios: Usuario[] = [];

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
        console.log(this.usuarios); // Exibir a lista de usuários no console
      },
      (error) => {
        console.error('Erro ao buscar usuários:', error);
      }
    );
  }


}
