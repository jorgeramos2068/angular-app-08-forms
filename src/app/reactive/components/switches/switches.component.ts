import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
})
export class SwitchesComponent implements OnInit {
  public switchesForm: FormGroup = this.formBuilder.group({
    gender: ['M', Validators.required],
    showNotifications: [true, Validators.required],
    terms: [false, Validators.requiredTrue],
  });

  public person = {
    gender: 'F',
    showNotifications: false,
  };

  public terms: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.switchesForm.reset(this.person);

    this.switchesForm.valueChanges.subscribe({
      next: (form) => console.log(form),
    });
  }

  submit(): void {
    const currentValue = { ...this.switchesForm.value };
    delete currentValue.terms;
    this.person = currentValue;
  }
}
