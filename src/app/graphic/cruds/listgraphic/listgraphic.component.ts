import { Component, OnInit } from '@angular/core';
import { Esimb } from 'src/app/models/esimb.model';
import { EsimbService } from 'src/app/services/esimb.service';
import { ActeTraitement } from 'src/app/models/ActeTraitement';
import { GraphicService } from 'src/app/services/graphic.service';
import { Graphic } from 'src/app/models/Graphic';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Collaborateur } from 'src/app/models/Collaborateur';
import {Grafic_req } from 'src/app/models/Grafic_req';


@Component({
  selector: 'app-listgraphic',
  templateUrl: './listgraphic.component.html',
  styleUrls: ['./listgraphic.component.css']
})
export class ListgraphicComponent implements OnInit {
  
 //Variables
 isLoggedIn = false;
 private roles: string[] = [];
 isPilote = false;
 searchby?='IdGraphic';
 searchValue?: string;
 graphics?: Graphic[];
 actes?: ActeTraitement[];
 colabsteam?: Collaborateur[];
 currentIndex = -1;
 idacte= '';
 codeIMB = '';
 grafics? : Grafic_req[];
 role = '';
 cuid = '';


//Instance de ActeTraitement
 _actetraitement: ActeTraitement= {
  idactetrait:'',
  ref_tacheBPU:'',
  type_prestation:'',
  type_element:'',
  quantite:'',
 date_reception:'',
 date_livraison:'',
 date_validation:'',
 affectation: '',
 duree: '',
 commentaire: '',
 motif: '',
 statut_facturation: '',
 date_reprise: '',
 reprise_facturable: ''
};

//Instance de graphic response
_graphic: Graphic = {
  idGrafic: '',
  iar: '',
  code_imb: '',
  groupe_operation: '',
  dateTraitement: '',
  statut_graphic: '',
  traitement_effectue: '',
  type_traitement: ''
}

//Instance de graphic response
currentGraphic: Grafic_req = {
  idGrafic: '',
  iar: '',
  code_imb: '',
  groupe_operation: '',
  dateTraitement: '',
  statut_graphic: '',
  traitement_effectue: '',
  type_traitement: '',
  idactetrait: '',
  affectation: '',
  duree: 1,
  commentaire: '',
}

 //Constructor
 constructor(private tokenStorageService: TokenStorageService,
  private graphicService: GraphicService,
  private esimbService:EsimbService,
  private collaborateurService:CollaborateurService) {}
 
 //OnInit
 ngOnInit(): void {
   //this.retrieveGraphics();
   this.isLoggedIn = !!this.tokenStorageService.getToken();
   if (this.isLoggedIn) {
     const user = this.tokenStorageService.getUser();
     this.roles = user.roles;
     this.cuid = user.username;

     if (this.roles.includes('ROLE_PILOTE')){
       this.isPilote = true;
       this.role = 'PILOTE';
       console.log("this is Pilote")
     }else{
       this.isPilote = false;
       console.log("this is not Pilote" + this.roles)
     }

     this.getgrafics();
   }

 }


 //get all grafics
 getgrafics(): void {
  console.log("cuid sent : " + this.cuid);
  console.log("role sent : " + this.role);
  this.graphicService.getGrafics(this.cuid,this.role)
     .subscribe(
       data => {
         this.grafics = data;
         console.log(data);
       },
       error => {
         console.log(error);
       });
}
 
 //Get all Graphics
 /*retrieveGraphics(): void {
   this.graphicService.getAll()
     .subscribe(
       data => {
         this.graphics = data;
         console.log(data);
       },
       error => {
         console.log(error);
       });
 }*/


 setActiveEsimb(graphic: Graphic, index: number): void {
   this.currentGraphic = graphic;
   this.currentIndex = index;
 }


 /*getActebyIdActe(): void {
   this.esimbService.getActe("G"+this.currentGraphic.idGrafic + this.currentGraphic.dateTraitement)
     .subscribe(
       data => {
         this.currentActetraitement = data;
         console.log(data);
       },
       error => {
         console.log(error);
       });
 }*/

 
//Search
search(): void {
 if (this.searchby == "IdGraphic"){
   this.searchByIdGraphic();
 }else{
  this.searchByDateTraitement();
 }
}


//Search by date Traitement
 searchByIdGraphic(): void {
   this.graphicService.searchByIdGraphic(this.searchValue)
     .subscribe(
       data => {
         this.grafics = data;
         console.log(data);
       },
       error => {
         console.log(error);
       });
       console.log("Search by graphic id: " + this.searchValue);
 }
 

 //Search by date Traitement
 searchByDateTraitement(): void {
   this.graphicService.searchByDateTraitement(this.searchValue)
     .subscribe(
       data => {
         this.grafics = data;
         console.log(data);
       },
       error => {
         console.log(error);
       });

       console.log("Search by date de traitement: " + this.searchValue);
 }

 //get team members
 getteammembersbycuid(): void {
  const user = this.tokenStorageService.getUser();
  this.collaborateurService.getteammembersbycuid(user.username)
  .subscribe(
    data => {
      this.colabsteam = data;
      console.log(data);
    },
    error => {
      console.log(error);
    });
 }

 //Update Graphic
 UpdateGraphic(): void {
  this._graphic.code_imb = this.currentGraphic.code_imb;
  this._graphic.code_imb = this.currentGraphic.code_imb;
  this._graphic.code_imb = this.currentGraphic.code_imb;

  this.graphicService.update(this._actetraitement,this.currentGraphic);
  
 }

 
}