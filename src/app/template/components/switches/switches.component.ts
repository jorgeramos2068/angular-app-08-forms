import { Component } from '@angular/core';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
})
export class SwitchesComponent {
  public person = {
    gender: 'F',
    showNotifications: false,
  };

  public terms: boolean = false;
}
