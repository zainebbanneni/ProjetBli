import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from 'src/app/_services/auth.service';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Collaborateur } from 'src/app/models/Collaborateur';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  currentCollaborateur: any;
  cuid: any;

  constructor(private token: TokenStorageService, private authService: AuthService, private collaborateur: CollaborateurService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();

  }
}