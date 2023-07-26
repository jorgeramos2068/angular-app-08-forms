import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CountryWithBorders, Country } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private baseUrl = 'https://restcountries.com/v2';
  private _regions: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regions(): string[] {
    return [...this._regions];
  }

  constructor(private http: HttpClient) {}

  getCountriesByRegion(region: string): Observable<Country[]> {
    const url: string = `${this.baseUrl}/region/${region}?fields=name,alpha3Code`;
    return this.http.get<Country[]>(url);
  }

  getBordersByCountry(code: string): Observable<CountryWithBorders> {
    if (!code) {
      return of({
        borders: [],
      });
    }
    const url: string = `${this.baseUrl}/alpha/${code}?fields=borders`;
    return this.http.get<CountryWithBorders>(url);
  }
}
