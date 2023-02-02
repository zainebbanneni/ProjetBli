import { Component, OnInit } from '@angular/core';
import { Esimb } from 'src/app/models/esimb.model';
import { EsimbService } from 'src/app/services/esimb.service';
import { ActeTraitement } from 'src/app/models/ActeTraitement';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

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

  currentEsimb: Esimb = {
    codeIMB:'',
    date_verification:''
  };

  esimbs?: Esimb[];
  actes?: ActeTraitement[];
  //currentEsimb?: Esimb;
  currentIndex = -1;
  idacte= '';
  codeIMB = '';

  constructor(private esimbService: EsimbService) {
   }

  ngOnInit(): void {
    this.retrieveEsimbs();
    //this.retrieveActes();
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

  setActiveEsimb(esimb: Esimb, index: number): void {
    this.currentEsimb = esimb;
    //this.currentActetraitement= acte;
    this.currentIndex = index;
  }


  searhActe(): void {
    this.esimbService.getActe(this.currentEsimb.idacte)
      .subscribe(
        data => {
          this.currentActetraitement = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  searchCodeIMB(): void {
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
}
