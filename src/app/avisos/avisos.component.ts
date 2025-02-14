import { Component, OnInit } from '@angular/core';
import { AvisoService } from '../services/aviso.service';

interface Aviso {
  id?: number;
  descricao: string;
}

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.scss']
})
export class AvisosComponent implements OnInit {
  avisos: Aviso[] = [];
  novoAviso: Aviso = { descricao: '' };
  avisoParaAtualizar: Aviso | null = null;

  constructor(private avisoService: AvisoService) {}

  ngOnInit() {
    this.carregarAvisos();
  }

  carregarAvisos() {
    this.avisoService.listarAvisos().subscribe((data) => {});
  }

  adicionarAviso() {
    if (!this.novoAviso.descricao) return;

    this.avisoService.adicionarAviso(this.novoAviso).subscribe((aviso) => {
      this.avisos.push(aviso);
      this.novoAviso = {descricao: '' };
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
