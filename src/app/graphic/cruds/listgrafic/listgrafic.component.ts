import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ActeTraitement } from 'src/app/models/ActeTraitement';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { Grafic_req } from 'src/app/models/Grafic_req';
import { Graphic } from 'src/app/models/Graphic';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Router } from '@angular/router'; 
import { GraphicService } from 'src/app/services/graphic.service';

@Component({
  selector: 'app-listgrafic',
  templateUrl: './listgrafic.component.html',
  styleUrls: ['./listgrafic.component.css']
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
 graficsNonActive? : Grafic_req[];
 role = '';
 cuid = '';
 isgraphiclist = true;
 isgraphiclisnonactive = false;

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
  private collaborateurService:CollaborateurService,
  private router: Router) {}
 
 //OnInit
 ngOnInit(): void {
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
     
     this.getActivegrafics();
   }

 }

// ------ Done ---------------------------------------//
 //get all grafics
 getActivegrafics(): void {
  console.log("cuid sent : " + this.cuid);
  this.graphicService.getGraficsActive(this.cuid)
     .subscribe(
       data => {
         this.grafics = data;
         console.log(data);
       },
       error => {
         console.log(error);
       });
  }

  deactiveGrafic(): void {
    this.graphicService.deactiveGrafic(this.currentGraphic)
                  .subscribe(
                    data => {
                      console.log(data);
                    },
                    error => {
                      console.log(error);
                    }
                  )

  this.ngOnInit();
  }

//Search
search(): void {
  if (this.searchby == "IdGraphic"){
    this.searchByIdGraphic();
  }else if(this.searchby == "Affectation"){
   this.searchByAffecttaion();
  }else{
   this.searchByDateTraitement();
  }
 }
 
 
 //Search by date Traitement
  searchByIdGraphic(): void {
    this.graphicService.searchByIdGraphic(this.searchValue,this.cuid,true)
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
    this.graphicService.searchByDateTraitement(this.searchValue,this.cuid,true)
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
   this.graphicService.searchByAffectation(this.searchValue,this.cuid,true)
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

   listgrafic(): void{
    this.isgraphiclisnonactive = false;
    this.isgraphiclist = true;
  }
  
   listnonactivegrafic(): void{
    this.isgraphiclisnonactive = true;
    this.isgraphiclist = false;
  }
// ------ end Done ---------------------------------------//



 








}