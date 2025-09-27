import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  public user!:any;

  constructor(
    private router: Router,
  ) { }

  setUser(user:any): void {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  getPosition(): Promise<any>{
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }

  // getFormData(formGroup:FormGroup): FormData{
  //   const formData = new FormData();
  //   // Append each form input to the FormData object
  //   Object.keys(formGroup.controls).forEach((key) => {
  //     const value = formGroup.get(key)?.value;

  //     // Append the value, ensuring null or undefined values are handled
  //     formData.append(key, value ?? '');
  //   });

  //   return formData;
  // }

  getFormData(formGroup: FormGroup): FormData {
    const formData = new FormData();

    Object.keys(formGroup.controls).forEach((key) => {
        const value = formGroup.get(key)?.value;

        if (Array.isArray(value)) {
            // Handle array values (multiple file objects)
            value.forEach((item, index) => {
                if (item && typeof item === 'object' && 'file' in item) {
                    const file = item.file;
                    const id = item.id; // Extract file ID

                    if (id !== null) {
                        // Append file ID if available
                        formData.append(`${key}[${index}][id]`, id);
                    }

                    if (file instanceof File) {
                        // Append File object
                        formData.append(`${key}[${index}][file]`, file);
                    } else if (typeof file === 'string' && file.startsWith('data:')) {
                        // Convert Base64 to Blob and append
                        const blob = this.base64ToBlob(file);
                        formData.append(`${key}[${index}][file]`, blob, `file-${index}.jpg`);
                    }
                } else {
                    // Append other array values normally
                    formData.append(`${key}[${index}]`, item);
                }
            });
        } else if (value && typeof value === 'object' && 'file' in value) {
            // Handle single file object
            const file = value.file;
            const id = value.id;

            if (id !== null) {
                // Append file ID
                formData.append(`${key}[id]`, id);
            }

            if (file instanceof File) {
                formData.append(`${key}[file]`, file);
            } else if (typeof file === 'string' && file.startsWith('data:')) {
                const blob = this.base64ToBlob(file);
                formData.append(`${key}[file]`, blob, 'file.jpg');
            }
        } else {
            // Handle regular form fields (text, numbers, etc.)
            formData.append(key, typeof value === 'boolean' ? JSON.stringify(value) : (value ?? ''));
        }
    });

    return formData;
  }

  // Helper function to convert Base64 to Blob
  private base64ToBlob(base64: string): Blob {
      const base64Data = base64.split(',')[1]; // Remove the header part (data:image/jpeg;base64,...)
      const byteArray = new Uint8Array(atob(base64Data).split('').map(c => c.charCodeAt(0)));
      const mimeType = base64.match(/^data:(.*?);base64,/)?.[1] || 'application/octet-stream';
      return new Blob([byteArray], { type: mimeType });
  }

  numEnToBn(enNum:Number){
    if (enNum === null || enNum === undefined) {
      return '';
    }

    const englishToBengaliMap: { [key: string]: string } = {
      '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
      '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
    };

    return enNum.toString().split('').map(char => englishToBengaliMap[char] || char).join('');
  }

  durationEnToBn(string:string) {
    if (!string) {
      return '';
    }

    const englishToBengaliMap: { [key: string]: string } = {
      'hourly': 'ঘণ্টা প্রতি',
      'daily': 'দৈনিক',
      'weekly': 'সাপ্তাহিক',
      'monthly': 'মাসিক',
      'yearly': 'বাৎসরিক',
      'contractual': 'চুক্তিভিত্তিক'
    };

    return englishToBengaliMap[string] || string;
  }
   
}
