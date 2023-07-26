import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

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
}
