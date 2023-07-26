import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
})
export class BasicsComponent {
  public basicsForm: FormGroup = this.formBuilder.group({
    product: ['My value'],
    price: [10],
    existence: [0],
  });

  constructor(private formBuilder: FormBuilder) {}
}
