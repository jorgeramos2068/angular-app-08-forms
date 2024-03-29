import { Component } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item.interface';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
})
export class SidemenuComponent {
  public templateMenuItems: MenuItem[] = [
    { text: 'Basics', path: '/template/basics' },
    { text: 'Dynamics', path: '/template/dynamics' },
    { text: 'Switches', path: '/template/switches' },
  ];

  public reactiveMenuItems: MenuItem[] = [
    { text: 'Basics', path: '/reactive/basics' },
    { text: 'Dynamics', path: '/reactive/dynamics' },
    { text: 'Switches', path: '/reactive/switches' },
  ];

  public authMenuItems: MenuItem[] = [
    { text: 'Login', path: '/login' },
    { text: 'Register', path: '/register' },
  ];

  public countriesMenuItems: MenuItem[] = [
    { text: 'Selectors', path: '/countries/selectors' },
  ];
}
