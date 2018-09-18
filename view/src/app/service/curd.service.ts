import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const URL = 'http://localhost:4000/API/Curdproject/';

@Injectable({
  providedIn: 'root'
})
export class CurdService {

  constructor( private http: Http ) { }

  public Create(data: any): Observable <any[]> {    
    return this.http.post(URL + 'Create', data)
    .pipe(map( response => response), catchError( error => of(error)));
  }

  public List(): Observable<any[]> {
    return this.http.get(URL + 'List')
    .pipe(map(response => response), catchError(error => of(error)));
  }

  public Delete(Id: any): Observable<any[]> {
    return this.http.get(URL + 'Delete/' + Id)
    .pipe(map(response => response), catchError(error => of(error)));
  }
  public Update(data: any): Observable<any[]> {
    return this.http.post(URL + 'Update', data)
    .pipe(map(response => response), catchError(error => of(error)));
  }
}
