import { Component, OnInit } from '@angular/core';
import { Esimb } from 'src/app/models/esimb.model';
import { ActeTraitement } from 'src/app/models/ActeTraitement'; 
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Graphic } from 'src/app/models/Graphic';
import { GraphicService } from 'src/app/services/graphic.service';



@Component({
  selector: 'app-addgraphic',
  templateUrl: './addgraphic.component.html',
  styleUrls: ['./addgraphic.component.css']
})
export class AddgraphicComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,private collaborateurservice:CollaborateurService,private graphicService:GraphicService  ) { }
  

  //ON Init Function
  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.actetrait.affectation = user.username;
    this.collaborateurservice.getcolabinfosbycuid(user.username)
    .subscribe(data => { 
                this.collab = data;
                  console.log(data);
               },          
     error => {
       console.log(error);
               });
  
  }
  
  //instance de collaborateur
  collab: Collaborateur={
    CUID: '',
    nom: '',
    prenom: '',
  };

  //instance d'acte de traitement
  actetrait: ActeTraitement = {
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
  
  //instance de Graphic
  graphic: Graphic = {
    idGrafic: '',
    iar: '',
    code_imb: '',
    groupe_operation: '',
    dateTraitement: '',
    statut_graphic: '',
    traitement_effectue: '',
    type_traitement: '',
  };
  
  esimb: Esimb = {
    idacte: '',
    codeIMB: '',
    dateVerification: ''

  };
  submitted = false;

  // Function de génération d'id acte traitement pour graphic
  generateidActetraitgraphic(): String {
      return "G"+this.graphic.idGrafic + this.graphic.dateTraitement;
  }
  

  savegraphic(): void {
    const data = {
    idactetrait : this.generateidActetraitgraphic(),
    Ref_tacheBPU : this.actetrait.ref_tacheBPU,
    type_prestation : this.actetrait.type_prestation,
    type_element : this.actetrait.type_element,
    quantite : this.actetrait.quantite,
    date_reception : this.actetrait.date_reception,
    date_livraison : this.actetrait.date_livraison,
    date_validation : this.actetrait.date_validation,
    affectation : this.actetrait.affectation,
    duree : this.actetrait.duree,
    commentaire : this.actetrait.commentaire,
    motif : this.actetrait.motif,
    statut_facturation : this.actetrait.statut_facturation,
    date_reprise : this.actetrait.date_reprise,
    reprise_facturable : this.actetrait.reprise_facturable
    };
    
    

    this.graphicService.create(data, this.graphic)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res == "ok"){
            this.submitted = true;
          }else{
            this.submitted = false;
          }
          
        },
        error: (e) => console.error(e)
      });
  }

  newEsimb(): void {
    this.submitted = false;
    this.esimb = {
      idacte:'',
      codeIMB: '',
      dateVerification: ''
      
    };
  }

}
