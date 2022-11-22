import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { LocalStorageService } from './localStorage.service';

const QUERY = gql `
 {
  episodes {
    results {
      name
      episode
    }
  }
  
}
`;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private episodesSubjex = new BehaviorSubject(null);
  // episodes$ = this.episodesSubjex.asObservable();

  public charactersSubject = new BehaviorSubject(null);
  characters$ = this.charactersSubject.asObservable();


  constructor( 
    private http: HttpClient,
    private localStorageSvc: LocalStorageService
     ) { 
    this.getRickAndMortyCharacters();
    
    
  }

   getRickAndMortyCharacters(): Observable<any>{
    
    return this.http.get<any>("https://rickandmortyapi.com/api/character")
      .pipe(
        map( (apiResult) => apiResult.results ),
        // tap( apiResult => {
        //   const characters = apiResult;

        //   // this.parseCharactersData(characters);


        //   const currentFavs = this.localStorageSvc.getFavoritesCharacters()
          
        //   const newData = characters.map((character: any) => {
        //     const found = !! currentFavs.find( (fav: any) => fav.id === character.id );
        //     return { ... character, isFavorite : found};
        //   });
        //   console.log('asd',newData);
        // } )
        // map( (apiResult) => apiResult.results ),
        // map( apiResult => {
        //   console.log('...',apiResult.results);
        //   const characters = apiResult.results;

        //   // this.parseCharactersData(characters);


        //   const currentFavs = this.localStorageSvc.getFavoritesCharacters()
          
        //   const newData = characters.map((character: any) => {
        //     const found = !! currentFavs.find( (fav: any) => fav.id === character.id );
        //     return { ... character, isFavorite : found};
        //   });

        //   console.log('asd',newData);
        //   this.charactersSubject.next(newData);
        //   console.log('asds',this.charactersSubject.next(newData));
        
        // } )
          
          
          
          
      )
  }
   getRickAndMortyEpisodes(): Observable<any>{
    return this.http.get<any>("https://rickandmortyapi.com/api/episode")
      .pipe(
        // take(15),
        map( (apiResult) => apiResult.results),
        // tap(res => console.log('res',res.results))  
      )
  }

  // private parseCharactersData(characters: any[]): void {
    
  //   const currentFavs = this.localStorageSvc.getFavoritesCharacters()
  //   const newData = characters.map(character => {
  //     const found = !! currentFavs.find( (fav: any) => fav.id === character.id );
  //     return { ... character, isFavorite : found};
  //   });
    
  // }

}
