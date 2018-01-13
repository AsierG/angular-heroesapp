import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Heroe} from "../../interfaces/heroe.interface";
import {HeroesService} from "../../services/heroes.service";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  private heroe: Heroe = {
    nombre: "",
    bio: "",
    casa: "Marvel"
  };

  nuevo: boolean = false;
  id: string;

  constructor(private heroesService: HeroesService,
              private router: Router,
              private route: ActivatedRoute) {

    this.route.params.subscribe(parametros => {
      console.log(parametros);
      this.id = parametros['id'];
      if (this.id !== "nuevo") {
        this.heroesService.getHeroe(this.id)
          .subscribe(heroe => this.heroe = heroe);
      }
    }, error => console.error(error));

  }

  ngOnInit() {
  }

  guardar() {
    console.log(this.heroe);

    if (this.id == "nuevo") {
      this.heroesService.nuevoHeroe(this.heroe)
        .subscribe(data => {
            this.router.navigate(['/heroe', data.name])
          },
          error => console.error(error));
    } else {
      this.heroesService.actualizarHeroe(this.heroe, this.id)
        .subscribe(data => {
          console.log(data)
        }), error => console.error(error);
    }

  }

  agregarNuevo(forma: NgForm) {
    this.router.navigate(['/heroe', 'nuevo']);
    forma.reset({
      casa: "Marvel"
    });
  }


}
