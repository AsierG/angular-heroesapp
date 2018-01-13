import {Component, OnInit} from '@angular/core';
import {HeroesService} from "../../services/heroes.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: any[] = [];
  loading: boolean = true;

  constructor(private heroesService: HeroesService) {
    this.heroesService.getHeroes()
      .subscribe(data => {

        this.loading = false;
        this.heroes = data;

        // setTimeout(() => {
        //   this.loading = false;
        //   this.heroes = data;
        // }, 3000);

        console.log(data);

      });
  }

  ngOnInit() {
  }

  borrarHeroe(key$: string) {
    this.heroesService.borrarHeroe(key$)
      .subscribe(response => {
        if (response) {
          console.error(response);
        } else {
          delete this.heroes[key$];
        }
      })
  }

}
