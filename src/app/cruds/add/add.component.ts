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
  esimb: Esimb = {
    idactetrait: '',
    idacte:'',
    affectation: '',
    motif:'',
    commentaire: '',
    dateLivraison: '',
    dateReception: '',
    dateReprise: '',
    dateValidation: '',
    duree: '',
    quantite: '',
    refTacheBPU: '',
    repriseFacturable: '',
    statutFacturation: '',
    type_element: 'forfait',
    type_prestation: 'ESIMB',
    codeIMB: '',
    dateVerification: '',
    commentairetechnique: '',
    commentairecharte:'',
  };
  submitted = false;
  today: Date = new Date();
  now = new Date().toDateString();


  constructor(private esimbService: EsimbService, private collaborateurService: CollaborateurService,
  private tokenStorageService: TokenStorageService ) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.esimb.affectation = user.username;
    this.collaborateurService.getcolabinfosbycuid(user.username)
    .subscribe(data => { 
                this.collab = data;
                  console.log(data);
               },          
     error => {
       console.log(error);
               });

  this.esimb.dateLivraison=this.now;

  }
  //instance de collaborateur
  collab: Collaborateur={
    CUID: '',
    nom: '',
    prenom: '',
  };
    //AppComponent.getNameUsername();
    //this.getinfoscollaborateur();
      //console.log("this.colab :"+this.collaborateur.nom);

      //this.esimb.dateLivraison=this.now;

      

  saveEsimb(): void {
    console.log("this.esimb.type_element"+ this.esimb.type_element);
    const data = {
      idacte: this.esimb.idacte,
      affectation: this.esimb.affectation,
      commentaire: this.esimb.commentaire,
      dateLivraison: this.esimb.dateLivraison,
      dateReception: this.esimb.dateReception,
      dateReprise: this.esimb.dateReprise,
      dateValidation: this.esimb.dateValidation, 
      duree: this.esimb.duree,
      quantite: this.esimb.quantite,
      refTacheBPU: this.esimb.refTacheBPU,
      repriseFacturable: this.esimb.repriseFacturable,
      statutFacturation: this.esimb.statutFacturation,
      type_element: this.esimb.type_element,
      type_prestation: this.esimb.type_prestation,
      codeIMB: this.esimb.codeIMB,
      dateVerification: this.esimb.dateVerification,
      motif: this.esimb.motif,
      commentairetechnique: this.esimb.commentairetechnique,
      commentairecharte: this.esimb.commentairecharte

    

    };


    this.esimbService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newEsimb(): void {
    this.submitted = false;
    this.esimb = {
      idactetrait: '',
    affectation: '',
    commentaire: '',
    dateLivraison: '',
    dateReception: '',
    dateReprise: '',
    dateValidation: '',
    duree: '',
    quantite: '',
    refTacheBPU: '',
    repriseFacturable: '',
    statutFacturation: '',
    type_element: 'forfait',
    type_prestation: '',
    codeIMB: '',
    dateVerification: '',
    motif:'',
    commentairetechnique: '',
    commentairecharte:'',
    };
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



}
