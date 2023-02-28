import { Component, OnInit } from '@angular/core';
import { Esimb } from 'src/app/models/esimb.model';
import { EsimbService } from 'src/app/services/esimb.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { Esimb_req } from 'src/app/models/Esimb_req';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
//variables
  isLoggedIn = false;
  private roles: string[] = [];
  isPilote = false;
  isProductor=false;
  searchby?: string;
  searchValue?: string;
  colabsteam?: Collaborateur[];
  esimbs?: Esimb[];
  role = '';
  cuid = '';
  isesimblist = true;
  //currentEsimb?: Esimb;
  currentIndex = -1;
  codeBanbou= '';
  codeIMB = '';
  _esimbs? : Esimb_req[];
  esimbsNonActive? : Esimb_req[];

  message = '';


  //instance collaborateur
  collaborateur : Collaborateur ={ 
      cuid: '',    
      nom: '', 
      prenom: '',
      adresse: '',
      mdp: '',
      date_integration: '',
      id_equipe: '',
      fonction: ''
   }
  

  //Instance de esimb response
_esimb: Esimb_req = {
  codeBanbou:'',
  codeIMB: '',
  dateVerification: '',
  idacte:'',
  affectation: '',
  duree: 1,
  quantite:1,
  dateLivraison:'',
  commentaire: '',
  motif:''
}
    //instance of Esimb
  currentEsimb: Esimb= {
    codeBanbou:'',
    codeIMB: '',
    dateVerification: '',
    affectation: '',
    commentaire: '',
    dateLivraison: '',
    dateReception: '',
    dateReprise: '',
    dateValidation: '',
    duree: 1,
    quantite: 1,
    motif: '',
    refTacheBPU: '',
    repriseFacturable: '',
    statutFacturation: '',
    type_element: '',
    type_prestation:  '',};

    //Constructeur
  constructor(private esimbService: EsimbService, private router: Router,
     private tokenStorageService: TokenStorageService,
    private collaborateurService: CollaborateurService ) { }

  ngOnInit(): void {
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
       this.getesimbs();
         }
    this.retrieveEsimbs();

   // this.getinfoscollaborateur();
      //console.log("this.colab :"+this.collaborateur.nom);   
  }

  //get all esimbs
 getesimbs(): void {
  console.log("cuid sent : " + this.cuid);
  console.log("role sent : " + this.role);
  this.esimbService.getEsimbs(this.cuid,this.role)
     .subscribe(
       data => {
         this.esimbs = data;
         console.log(data);
       },
       error => {
         console.log(error);
       });
}
  

  retrieveEsimbs(): void {
    this.esimbService.getAll()
      .subscribe(
        data => {
          this.esimbs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  /*refreshList(): void {
    this.retrieveEsimbs();
    this.currentEsimb = undefined;
    this.currentIndex = -1;
  }*/

  setActiveEsimb(esimb: Esimb, index: number): void {
    this.currentEsimb = esimb;
    this.currentIndex = index;
   // this.getActebyIdActe();
    //this.searchActe();
  }

  /*getActebyIdActe(): void {
    this.esimbService.getActe("E"+this.currentEsimb.codeIMB + this.currentEsimb.dateLivraison
  + this.currentEsimb.affectation +this.currentEsimb.idacte)
      .subscribe(
        data => {
          this.currentEsimb = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }*/
 
  
 //Search
 search(): void {
  if (this.searchby == "codeBanbou"){
    this.searchByCodeBanbou();
  }else if(this.searchby == "Affectation"){
    this.searchByAffecttaion();
  } else
  {
    this.searchByCodeIMB();
  }
 }
 
 
 //Search by code Banbou
  searchByCodeBanbou(): void {
    this.esimbService.searchByCodeBanbou(this.searchValue)
      .subscribe(
        data => {
          this.esimbs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
        console.log("Search by codeBanbou: " + this.searchValue);
  }
  
 
  /*//Search by date Livraison
  searchByDateLivraison(): void {
    this.esimbService.searchByDateLivraison(this.searchValue)
      .subscribe(
        data => {
          this.esimbs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
 
        console.log("Search by date de livraison: " + this.searchValue);
  }*/

  //Search by codeIMB
  searchByCodeIMB(): void {
    this.esimbService.searchBycodeIMB(this.searchValue)
      .subscribe(
        data => {
          this.esimbs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
 
        console.log("Search by codeIMB: " + this.searchValue);
  }

  //Search by affectation
  searchByAffecttaion(): void {
    this.esimbService.searchByaffectation(this.searchValue)
      .subscribe(
        data => {
          this.esimbs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
 
        console.log("Search by affectation: " + this.searchValue);
  }



  /*searchCodeIMB(): void {
    this.esimbService.findBycodeIMBContaining(this.codeIMB)
      .subscribe(
        data => {
          this.esimbs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  searchActe(): void {
    this.esimbService.getActe("E"+this.currentEsimb.idacte + this.currentEsimb.dateLivraison
    + this.currentEsimb.codeIMB)
      .subscribe(
        data => {
          this.currentEsimb = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }*/

  getinfoscollaborateur(): void {
          const user = this.tokenStorageService.getUser();
          this.collaborateurService.getcolabinfosbycuid(user.username)
            .subscribe(data => { 
                 this.collaborateur = data;
                   console.log(data);
                },          
      error => {
        console.log(error);
                });
        }
    /*collab: Collaborateur ={ 
        CUID: '',    
        nom: '', 
        prenom: '',
        adresse: '',
        mdp: '',
        date_integration: '',
        id_equipe: '',
        fonction: ''
     }
    

    getinfoscollab(CUID: any): Collaborateur{
            const user = this.tokenStorageService.getUser();
            this.collaborateurService.getcolabinfosbycuid(CUID)
              .subscribe(data => { 
                  this.collab = data;
                     console.log(data);
                  },          
        error => {
          console.log(error);
                  });
        return this.collab;
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

//Update Esimb
 updateEsimb(): void {
  this.esimbService.Update(this.currentEsimb.idacte, this.currentEsimb)
    .subscribe(
      response => {
        console.log(response);
        this.message = response.message ? response.message : 'This tutorial was updated successfully!';
      },
      error => {
        console.log(error);
      });
}
}
