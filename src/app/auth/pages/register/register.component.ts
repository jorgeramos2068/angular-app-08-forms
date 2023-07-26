import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public namePattern: string = '([a-zA-Z])+ ([a-zA-Z])+';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public registerForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm.reset({
      name: 'Bruce Wayne',
    });
  }

  isInvalidField(field: string) {
    return (
      this.registerForm.get(field)?.invalid &&
      this.registerForm.get(field)?.touched
    );
  }

  submit(): void {
    console.log(this.registerForm.value);
    this.registerForm.markAllAsTouched();
  }
}
