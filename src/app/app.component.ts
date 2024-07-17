import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokeapiService } from './services/pokeapi.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, CommonModule],
  providers: [PokeapiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  nombrePokemon: string = '';
  datosPokemon: Pokemon | null = null;

  constructor(private pokemonServicio: PokeapiService) {}

  buscarPokemon() {
    if (this.nombrePokemon) {
      this.pokemonServicio
        .obtenerPokemon(this.nombrePokemon.toLowerCase())
        .subscribe({
          next: (objetoDatosAPI: Pokemon) => {
            this.datosPokemon = objetoDatosAPI;
          },
          error: (error) => {
            console.error('Error al buscar el Pokémon:', error);
            this.datosPokemon = null;
            alert('No se pudo encontrar el Pokémon. Intenta con otro nombre.');
          },
        });
    }
  }

  cargarPokemonAleatorio() {
    const idAleatorio = Math.floor(Math.random() * 898) + 1; // Hay 898 Pokémon en total
    this.pokemonServicio.obtenerPokemon(idAleatorio.toString()).subscribe({
      next: (objetoDatosAPI: Pokemon) => {
        this.datosPokemon = objetoDatosAPI;
        this.nombrePokemon = objetoDatosAPI.name;
      },
      error: (error) => {
        console.error('Error al cargar Pokémon aleatorio:', error);
        alert(
          'Hubo un error al cargar un Pokémon aleatorio. Intenta de nuevo.'
        );
      },
    });
  }
  getTipoClass(tipo: string): string {
    const tipoClases: { [key: string]: string } = {
      normal: 'bg-gray-500',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-300',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-700',
      ghost: 'bg-purple-600',
      dragon: 'bg-indigo-600',
      dark: 'bg-gray-700',
      steel: 'bg-gray-400',
      fairy: 'bg-pink-300',
    };
    return tipoClases[tipo] || 'bg-gray-500';
  }
}
