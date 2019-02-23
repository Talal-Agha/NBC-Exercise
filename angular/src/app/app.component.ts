import { 
  Component,
  OnInit,
} from '@angular/core';
import { StarWarsService } from './starwars.service';
import { unwatchFile } from 'fs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  people;
  constructor(private swService: StarWarsService) {}

  ngOnInit() {
    this.people = this.swService.getPeople();
  }
  search(event) {
    const toSearch = event.target.value;
    this.people = this.swService.searchPeople(toSearch);
  }
  generateDescription(user) {
    let toReturn;
    if (user.gender === 'male') {
      toReturn = 'He have ';
    }
    if (user.gender === 'female') {
      toReturn = 'She have ';
    }
    if (user.gender === 'n/a') {
      toReturn = 'This has ';
    }

    if (user.skin_color !== 'n/a') {
      toReturn = toReturn + user.skin_color + ' skin ';
    }
    if (user.hair_color !== 'n/a') {
      toReturn = toReturn + user.hair_color + ' hair ';
    }

    if (user.eye_color !== 'n/a') {
      toReturn = toReturn + ' and ' + user.eye_color + ' eyes.';
    }
    return toReturn;
  }
}