import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';
import { Country, CountryWithBorders } from '../interfaces/countries.interface';

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

  getCountryByCode(code: string): Observable<Country> {
    const url: string = `${this.baseUrl}/alpha/${code}?fields=name, alpha3Code`;
    return this.http.get<Country>(url);
  }

  getCountriesByBorders(borders: string[]): Observable<Country[]> {
    if (borders.length === 0) {
      return of([]);
    }
    const requests: Observable<Country>[] = [];
    borders.map((border) => {
      const request = this.getCountryByCode(border);
      requests.push(request);
    });
    return combineLatest(requests);
  }
}
