import { Component, OnInit } from '@angular/core';
import { Esimb } from 'src/app/models/esimb.model';
import { ActeTraitement } from 'src/app/models/ActeTraitement';
import { EsimbService } from 'src/app/services/esimb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeNode } from 'source-list-map';


@Component({
  selector: 'app-modif',
  templateUrl: './modif.component.html',
  styleUrls: ['./modif.component.css']
})
export class ModifComponent implements OnInit {
  esimbs?: Esimb[];
  //currentEsimb?: Esimb;
  currentIndex = -1;
  codeBanbou= '';
  codeIMB = '';
  date_verification= '';
  
  currentEsimb: Esimb = {
    codeBanbou:'',
    codeIMB:'',
    type_element:'',
    type_prestation:'',
    quantite:1,
    affectation:'',
    dateLivraison:'',
    duree:1,
    commentaire:'',
    motif:'',
    dateVerification:''
  };

  message = '';

  constructor(
    private esimbService: EsimbService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    /*this.currentEsimb= this.route.snapshot.params.esimb;
    console.log(this.currentEsimb.codeIMB);*/
    this.getEsimb(this.route.snapshot.params.idacte);
  }

  getEsimb(idacte: string): void {
    this.esimbService.get(idacte)
      .subscribe(
        data => {
          this.currentEsimb= data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateEsimb(): void {
    this.esimbService.update(this.currentEsimb.idacte, this.currentEsimb)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }


  /*getEsimb(idacte: string): void {
    this.esimbService.findByIdacte(idacte)
      .subscribe(
        data => {
          this.esimbs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  

  updateEsimb(): void {
    this.message = '';

    this.esimbService.update(this.currentActetraitement.idactetrait, this.currentActetraitement)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This ticket was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }*/

}
