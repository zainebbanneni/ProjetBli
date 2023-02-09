import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Observable } from 'rxjs';
import { Collaborateur } from 'src/app/models/Collaborateur';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showProducteurBoard = false;
  showPiloteBoard = false;
  showDirectionBoard = false;
  username?: string;
  issidebar= true;
  isesimb = false;
  isgraphic = false;
  isdesat = false;
  isnropm = false;
  isbrame = false;
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
  
  constructor(private tokenStorageService: TokenStorageService, private collaborateurService: CollaborateurService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

  
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;


      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showProducteurBoard = this.roles.includes('ROLE_PRODUCTEUR');
      this.showPiloteBoard = this.roles.includes('ROLE_PILOTE');
      this.showDirectionBoard = this.roles.includes('ROLE_DIRECTION');



      this.getinfoscollaborateur();
      console.log("user.username :"+user.username);
      console.log("this.colab :"+this.collaborateur.nom);
      this.username = user.username;
    }
    else{
      this.issidebar= false;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  hidesidebar(): void{
    this.issidebar= false;
  }

  hideall(): void{
    this.isesimb = false;
    this.isgraphic = false;
    this.isdesat = false;
    this.isnropm = false;
    this.isbrame = false;
  }

  afficheEsimOptions():void {  
    this.hideall();
      if (this.isesimb) {  
      this.isesimb = false;
        }else
    {this.isesimb = true;    }     };

    afficheGraphicOptions():void {  
      this.hideall();
        if (this.isgraphic) {  
        this.isgraphic = false;
          }else
      {this.isgraphic = true;    }     };

  /*afficheEsimOptions():void {  
      if (this.isesimb) {  
      this.isesimb = false;
        }else
    {this.isesimb = true;    }     };*/


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
