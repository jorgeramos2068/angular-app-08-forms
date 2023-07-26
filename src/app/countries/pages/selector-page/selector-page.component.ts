import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

import { Country } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
})
export class SelectorPageComponent implements OnInit {
  public countriesForm: FormGroup = this.formBuilder.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

  // Selectors
  public regions: string[] = [];
  public countries: Country[] = [];
  public borders: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.regions = this.countriesService.regions;

    // Change of region
    this.countriesForm
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.countriesForm.get('country')?.reset('');
        }),
        switchMap((localRegion) =>
          this.countriesService.getCountriesByRegion(localRegion)
        )
      )
      .subscribe({
        next: (localCountries) => {
          this.countries = localCountries;
        },
      });

    // Change of country
    this.countriesForm
      .get('country')
      ?.valueChanges.pipe(
        tap((_) => {
          this.countriesForm.get('border')?.reset('');
        }),
        switchMap((localCountry) =>
          this.countriesService.getBordersByCountry(localCountry)
        )
      )
      .subscribe({
        next: (localCountryWithBorder) => {
          this.borders = localCountryWithBorder.borders;
        },
      });
  }

  submit(): void {
    console.log(this.countriesForm.value);
  }
}
