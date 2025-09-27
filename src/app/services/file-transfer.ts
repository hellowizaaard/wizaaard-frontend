import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileTransferService {

  httpOptions: any;
  httpOptionsForGet: any;

  constructor(
    public httpClient: HttpClient,
    public auth: AuthService,
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.auth.getToken()}`
      })
    };

    this.httpOptionsForGet = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${this.auth.getToken()}`
      })
    };
  }

  storeFiles(url:any, formData:any) {
    return this.httpClient.post(url, formData, this.httpOptions)
    .pipe(
      catchError((errorResponse: any) => {
        if (errorResponse.status === 422) {
          const errors = errorResponse.error.errors;
          // Handle validation errors here, e.g., display them to the user
        } else {
          // Handle other types of errors if needed
        }
        throw errorResponse;
      })
    );
  }

  previewFile(application_uid: any, file_name: any) {
    // const params = new HttpParams()
    //     .set('application_uid', application_uid)
    //     .set('filename', file_name)
    //     .set('file_info', true);

    // return this.httpClient.get(applicationUrls.applications.application_attachments.preview, { params, ...this.httpOptionsForGet, responseType: 'blob' })
    //     .pipe(
    //         catchError(errorResponse => {
    //             if (errorResponse.status === 422) {
    //                 const errors = errorResponse.error.errors;
    //                 // Handle validation errors here, e.g., display them to the user
    //             } else {
    //                 // Handle other types of errors if needed
    //             }
    //             // Optionally rethrow the error
    //             return throwError(errorResponse);
    //         })
    //     );
  }

  deleteFile(application_uid: any, file_name: any) {
    // const params = new HttpParams()
    //     .set('application_uid', application_uid)
    //     .set('filename', file_name);

    // return this.httpClient.delete(applicationUrls.applications.application_attachments.delete, { params, ...this.httpOptionsForGet, responseType: 'blob' })
    //     .pipe(
    //         catchError(errorResponse => {
    //             if (errorResponse.status === 422) {
    //                 const errors = errorResponse.error.errors;
    //                 // Handle validation errors here, e.g., display them to the user
    //             } else {
    //                 // Handle other types of errors if needed
    //             }
    //             // Optionally rethrow the error
    //             return throwError(errorResponse);
    //         })
    //     );
  }
}
