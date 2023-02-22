import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ActeTraitement } from 'src/app/models/ActeTraitement';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { Grafic_req } from 'src/app/models/Grafic_req';
import { Graphic } from 'src/app/models/Graphic';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { EsimbService } from 'src/app/services/esimb.service';
import { GraphicService } from 'src/app/services/graphic.service';

@Component({
  selector: 'app-listgraficnonactive',
  templateUrl: './listgraficnonactive.component.html',
  styleUrls: ['./listgraficnonactive.component.css']
})
export class ListgraficnonactiveComponent implements OnInit {
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
 graficsNonActive? : Grafic_req[];
 role = '';
 cuid = '';
 isgraphiclist = false;
 isgraphiclisnonactive = true;

 


//Instance de ActeTraitement
 _actetraitement: ActeTraitement= {
  idacte:'',
  refTacheBPU:'',
  type_prestation:'',
  type_element:'',
  quantite:1,
 dateReception:'',
 dateLivraison:'',
 dateValidation:'',
 affectation: '',
 duree: 0,
 commentaire: '',
 motif: '',
 statutFacturation: '',
 dateReprise: '',
 repriseFacturable: ''
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
  idacte: '',
  affectation: '',
  duree: 1,
  commentaire: '',
}

 //Constructor
 constructor(private tokenStorageService: TokenStorageService,
  private graphicService: GraphicService,
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
      this.getteammembersbycuid();
       this.isPilote = true;
       this.role = 'PILOTE';
       console.log("this is Piloteeeeeeeeeeeeeeeeeeeee")
     }else{
       this.isPilote = false;
       console.log("this is not Piloteeeee" + this.roles)
     }
     
     this.getgrafics();
   }

 }

// ------------- Done -------------- //
 //get all grafics
 getgrafics(): void {
  console.log("cuid sent : " + this.cuid);
  console.log("role sent : " + this.role);
  this.graphicService.getGraficsNonActive(this.cuid)
     .subscribe(
       data => {
         this.grafics = data;
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
    this.graphicService.searchByIdGraphic(this.searchValue,this.cuid,false)
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
    this.graphicService.searchByDateTraitement(this.searchValue,this.cuid,false)
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
 
 //Search by Affectaion
 searchByAffecttaion(): void {
   this.graphicService.searchByIdGraphic(this.searchValue,this.cuid,false)
     .subscribe(
       data => {
         this.grafics = data;
         console.log(data);
       },
       error => {
         console.log(error);
       });
       console.log("Search by affectation: " + this.searchValue);
 }

 
//Active grafic
activeGrafic(): void {
  this.graphicService.activeGrafic(this.currentGraphic)
                .subscribe(
                  data => {
                    console.log(data);
                  },
                  error => {
                    console.log(error);
                  }
                )

window.location.reload();
}
 
// ------------- Done -------------- //

 /*setActiveEsimb(graphic: Graphic, index: number): void {
   this.currentGraphic = graphic;
   this.currentIndex = index;
 }*/


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
 
  
 }

 listgrafic(): void{
  this.isgraphiclisnonactive = false;
  this.isgraphiclist = true;
}

}