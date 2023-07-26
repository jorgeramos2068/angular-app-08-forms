import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.namePattern),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
    ],
    username: [
      '',
      [Validators.required, this.validatorsService.cannotBeSuperman],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit(): void {
    this.registerForm.reset({
      name: 'Bruce Wayne',
      email: 'test@test.com',
      username: 'batman',
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
