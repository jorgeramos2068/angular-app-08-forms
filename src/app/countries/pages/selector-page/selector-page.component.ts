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
  public borders: Country[] = [];

  public loading: boolean = false;

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
          this.loading = true;
        }),
        switchMap((localRegion) =>
          this.countriesService.getCountriesByRegion(localRegion)
        )
      )
      .subscribe({
        next: (localCountries) => {
          this.countries = localCountries;
          this.loading = false;
        },
      });

    // Change of country
    this.countriesForm
      .get('country')
      ?.valueChanges.pipe(
        tap((_) => {
          this.countriesForm.get('border')?.reset('');
          this.loading = true;
        }),
        switchMap((localCountry) =>
          this.countriesService.getBordersByCountry(localCountry)
        ),
        switchMap((localCountry) =>
          this.countriesService.getCountriesByBorders(localCountry.borders)
        )
      )
      .subscribe({
        next: (localCountries) => {
          this.borders = localCountries;
          this.loading = false;
        },
      });
  }

  submit(): void {
    console.log(this.countriesForm.value);
  }
}
