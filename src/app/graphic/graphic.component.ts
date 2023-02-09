import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {
  //Variables
  isLoggedIn = false;
  private roles: string[] = [];
  isPilote = false;
  searchby?='IdGraphic';
  searchValue?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
