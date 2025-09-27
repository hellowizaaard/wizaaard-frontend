import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(
    private http: HttpClient
  ) { }

  public get(route: string, options: { params?: any } = {}): Observable<any> {
    let httpParams = new HttpParams();
  
    // If params object is provided, convert it to HttpParams
    if (options.params) {
      Object.keys(options.params).forEach(key => {
        const value = options.params[key];
        if (value != null) {
          httpParams = httpParams.set(key, value);
        }
      });
    }
  
    return this.http.get<any>(route, {
      params: httpParams,
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  public post(route: any, data: any): Observable<any> {
    return this.http.post<any>(route, data)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  public update(route: any, data: any): Observable<any> {
    return this.http.post<any>(route, data)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  public patch(route: any, data: any): Observable<any> {
    return this.http.patch<any>(route, data)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  public put(route: any, data: any): Observable<any> {
    return this.http.put<any>(route, data)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  public delete(route: any): Observable<any> {
    return this.http.delete<any>(route)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error:any) {
    let errorMessage:any = [];
    if(error.error instanceof ErrorEvent)
    {
      errorMessage = error.error.message;
    }else{
      errorMessage = {
        errorCode: error.status,
        message : error.message
      }
    }
    return throwError(errorMessage);
  }
}
