import { Component, OnInit } from '@angular/core';
import { AvisoService } from '../services/aviso.service';
import { CategoriaService, Categoria } from '../services/categoria.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Aviso {
  id?: number;
  idCategoria: number;
  descricao: string;
}

@Component({
  selector: 'app-avisos-lista',
   imports: [CommonModule ,FormsModule ],
  templateUrl: './avisos-lista.component.html',
  styleUrls: ['./avisos-lista.component.scss']
})

export class AvisosListaComponent implements OnInit {

  categorias: Categoria[] = [];
  avisos: Aviso[] = [];
  avisosFiltrados: Aviso[] = [];
  categoriaSelecionada: number | string = '';

  constructor(private avisoService: AvisoService, private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.categoriaService.getCategorias().subscribe(
      (data: Categoria[]) => {
        this.categorias = data;
        this.carregarAvisos(); 
      },
      (error) => {
        console.error('Erro ao carregar categorias', error);
      }
    );
  }

  carregarAvisos() {
    this.avisoService.listarAvisos().subscribe(
      (data: Aviso[]) => {
        this.avisos = data;
        this.filtrarAvisos();
      },
      (error) => {
        console.error('Erro ao carregar avisos', error);
      }
    );
  }

  getCategoriaNome(idCategoria: number): string {
    return this.categorias.find(cat => cat.id === idCategoria)?.nome || 'Desconhecida';
  }

  filtrarAvisos() {
    this.avisosFiltrados = this.categoriaSelecionada
      ? this.avisos.filter(aviso => aviso.idCategoria === Number(this.categoriaSelecionada))
      : this.avisos;
  }

}
