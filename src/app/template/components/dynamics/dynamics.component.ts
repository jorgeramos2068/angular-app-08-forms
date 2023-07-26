import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamics.component.html',
})
export class DynamicsComponent implements OnInit {
  @ViewChild('dynamicForm') dynamicForm!: NgForm;

  public initialForm = {
    name: '',
  };

  constructor() {}

  ngOnInit(): void {}

  validateName(): boolean {
    return (
      this.dynamicForm?.controls.name?.touched &&
      this.dynamicForm?.controls.name?.invalid
    );
  }

  submit(): void {
    console.log('Submitted');
    this.dynamicForm.resetForm(this.initialForm);
  }
}
