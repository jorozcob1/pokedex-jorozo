import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
  private urlApi = 'https://pokeapi.co/api/v2/';
  constructor(private http: HttpClient) {}
  obtenerPokemon(nombre: string): Observable<any> {
    return this.http.get(`${this.urlApi}pokemon/${nombre}`);
  }
}
