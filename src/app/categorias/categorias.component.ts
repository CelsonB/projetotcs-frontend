import { Component, OnInit } from '@angular/core';
import { Categoria, CategoriaService } from '../services/categoria.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorias',
  imports: [
    FormsModule,  
    CategoriasComponent,
    CommonModule ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})



export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  novaCategoria: string = '';
  categoriaParaAtualizar: Categoria | null = null;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
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
      }
    );
  }

  
  prepararAtualizacao(categoria: Categoria): void {
    this.categoriaParaAtualizar = { ...categoria }; // Cria uma cópia da categoria para edição
  }

  atualizarCategoria(): void {
    if (this.categoriaParaAtualizar) {
      this.categoriaService.atualizarCategoria(this.categoriaParaAtualizar).subscribe(
        () => {
          this.categoriaParaAtualizar = null; // Limpa a categoria em edição
          this.carregarCategorias(); // Recarrega a lista de categorias
        },
        (error) => {
          console.error('Erro ao atualizar categoria', error);
        }
      );
    }
  }

  cancelarAtualizacao(): void {
    this.categoriaParaAtualizar = null; // Limpa a categoria em edição
  }
  adicionarCategoria(): void {
    if (this.novaCategoria.trim()) {
      this.categoriaService.cadastrarCategoria(this.novaCategoria).subscribe(
        () => {
          this.novaCategoria = ''; // Limpa o campo de entrada
          this.carregarCategorias(); // Recarrega a lista de categorias
        },
        (error) => {
          console.error('Erro ao cadastrar categoria', error);
        }
      );
    }
  }

  





  deletarCategoria(id: number): void {
    this.categoriaService.deletarCategoria(id).subscribe(
      () => {
        this.carregarCategorias(); // Recarrega a lista de categorias
      },
      (error) => {
        console.error('Erro ao deletar categoria', error);
      }
    );
  }
}
