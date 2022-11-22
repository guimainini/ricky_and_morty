import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/shared/services/data.service';
import { BehaviorSubject, tap } from 'rxjs';
import { LocalStorageService } from '../../../../shared/services/localStorage.service';

@Component({
  selector: 'app-characters-list',
  template: `
  <section class="character__list">
    <app-characters-card *ngFor="let char of sharingObservable | async" [character]="char"></app-characters-card>
  </section>
  `,
  styleUrls: ['./characters-list.component.scss']
})



export class CharactersListComponent implements OnInit{
  
  characters$ = this.dataSrv.getRickAndMortyCharacters();

  // public charactersSubject = new BehaviorSubject(null);
  // characters$2 = this.charactersSubject.asObservable();

  public sharingObservable: BehaviorSubject<any> = new BehaviorSubject(null);
  
  constructor( 
    private dataSrv: DataService ,
    private localStorageSvc: LocalStorageService
    ) {
      
    }
  ngOnInit(): void {

    this.characters$ = this.dataSrv.getRickAndMortyCharacters();

    this.characters$.pipe(
       tap( apiResult => {
          const characters = apiResult;

          const currentFavs = this.localStorageSvc.getFavoritesCharacters()
          
          const newData = characters.map((character: any) => {
            const found = !! currentFavs.find( (fav: any) => fav.id === character.id );
            return { ... character, isFavorite : found};
          });
          this.sharingObservable.next(newData)
          
          
        } )

    ).subscribe(  )
    console.log('$$$', this.sharingObservable);
        

  }
  
}
