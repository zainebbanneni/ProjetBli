import { Component, OnInit } from '@angular/core';
import { EsimbService } from 'src/app/services/esimb.service';
import { Esimb } from 'src/app/models/esimb.model'
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AppComponent } from 'src/app/app.component';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],

  template: `
    <p>Date d'aujourd'hui : {{ today | date:'MM/DD/yyyy' }}</p>
  `


})
export class AddComponent implements OnInit {

  //Variables
 private roles: string[] = [];
 isPilote = false;
 isLoading= false;
 colabsteam?: Collaborateur[];

  //Error variables 0 : ok / 1,2 : not ok
 codeBanbou_err = 0;
 codeIMB_err = 0;
 dateVerification_err = 0;
 quantite_err = 0;
 motif_err = 0;
 duree_err = 0;
 commentaire_err = 0;
 dateLivraison_err = 0;
 commentairetechnique_err = 0;
 commentairedemandeur_err = 0;
 

 submitted = false;

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
  currentEsimb: Esimb = {
    idacte: '',
    codeBanbou:'',
    affectation: '',
    motif:'',
    commentaire: '',
    dateLivraison: '',
    dateReception: '',
    dateReprise: '',
    dateValidation: '',
    duree: 1,
    quantite: 1,
    refTacheBPU: '',
    repriseFacturable: '',
    statutFacturation: '',
    type_element: 'forfait',
    type_prestation: 'ESIMB',
    codeIMB: '',
    dateVerification: '',
    commentairetechnique: '',
    commentairedemandeur:'',
  };

  today: Date = new Date();
  now = new Date().toDateString();

   //instance de collaborateur
   collab: Collaborateur={
    cuid: '',
    nom: '',
    prenom: '',
  };
  
  

  constructor(private esimbService: EsimbService, private collaborateurService: CollaborateurService,
  private tokenStorageService: TokenStorageService ) { }

  ngOnInit(): void {

    this.isLoading = true;
      //get user
      const user = this.tokenStorageService.getUser();
  
      //check the roles if PILOT
      this.roles = user.roles;
      if (this.roles.includes('ROLE_PILOTE')){
        this.getteammembersbycuid();
        this.isPilote = true;
        console.log("this is Pilote")
      }else{
        this.isPilote = false;
        console.log("this is not Pilote" + this.roles)
      }
  
      //get user Informations
      this.currentEsimb.affectation = user.username;
      this.collaborateurService.getcolabinfosbycuid(user.username)
      .subscribe(data => { 
                  this.collab = data;
                    console.log(data);
                    
                 },          
       error => {
         console.log(error);
                    
                 });

    this.isLoading = false;
    this.currentEsimb.dateLivraison=this.now;
    }

    //save esimb
  saveEsimb(): void {
    console.log("rr");
    this.isLoading = true;
    if (this.validateForm()){
        this.esimbService.save(this.currentEsimb)
          .subscribe({
            next: (res) => {
              console.log(res);
              if (res == "ok"){
                this.submitted = true;
                console.log("rtdgfgh");
              }else{
                this.submitted = false;
                console.log("erdgv");
              }
            },
            error: (e) => console.error(e)
          });
    }
    this.isLoading = false;
  }



  newEsimb(): void {
    this.submitted = false;
    this.currentEsimb = {
    idacte: '',
    affectation: '',
    commentaire: '',
    dateLivraison: '',
    dateReception: '',
    dateReprise: '',
    dateValidation: '',
    duree: 1,
    quantite: 1,
    refTacheBPU: '',
    repriseFacturable: '',
    statutFacturation: '',
    type_element: 'forfait',
    type_prestation: '',
    codeBanbou:'',
    codeIMB: '',
    dateVerification: '',
    motif:'',
    commentairetechnique: '',
    commentairedemandeur:'',
    };
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



    //validate form
 validateForm(): boolean {
  let err;
  err = (this.validateCodeBanbou() && 
         this.validateCodeImb()  && 
         this.validateDateVerification() &&
         this.validateMotif()&&
         this.validateDuree()); 
  return err;
 }

 //validate Id esimb
 validateCodeBanbou() : boolean {
  if(!(this.currentEsimb.codeBanbou?.toString().length === 8) ){
    this.codeBanbou_err = 1;
    return false;
  }else{
    this.codeBanbou_err = 0;
    return true;
  }
 }

  //validate Code IMB
  validateCodeImb() : boolean {
    if( this.currentEsimb.codeIMB?.toString().length !< 5 ){
      this.codeIMB_err = 1;
      return false;
    }else if(!(this.currentEsimb.codeIMB?.startsWith('IMB/'))){
      this.codeIMB_err = 2;
      return false;
    }else{
      this.codeIMB_err = 0;
      return true;
    }
   }

  //validate Date verification
  validateDateVerification() : boolean {
    if(!(this.currentEsimb.dateVerification?.toString().length === 10) ){
      this.dateVerification_err = 1;
      return false;
    }else{
      this.dateVerification_err = 0;
      return true;
    }
  }

   //validate Motif
   validateMotif() : boolean {
    if (this.currentEsimb.motif == '') {
      this.motif_err = 1;
      return false;
    }else{
      this.motif_err = 0;
      return true;
    }
  }

  //validate Duree
  validateDuree() : boolean {
    if ((this.currentEsimb.duree == 0) || (this.currentEsimb.duree !> 60) ){
      this.duree_err = 1;
      return false;
    } else {
      this.duree_err = 0;
      return true;
    }
  }


  /*//validate Commentaire
  validateCommentaire() : boolean {
    if(!(this.currentEsimb.commentaire?.toString().length === 10) ){
      this.commentaire_err = 1;
      return false;
    }else{
      this.commentaire_err = 0;
      return true;
    }
  }

  //validate Commentaire technique
  validateCommentairetechnique() : boolean {
    if(!(this.currentEsimb.commentairetechnique?.toString().length === 10) ){
      this.commentairetechnique_err = 1;
      return false;
    }else{
      this.commentairetechnique_err = 0;
      return true;
    }
  }
  
  //validate Commentaire charté
  validateCommentairecharte() : boolean {
    if(!(this.currentEsimb.commentairecharte?.toString().length === 10) ){
      this.commentairecharte_err = 1;
      return false;
    }else{
      this.commentairecharte_err = 0;
      return true;
    }
  }*/

  




}
