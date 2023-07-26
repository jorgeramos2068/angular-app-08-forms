import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
})
export class SelectorPageComponent implements OnInit {
  public countriesForm: FormGroup = this.formBuilder.group({
    region: ['', [Validators.required]],
  });

  // Selectors
  public regions: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.regions = this.countriesService.regions;
  }

  submit(): void {
    console.log(this.countriesForm.value);
  }
}
