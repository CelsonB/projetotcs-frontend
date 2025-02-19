import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ListaDePerfisComponent } from './lista-de-perfis/lista-de-perfis.component';
import { CadastroComponent } from './cadastrar/cadastrar.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { AvisoService } from './services/aviso.service';
import { AvisosComponent } from './avisos/avisos.component';
import { AvisosListaComponent } from './avisos-lista/avisos-lista.component';


export const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'lista', component:ListaDePerfisComponent},
    { path: 'cadastrar', component:CadastroComponent},
    { path: 'categorias',component:CategoriasComponent },
    { path: 'avisos',component:AvisosComponent },
    { path: 'avisosLista',component:AvisosListaComponent }
    
];