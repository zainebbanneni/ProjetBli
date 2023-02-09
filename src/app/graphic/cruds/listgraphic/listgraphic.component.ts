import { Component, OnInit } from '@angular/core';
import { Esimb } from 'src/app/models/esimb.model';
import { EsimbService } from 'src/app/services/esimb.service';
import { ActeTraitement } from 'src/app/models/ActeTraitement';
import { GraphicService } from 'src/app/services/graphic.service';
import { Graphic } from 'src/app/models/Graphic';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Collaborateur } from 'src/app/models/Collaborateur';


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
 //currentEsimb?: Esimb;
 currentIndex = -1;
 idacte= '';
 codeIMB = '';


 //Instance de ActeTraitement
 currentActetraitement: ActeTraitement= {
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

//Instance de graphic
currentGraphic: Graphic = {
  idGrafic: '',
  iar: '',
  code_imb: '',
  groupe_operation: '',
  dateTraitement: '',
  statut_graphic: '',
  traitement_effectue: '',
  type_traitement: '',
};

 //Constructor
 constructor(private tokenStorageService: TokenStorageService,
  private graphicService: GraphicService,
  private esimbService:EsimbService,
  private collaborateurService:CollaborateurService) {}
 
 //OnInit
 ngOnInit(): void {
   this.retrieveGraphics();
   this.isLoggedIn = !!this.tokenStorageService.getToken();
   if (this.isLoggedIn) {
     const user = this.tokenStorageService.getUser();
     this.roles = user.roles;


     if (this.roles.includes('ROLE_PILOTE')){
       this.isPilote = true;
       console.log("this is Pilote")
     }else{
       this.isPilote = false;
       console.log("this is not Pilote" + this.roles)
     }
   }
 }
 
 //Get all Graphics
 retrieveGraphics(): void {
   this.graphicService.getAll()
     .subscribe(
       data => {
         this.graphics = data;
         console.log(data);
       },
       error => {
         console.log(error);
       });
 }

/* retrieveActes(): void {
   this.esimbService.getAllActes()
     .subscribe(
       data => {
         this.actes= data;
         console.log(data);
       },
       error => {
         console.log(error);
       });
 }*/

 setActiveEsimb(graphic: Graphic, index: number): void {
   this.currentGraphic = graphic;
   //this.currentActetraitement= acte;
   this.currentIndex = index;
   this.getActebyIdActe();
 }


 getActebyIdActe(): void {
   this.esimbService.getActe("G"+this.currentGraphic.idGrafic + this.currentGraphic.dateTraitement)
     .subscribe(
       data => {
         this.currentActetraitement = data;
         console.log(data);
       },
       error => {
         console.log(error);
       });
 }

 
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
         this.graphics = data;
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
         this.graphics = data;
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
  console.log("ok idactetrait"+this.currentActetraitement.idactetrait);
  console.log("ok idGrafic"+this.currentGraphic.idGrafic);
  this.graphicService.update(this.currentActetraitement,this.currentGraphic);
  
 }
}