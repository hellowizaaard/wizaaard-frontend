import { Component } from '@angular/core';
import { routeUrls } from '../../../config/route-urls.const';
import { appInfo } from '../../../config/app-info.const';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ApiRequestService } from '../../../services/api-request';
import { apiUrls } from '../../../config/api-urls.const';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  routeUrls:any = routeUrls;
  appName:any = appInfo.appName;
  loginForm!: FormGroup;
  errors: any[] = [];
  validationFailed:any = false;
  passwordVisible: boolean = false;

  constructor(
    public auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private titleService: Title,
    private apiService: ApiRequestService,
  ) {
    if(this.auth.authCheck()){
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.setTitle();
    this.createForm();
  }

  setTitle() :void{
    let title = this.route.snapshot.data['title'];
    this.titleService.setTitle(title);
  }

  createForm(): void{
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  viewPassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  removeWarning(): void {
    this.validationFailed = false;
  }

  submit() {
    for (const key of Object.keys(this.loginForm.controls)) {
      this.loginForm.controls[key].markAsDirty();
      this.loginForm.controls[key].markAsTouched();
      this.loginForm.controls[key].updateValueAndValidity();
    }
    if(this.loginForm.valid){
      const email = this.loginForm.controls['email'].value;
      const password = this.loginForm.controls['password'].value;
      this.auth.login(email, password).subscribe({
        next: (response:any) => {
          if(response.success){
            const formData = new FormData();
            this.apiService.post(apiUrls.user, formData).subscribe({
              next: (res:any) => {
                this.auth.setUser(res?.data);
                window.location.reload();
              },
              error: (err:any) => {
                console.log(err)
              }
            })
          }
          // this.router.navigate([routeUrls.home]);
          // window.location.reload();
        },
        error: (error:any) => {
          if(error.errorCode == 401){
            this.validationFailed = true;
          }
        }
      });
    }
  }

  onClickRegister():void {
    this.router.navigate([routeUrls.register]);
  }
}
