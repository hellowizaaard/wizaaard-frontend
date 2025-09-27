import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  constructor() {}

  formWarningToast(message: string = 'আবশ্যক তথ্য সবগুলো পূরণ করতে হবে!') {
    this.Toast.fire({
      icon: 'error',
      text: message,
      customClass: {
        popup: 'toast-danger',
      },
    });
  }

  serverWarningToast(message: string = 'সার্ভার ত্রুটি !!!') {
    this.Toast.fire({
      icon: 'error',
      text: message,
      customClass: {
        popup: 'toast-danger',
      },
    });
  }

  validationErrorAlert(errors:any){
    const errorMessages = Object.entries(errors)
      .map(([key, value]) => (value as string[]).join(', '))
      .join('<br>'); // Join the messages with <br> to add line breaks

    Swal.fire({
      title: 'সকল তথ্য সঠিক নয়!!',
      html: errorMessages, // Use `html` instead of `text` to interpret the <br> tags
      icon: 'error',
      confirmButtonText: 'বন্ধ করুন',
      customClass: {
        popup: 'toast-danger',
      },
    });
  }

  successToast(message: string) {
    this.Toast.fire({
      icon: 'success',
      text: message,
      customClass: {
        popup: 'toast-success',
      },
    });
  }

  warningToast(message: string) {
    this.Toast.fire({
      icon: 'warning',
      text: message,
      customClass: {
        popup: 'toast-warning',
      },
    });
  }

  infoToast(message: string) {
    this.Toast.fire({
      icon: 'info',
      text: message,
      customClass: {
        popup: 'toast-info',
      },
    });
  }

  dangerToast(message: string) {
    this.Toast.fire({
      icon: 'error',
      text: message,
      customClass: {
        popup: 'toast-danger',
      },
    });
  }

  deleteWarningToast(message: string = '', callback: () => void) {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: message !== '' ? message : "মুছে ফেলার পরে এই তথ্য আর পাওয়া যাবে না!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "বাতিল করুন",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "মুছে গেছে!",
          text: "তথ্য পুরোপুরি মুছে ফেলা হয়েছে!!",
          icon: "success"
        });
        callback();
      }
    });
  }
}
