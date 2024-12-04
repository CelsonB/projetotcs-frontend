import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ListaDePerfisComponent } from './lista-de-perfis/lista-de-perfis.component';
import { CadastroComponent } from './cadastrar/cadastrar.component';


export const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'lista', component:ListaDePerfisComponent},
    { path: 'cadastrar', component:CadastroComponent}
    
];