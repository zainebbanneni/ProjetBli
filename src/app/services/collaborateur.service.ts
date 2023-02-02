import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collaborateur } from 'src/app/models/Collaborateur';


const baseUrl = 'http://localhost:8080/collaborateur/';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {
    

    constructor(private http: HttpClient) { }

    // call the api that return collaborateur from cuid.    
    getcolabinfosbycuid(cuid: any): Observable<Collaborateur> {
              return this.http.get<Collaborateur>(`${baseUrl}${cuid}`);
        }
}