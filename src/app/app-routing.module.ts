import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { BoardUserComponent } from 'src/app/board-user/board-user.component';
import { BoardProducteurComponent } from 'src/app/board-producteur/board-producteur.component';
import { BoardPiloteComponent } from 'src/app/board-pilote/board-pilote.component';
import { BoardDirectionComponent } from 'src/app/board-direction/board-direction.component';
import { BoardAdminComponent } from 'src/app/board-admin/board-admin.component';
import { ESIMBComponent } from 'src/app/esimb/esimb.component';
import { NROPMComponent } from 'src/app/nro-pm/nro-pm.component';
import { DESATComponent } from 'src/app/desat/desat.component';
import { AddComponent } from 'src/app/cruds/add/add.component';
import { ModifComponent } from 'src/app/cruds/modif/modif.component';
import { ListComponent } from 'src/app/cruds/list/list.component';
import { AddgraphicComponent } from 'src/app/graphic/cruds/addgraphic/addgraphic.component';
import { ListgraphicComponent } from 'src/app/graphic/cruds/listgraphic/listgraphic.component';
import { ModifgraphicComponent } from 'src/app/graphic/cruds/modifgraphic/modifgraphic.component';
import { GraphicComponent } from 'src/app/graphic/graphic.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
 { path: 'user', component: BoardUserComponent },
  { path: 'prod', component: BoardProducteurComponent },
  { path: 'pilo', component: BoardPiloteComponent},
  { path: 'dir', component: BoardDirectionComponent },
 { path: 'admin', component: BoardAdminComponent },
 { path: 'ESIMB', component: ESIMBComponent },
 { path: 'Desat', component: DESATComponent },
 { path: 'NRO-PM', component: NROPMComponent },
 {path: 'Add', component: AddComponent},
 {path: 'MODIF/:idactetrait', component: ModifComponent},
 //{path: 'MODIF/:esimb', component: ModifComponent},
 {path: 'Graphic', component: GraphicComponent},
 {path: 'List', component: ListComponent},
 {path: 'addgraphic', component: AddgraphicComponent},
 {path: 'listgraphic', component: ListgraphicComponent},
 //{path: 'modifgraphic', component: ModifgraphicComponent},


 
  { path: '', redirectTo: 'home', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
