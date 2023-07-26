import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup = this.formBuilder.group(
    {
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
        [this.emailValidator],
      ],
      username: [
        '',
        [Validators.required, this.validatorsService.cannotBeSuperman],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorsService.areFieldsTheSame('password', 'password2'),
      ],
    }
  );

  get emailErrorMsg(): string {
    if (this.registerForm.get('email')?.errors?.required) {
      return 'The email field is required.';
    } else if (this.registerForm.get('email')?.errors?.pattern) {
      return 'The value must be a valid email.';
    } else if (this.registerForm.get('email')?.errors?.emailExists) {
      return 'The email is already in use.';
    }
    return '';
  }

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.registerForm.reset({
      name: 'Bruce Wayne',
      email: 'test1@test.com',
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
