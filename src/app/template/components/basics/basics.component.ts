import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
})
export class BasicsComponent implements OnInit {
  @ViewChild('productForm') productForm!: NgForm;

  constructor() {}

  ngOnInit(): void {}

  validateProduct(): boolean {
    return (
      this.productForm?.controls.product?.invalid &&
      this.productForm?.controls.product?.touched
    );
  }

  validatePrice(): boolean {
    return (
      (this.productForm?.controls.price?.invalid &&
        this.productForm?.controls.price?.touched) ||
      this.productForm?.controls.price?.value < 0
    );
  }

  submitProduct(): void {
    console.log(this.productForm.value);
  }
}
