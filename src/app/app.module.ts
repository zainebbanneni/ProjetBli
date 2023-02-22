import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardProducteurComponent } from './board-producteur/board-producteur.component';
import { BoardPiloteComponent } from './board-pilote/board-pilote.component';
import { BoardDirectionComponent } from './board-direction/board-direction.component';
import { BoardUserComponent } from './board-user/board-user.component';



import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ESIMBComponent } from './esimb/esimb.component';
import { AddComponent } from './cruds/add/add.component';
import { ModifComponent } from './cruds/modif/modif.component';
import { ListComponent } from './cruds/list/list.component';
import { NROPMComponent } from './nro-pm/nro-pm.component';
import { DESATComponent } from './desat/desat.component';
import { EsimbService } from 'src/app/services/esimb.service';
import { GraphicComponent } from './graphic/graphic.component';
import { AddgraphicComponent } from 'src/app/graphic/cruds/addgrafic/addgrafic.component';
import { ListgraphicComponent } from 'src/app/graphic/cruds/listgrafic/listgrafic.component';
import { ListgraficnonactiveComponent } from 'src/app/graphic/cruds/listgraficnonavtive/listgraficnonactive.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardProducteurComponent,
    BoardPiloteComponent,
    BoardDirectionComponent,
    BoardUserComponent,
    ESIMBComponent,
    AddComponent,
    ModifComponent,
    ListComponent,
    NROPMComponent,
    DESATComponent,
    GraphicComponent,
    AddgraphicComponent,
    ListgraphicComponent,
    ListgraficnonactiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

    
  
  ],
  
  providers: [EsimbService,authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
