import { Component, OnInit } from '@angular/core';
import { AvisoService } from '../services/aviso.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriasComponent } from '../categorias/categorias.component';
import { Categoria, CategoriaService } from '../services/categoria.service';

interface Aviso {
  id: number;
  idCategoria: number; 
  descricao: string;
}
interface NovoAviso {
  idCategoria: number; 
  descricao: string;
}


@Component({
  selector: 'app-avisos',
  imports: [CommonModule ,FormsModule  ],
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.scss']
})
export class AvisosComponent implements OnInit {
  avisos: Aviso[] = [];
  categorias: Categoria[] = [];
  
  novoAviso: NovoAviso = {idCategoria: 0, descricao: '' };
  avisoParaAtualizar: Aviso | null = null;

  constructor(private avisoService: AvisoService, private categoriaService :CategoriaService) {}

  ngOnInit() {
    this.carregarAvisos();
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      (data: Categoria[]) => {
        this.categorias = data;
        console.log(this.categorias);
      },
      (error) => {
        console.error('Erro ao carregar categorias', error);
        alert('Erro ao carregar categorias: ' + (error.error.message || 'Erro desconhecido.'));
      }
    );
  }

  getCategoriaNome(idCategoria: number): string {
    const categoria = this.categorias.find(cat => cat.id === idCategoria);
    return categoria ? categoria.nome : 'Desconhecida';
  }
  
  carregarAvisos() {
    this.avisoService.listarAvisos().subscribe((data) => {
      this.avisos = data;
    });
  }

  adicionarAviso() {
    if (!this.novoAviso.descricao) return;

    this.avisoService.adicionarAviso(this.novoAviso).subscribe((aviso) => {
      this.avisos.push(aviso);
      this.novoAviso = {idCategoria: 0 , descricao: '' };
    });
  }

  prepararAtualizacao(aviso: Aviso) {
    this.avisoParaAtualizar = { ...aviso };
  }

  atualizarAviso() {
    if (!this.avisoParaAtualizar) return;
    this.avisoService.atualizarAviso(this.avisoParaAtualizar).subscribe(() => {
      this.carregarAvisos();
      this.avisoParaAtualizar = null;
    });
  }

  cancelarAtualizacao() {
    this.avisoParaAtualizar = null;
  }

  deletarAviso(id: number) {
    this.avisoService.deletarAviso(id).subscribe(() => {
      this.avisos = this.avisos.filter((aviso) => aviso.id !== id);
    });
  }
}
