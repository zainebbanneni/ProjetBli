import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Esimb } from 'src/app/models/esimb.model';
import { Observable } from 'rxjs';
import { ActeTraitement } from 'src/app/models/ActeTraitement';
import { Esimb_req } from 'src/app/models/Esimb_req';


const baseUrl = 'http://localhost:8080/api/esimbs';
let idacte;
let codeIMB;
let date_verification; 
let url= 'http://localhost:8080/api/';
//http://localhost:8080/api/add?idacte=6&codeIMB=hjfjflk&date_verification=21/01/2023

@Injectable({
  providedIn: 'root'
})
export class EsimbService {
  esimb: Esimb = {
    codeBanbou: '',
    codeIMB: '',
    dateVerification: '',
    idacte:'',
    refTacheBPU:'',
    type_prestation:'',
    type_element:'',
    quantite:1,
	 dateReception:'',
	 dateLivraison:'',
	 dateValidation:'',
	 affectation: '',
	 duree: 1,
	 commentaire: '',
	 motif: '',
	 statutFacturation: '',
	dateReprise: '',
    repriseFacturable: ''
  };

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  //Service de save de esimb
  save(data: any): Observable<any> {
    console.log("ee");
    const urli= url+'Add';
    return this.http.post(urli, data, {responseType: 'text'});
  }

  getAll(): Observable<Esimb[]> {
    return this.http.get<Esimb[]>(baseUrl);
  }


  getAllActes(): Observable<Esimb[]> {
    return this.http.get<Esimb[]>(baseUrl+'/actes');
  }

  getActe(id: any): Observable<Esimb> {
    return this.http.get<Esimb>(`${baseUrl}/actes/${id}`);
  }


  get(idactetrait: string): Observable<Esimb> {
    return this.http.get<Esimb>(`${baseUrl}/${idactetrait}`);
  }

  /*create(data: any, esimb1: Esimb): Observable<any> {
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
  }*/

  updatee(idactetrait: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${idactetrait}`, data);
  }

  findByCodeIMB(codeIMB: any): Observable<Esimb[]> {
    return this.http.get<Esimb[]>(`${baseUrl}/codeIMB/${codeIMB}`);
  }

  findByCodeBanbou(codeBanbou: any): Observable<Esimb[]> {
    return this.http.get<Esimb[]>(`${baseUrl}/codeBanbou/${codeBanbou}`);
  }

  findBycodeIMBContaining(codeIMB: any): Observable<Esimb[]> {
    return this.http.get<Esimb[]>(`${baseUrl}/Esimb?codeIMB=${codeIMB}`);
  }

   //Service de recherche par Code Banbou
   searchByCodeBanbou(codeBanbou: any): Observable<Esimb[]> {
    const urli= url+"getEsimbBycodeBanbou/"+codeBanbou;
    return  this.http.get<Esimb[]>(urli);
  }

  //Service de recherche par codeIMB
  searchBycodeIMB(codeIMB: any): Observable<Esimb[]> {
    const urli= url+"getEsimbBycodeIMB/"+codeIMB;
    return  this.http.get<Esimb[]>(urli);
  }
  //Service de recherche par affectation
  searchByaffectation(affectation: any): Observable<Esimb[]> {
    const urli= url+"getEsimbByAffectation/"+affectation;
    return  this.http.get<Esimb[]>(urli);
  }


  searchByAffectation(affectation: any,cuid: String,active: boolean): Observable<Esimb_req[]> {
      console.log("Affectation service "+affectation);

      const urli= url+"getByAffectation?cuid="+cuid+"&affectation="+affectation;
      return  this.http.get<Esimb[]>(urli);
  }

  //Service de recherche par Date de livraison
  searchByDateLivraison(dateLivraison: any): Observable<Esimb[]> {
    const urli= url+"getEsimbByDL/"+dateLivraison;
    return  this.http.get<Esimb[]>(urli);
  }

  //Update esimb service
  update(data: any, esimb: Esimb): Observable<any> {
    this.esimb = esimb;console.log("ok updaaaaate");
    const urli= url+'Update'+'?idacte='+esimb.idacte;
    console.log(" urllll : "+urli);
    
    return this.http.put(urli, data, {responseType: 'text'}); 
  }

  //get esimbss
  getGraphics(cuid: String,role: String): Observable<Esimb[]> {
    const urli= url+"getGraphics?cuid="+cuid+"&role="+role;
    console.log("urli : "+urli);
    
    return this.http.get<Esimb[]>(urli);
  }
}
