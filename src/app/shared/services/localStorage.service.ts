import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const MY_FAVORITE = 'myFavorites'
@Injectable({providedIn: 'root'})


export class LocalStorageService {

    private charactersFavSubject = new BehaviorSubject<any>(null);
    charactersFav$ = this.charactersFavSubject.asObservable();

    constructor() { 
        this.initialStorage();
    }

    addOrRemoveFavorite(character: any): void {
        const {id} = character;
        const currentsFav = this.getFavoritesCharacters();
        const found = !! currentsFav.find( (fav: any) => fav.id === id );
        found ? this.removeFromFavorite(id) : this.addToFavorite(character);
    }

    private addToFavorite(character: any): void {
        try {
            const currentsFav = this.getFavoritesCharacters();
            localStorage.setItem(MY_FAVORITE, JSON.stringify([ ... currentsFav, character]))
            this.charactersFavSubject.next([ ... currentsFav, character]);
        } catch (error) {
            console.log('Error saving localStorage', error);
            alert('Error');
        }
    }

    private removeFromFavorite(id: any): void {
        try {
            const currentsFav = this.getFavoritesCharacters();
            const characters = currentsFav.filter( (item: any) => item.id !== id );
            localStorage.setItem(MY_FAVORITE, JSON.stringify([ ... characters ]));
            this.charactersFavSubject.next([ ...characters ])
        } catch (error) {
            console.log('Error removing localStorage', error);
            alert('Error');
        }
    }

    getFavoritesCharacters(): any {
        try {
            const charactersFav = JSON.parse(localStorage.getItem(MY_FAVORITE)!)
            this.charactersFavSubject.next(charactersFav);
            return charactersFav;
        } catch (error) {
            console.log('Error getting favorites from localStorage', error);
        }
    }

    clearStorage(): void {
        try {
            localStorage.clear()
        } catch (error) {
            console.log('Error cleaning localStorage', error);
        }
    }
            
    
    private initialStorage(): void{
        let currents = JSON.parse(localStorage.getItem(MY_FAVORITE)!)
        
        if(!currents){
            localStorage.setItem(MY_FAVORITE, JSON.stringify([]));
        }
        
        this.getFavoritesCharacters();
            

    }
}