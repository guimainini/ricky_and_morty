import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

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

  // private charactersSubject = new BehaviorSubject(null);
  // characters$ = this.charactersSubject.asObservable();


  constructor( private http: HttpClient ) { 
    // this.getRickAndMortyCharacters();
    
  }

  // getDataAPI(): void {
  //   this.apollo.watchQuery<any>({
  //     query: QUERY
  //   }).valueChanges.pipe(
  //     take(1),
  //     tap( res => {
  //       console.log(res)
  //     })
  //   ).subscribe()
  // }
  
   getRickAndMortyCharacters(): Observable<any>{
    return this.http.get<any>("https://rickandmortyapi.com/api/character")
      .pipe(
        // take(15),
        map( (apiResult) => apiResult.results ),
        // tap(res => console.log('res',res.results))  
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

      

}
