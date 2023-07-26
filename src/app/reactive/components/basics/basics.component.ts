import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
})
export class BasicsComponent implements OnInit {
  public basicsForm: FormGroup = this.formBuilder.group({
    product: ['', [Validators.required, Validators.minLength(3)]],
    price: [null, [Validators.required, Validators.min(0)]],
    existence: [null, [Validators.required, Validators.min(0)]],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.basicsForm.setValue({
      product: '',
      price: 10,
      existence: 10,
    });
  }

  isValidField(field: string): boolean {
    return <boolean>(
      (this.basicsForm.controls[field].errors &&
        this.basicsForm.controls[field].touched)
    );
  }

  submit(): void {
    if (this.basicsForm.invalid) {
      this.basicsForm.markAllAsTouched();
      return;
    }
    console.log(this.basicsForm.value);
    this.basicsForm.reset();
  }
}
