import { Component } from '@angular/core';
import { DataService } from '@shares/services/data.service';

@Component({
  selector: 'app-characters-list',
  template: `
  

  <section class="character__list">
    <app-characters-card *ngFor="let char of characters$ | async" [character]="char"></app-characters-card>
  </section>
  `,
  styleUrls: ['./characters-list.component.scss']
})



export class CharactersListComponent {
  
  characters$ = this.dataSrv.getRickAndMortyCharacters();

  constructor( private dataSrv: DataService ) {}

  
}
