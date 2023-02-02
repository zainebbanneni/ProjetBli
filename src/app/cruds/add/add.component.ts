import { Component, OnInit } from '@angular/core';
import { Esimb } from 'src/app/models/esimb.model';
import { EsimbService } from 'src/app/services/esimb.service';
import { ActeTraitement } from 'src/app/models/ActeTraitement';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent{
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

  esimb: Esimb = {
    idacte: '',
    codeIMB: '',
    date_verification: ''

  };
  submitted = false;

  constructor(private esimbService: EsimbService) { }

  saveEsimb(): void {
    const data = {
      idacte: this.esimb.idacte,
      codeIMB: this.esimb.codeIMB,
      date_verification: this.esimb.date_verification,
     // idactetrait: this.actetrait.idactetrait,
      ref_tacheBPU: this.actetrait.ref_tacheBPU,
      type_prestation:this.actetrait.type_prestation,
      type_element: this.actetrait.type_element,
      quantite: this.actetrait.quantite,
      date_reception: this.actetrait.date_reception,
      date_livraison: this.actetrait.date_livraison,
      date_validation: this.actetrait.date_validation,
      //affectation:this.actetrait.affectation,
      affectation:"rrr",
      duree:this.actetrait.duree,
      //commentaire:this.actetrait.commentaire,
      commentaire:"hgjh",
      motif:this.actetrait.motif,
      statut_facturation:this.actetrait.statut_facturation,
      date_reprise:this.actetrait.date_reprise,
      reprise_facturable:this.actetrait.reprise_facturable
      
    };

    this.esimbService.create(data, this.esimb)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newEsimb(): void {
    this.submitted = false;
    this.esimb = {
      idacte:'',
      codeIMB: '',
      date_verification: ''
      
    };
  }
}
