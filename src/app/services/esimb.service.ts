import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Esimb } from 'src/app/models/esimb.model';
import { Observable } from 'rxjs';
import { ActeTraitement } from 'src/app/models/ActeTraitement';


const baseUrl = 'http://localhost:8080/api/tickets';
let idacte;
let codeIMB;
let date_verification; 
let url= 'http://localhost:8080/api/add';
//http://localhost:8080/api/add?idacte=6&codeIMB=hjfjflk&date_verification=21/01/2023

@Injectable({
  providedIn: 'root'
})
export class EsimbService {
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

  constructor(private http: HttpClient) { }

  getAll(): Observable<Esimb[]> {
    return this.http.get<Esimb[]>(baseUrl);
  }

  getAllActes(): Observable<Esimb[]> {
    return this.http.get<Esimb[]>(baseUrl+'/actes');
  }

  getActe(id: any): Observable<ActeTraitement> {
    return this.http.get<ActeTraitement>(`${baseUrl}/actes/${id}`);
  }


  get(id: any): Observable<Esimb> {
    return this.http.get<Esimb>(`${baseUrl}/${id}`);
  }

  create(data: any, esimb1: Esimb): Observable<any> {
    date_verification = esimb1.date_verification;
    codeIMB= esimb1.codeIMB;
    idacte= esimb1.idacte;
    
    // date_verification= "21/01/2023";
    //codeIMB="abcd";
   // idacte="2";
    url= url+ '?idacte='+idacte+'&codeIMB='+codeIMB+'&date_verification='+date_verification;
    return this.http.post(url, data, {responseType: 'text'});
    //idacte=2&codeIMB=hjfjflk&date_verification=21/01/2023
    //@RequestBody Acte_traitement acte_traitement, @RequestParam String idacte,
    // @RequestParam String codeIMB, @RequestParam String date_verification
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${this.esimb.idacte}`, data);
  }

  findByCodeIMB(codeIMB: any): Observable<Esimb[]> {
    return this.http.get<Esimb[]>(`${baseUrl}/codeIMB/${codeIMB}`);
  }

  findByIdacte(idacte: any): Observable<Esimb[]> {
    return this.http.get<Esimb[]>(`${baseUrl}/idacte/${idacte}`);
  }

  findBycodeIMBContaining(codeIMB: any): Observable<Esimb[]> {
    return this.http.get<Esimb[]>(`${baseUrl}/Esimb?codeIMB=${codeIMB}`);
  }
}
