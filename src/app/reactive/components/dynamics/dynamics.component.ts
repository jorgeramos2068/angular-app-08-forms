import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamics.component.html',
})
export class DynamicsComponent implements OnInit {
  public dynamicsForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  isValidField(field: string): boolean {
    return <boolean>(
      (this.dynamicsForm.controls[field].errors &&
        this.dynamicsForm.controls[field].touched)
    );
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
