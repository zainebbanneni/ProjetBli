import { Component, OnInit } from '@angular/core';
import { Esimb } from 'src/app/models/esimb.model';
import { EsimbService } from 'src/app/services/esimb.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Collaborateur } from 'src/app/models/Collaborateur';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  collaborateur : Collaborateur ={ 
      CUID: '',    
      nom: '', 
      prenom: '',
      adresse: '',
      mdp: '',
      date_integration: '',
      id_equipe: '',
      fonction: ''
   }
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
  //currentEsimb?: Esimb;
  currentIndex = -1;
  idacte= '';
  codeIMB = '';

  //instance of Esimb
  currentEsimb: Esimb= {
    idacte:'',
    affectation: '',
    commentaire: '',
    dateLivraison: '',
    dateReception: '',
    dateReprise: '',
    dateValidation: '',
    duree: '',
    quantite: '',
    motif: '',
    refTacheBPU: '',
    repriseFacturable: '',
    statutFacturation: '',
    type_element: '',
    type_prestation:  '',
    codeIMB: '',
    dateVerification: '',};

    //instance of Esimb
  _esimb: Esimb= {
    idacte:'',
    affectation: '',
    commentaire: '',
    dateLivraison: '',
    dateReception: '',
    dateReprise: '',
    dateValidation: '',
    duree: '',
    quantite: '',
    motif: '',
    refTacheBPU: '',
    repriseFacturable: '',
    statutFacturation: '',
    type_element: '',
    type_prestation:  '',
    codeIMB: '',
    dateVerification: '',};

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
       this.getgraphics();
         }
    this.retrieveEsimbs();

   // this.getinfoscollaborateur();
      //console.log("this.colab :"+this.collaborateur.nom);   
  }

  //get all esimbs
 getgraphics(): void {
  console.log("cuid sent : " + this.cuid);
  console.log("role sent : " + this.role);
  this.esimbService.getGraphics(this.cuid,this.role)
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
  if (this.searchby == "idacte"){
    this.searchByIdActe();
  }else if(this.searchby == "dateLivraison"){
   this.searchByDateLivraison();
   
  } else if(this.searchby == "affectation"){
       this.searchByAffectation();
  } else
  {
    this.searchByCodeIMB();
  }
 }
 
 
 //Search by Id Acte
  searchByIdActe(): void {
    this.esimbService.searchByIdActe(this.searchValue)
      .subscribe(
        data => {
          this.esimbs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
        console.log("Search by idacte: " + this.searchValue);
  }
  
 
  //Search by date Livraison
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
  }

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

  //Search by date Livraison
  searchByAffectation(): void {
    this.esimbService.searchByAffectation(this.searchValue)
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
}
