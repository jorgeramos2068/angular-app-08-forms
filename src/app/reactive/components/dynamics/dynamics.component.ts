import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamics.component.html',
})
export class DynamicsComponent {
  public dynamicsForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favorites: this.formBuilder.array(
      [
        ['Batman', Validators.required],
        ['Superman', Validators.required],
      ],
      Validators.required
    ),
  });

  public newFavorite: FormControl = this.formBuilder.control(
    '',
    Validators.required
  );

  constructor(private formBuilder: FormBuilder) {}

  get favoritesArr() {
    return this.dynamicsForm.get('favorites') as FormArray;
  }

  isValidField(field: string): boolean {
    return <boolean>(
      (this.dynamicsForm.controls[field].errors &&
        this.dynamicsForm.controls[field].touched)
    );
  }

  addFavorite(): void {
    if (this.newFavorite.invalid) {
      return;
    }
    this.favoritesArr.push(
      this.formBuilder.control(this.newFavorite.value, Validators.required)
    );
    this.newFavorite.reset();
  }

  deleteFavorite(index: number): void {
    this.favoritesArr.removeAt(index);
  }

  submit(): void {
    if (this.dynamicsForm.invalid) {
      this.dynamicsForm.markAllAsTouched();
      return;
    }
    console.log(this.dynamicsForm.value);
    this.dynamicsForm.reset();
  }
}
