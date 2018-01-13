import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Heroe} from "../interfaces/heroe.interface";
import 'rxjs/Rx';

@Injectable()
export class HeroesService {

  heroesURL: string = "https://heroesapp-f24a1.firebaseio.com/heroes.json";

  heroeURL: string = "https://heroesapp-f24a1.firebaseio.com/heroes/";

  constructor(private httpClient: HttpClient) {

  }

  nuevoHeroe(heroe: Heroe) {

    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(this.heroesURL, body, {headers})
      .map(res => {
        console.log(res);
        return res;
      });

  }

  actualizarHeroe(heroe: Heroe, key$: string) {

    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let url = `${this.heroeURL}/${key$}.json`;

    return this.httpClient.put(url, body, {headers})
      .map(res => {
        console.log(res);
        return res;
      });

  }

  getHeroe(key$: string) {
    let url = `${this.heroeURL}/${key$}.json`;
    return this.httpClient.get(url)
      .map(res => {
        console.log(res);
        return res;
      });
  }

  getHeroes() {
    return this.httpClient.get(this.heroesURL)
      .map(res => {
        console.log(res);
        return res;
      });
  }

  borrarHeroe(key$: string) {
    let url = `${this.heroeURL}/${key$}.json`;
    return this.httpClient.delete(url)
      .map(res => res);
  }

}
