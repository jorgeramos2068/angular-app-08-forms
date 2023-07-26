import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
})
export class BasicsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  submitProduct(productForm: NgForm): void {
    console.log(productForm.value);
  }
}
