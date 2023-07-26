import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  public namePattern: string = '([a-zA-Z])+ ([a-zA-Z])+';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() {}

  cannotBeSuperman(control: FormControl): ValidationErrors | null {
    const localValue: string = control.value?.trim().toLowerCase();
    if (localValue === 'superman') {
      return {
        noSuperman: true,
      };
    }
    // Valid
    return null;
  }

  areFieldsTheSame(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(field1)?.value;
      const pass2 = formGroup.get(field2)?.value;
      if (pass1 !== pass2) {
        const errorObject = {
          notEqual: true,
        };
        formGroup.get(field2)?.setErrors(errorObject);
        return errorObject;
      }
      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }
}
