import { Component } from '@angular/core';
import { DataService } from '@app/shares/services/data.service';

@Component({
  selector: 'app-episodes',
  template: `
  <section class="container">
    <ul class="episodes__list">
        <li *ngFor="let epi of this.episodes$ | async">
            {{ epi.episode }} - {{ epi.name }}
        </li>
    </ul>
  </section>
  `,
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent{

  episodes$ = this.dataSrv.getRickAndMortyEpisodes()

  constructor( private dataSrv: DataService ) { }

}
