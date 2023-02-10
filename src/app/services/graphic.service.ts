import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActeTraitement } from '../models/ActeTraitement';
import { Graphic } from '../models/Graphic';
import { Grafic_req } from '../models/Grafic_req';


const baseUrl = 'http://localhost:8080/api/graphic/';
let url= 'http://localhost:8080/api/graphic/';
@Injectable({
    providedIn: 'root'
  })
  export class GraphicService {
   
     //instance Acte de traitement
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

    //Instance Graphic
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
    
    //Contructeur
    constructor(private http: HttpClient) { }
    

    //Service qui retourne tous les graphics
    getAll(): Observable<Graphic[]> {
      return this.http.get<Graphic[]>(baseUrl+'getAll');
    }
    
    //Service de save de graphic
    create(data: any, graphic: Graphic): Observable<any> {
      this.graphic = graphic;
      const urli= url+'add'+'?id_Grafic='+graphic.idGrafic+'&iar='+graphic.iar+'&code_imb='+graphic.code_imb+'&groupe_operation='+graphic.groupe_operation+'&date_traitement='+graphic.dateTraitement+'&statut_graphic='+graphic.statut_graphic+'&traitement_effectue='+graphic.traitement_effectue+'&type_traitement='+graphic.type_traitement;
      return this.http.post(urli, data, {responseType: 'text'});
    }

    //Service de recherche par ID Graphic
    searchByIdGraphic(IdGraphic: any): Observable<Graphic[]> {
      const urli= url+"getGraphicById?idGraphic="+IdGraphic;
      return  this.http.get<Graphic[]>(urli);
      //return this.http.get<Graphic[]>(urli, data, {responseType: 'text'});
    }

    //Service de recherche par Date de traitement
    searchByDateTraitement(dateTraitement: any): Observable<Graphic[]> {
      const urli= url+"getGraphicByDT?dateTtraitement="+dateTraitement;
      return  this.http.get<Graphic[]>(urli);
    }

    //Update graphic service
    update(data: any, graphic: Graphic): Observable<any> {
      this.graphic = graphic;console.log("ok updaaaaate");
      const urli= url+'Update'+'?id_Grafic='+graphic.idGrafic+'&iar='+graphic.iar+'&code_imb='+graphic.code_imb+'&groupe_operation='+graphic.groupe_operation+'&date_traitement='+graphic.dateTraitement+'&statut_graphic='+graphic.statut_graphic+'&traitement_effectue='+graphic.traitement_effectue+'&type_traitement='+graphic.type_traitement;
      console.log(" urllll : "+urli);
      
      return this.http.put(urli, data, {responseType: 'text'}); 
    }

    //get graphics
    getGrafics(cuid: String,role: String): Observable<Grafic_req[]> {
      const urli= url+"getGraphics?cuid="+cuid+"&role="+role;
      console.log("urli : "+urli);
      
      return this.http.get<Graphic[]>(urli);
    }
  }