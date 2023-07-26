import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Favorite, Person } from '../../interfaces/person.interface';

@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamics.component.html',
})
export class DynamicsComponent {
  @ViewChild('dynamicForm') dynamicForm!: NgForm;

  public person: Person = {
    name: 'Batman',
    favorites: [
      { id: 1, name: 'Mario Bros' },
      { id: 2, name: 'Taxi Driver' },
    ],
  };
  public newGame: string = '';

  constructor() {}

  validateName(): boolean {
    return (
      this.dynamicForm?.controls.name?.touched &&
      this.dynamicForm?.controls.name?.invalid
    );
  }

  addGame(): void {
    const newLocalFavorite: Favorite = {
      id: this.person.favorites.length,
      name: this.newGame,
    };
    this.person.favorites.push(newLocalFavorite);
    this.newGame = '';
  }

  deleteFavorite(index: number): void {
    this.person.favorites.splice(index, 1);
  }

  submit(): void {
    console.log('Submitted');
  }
}
