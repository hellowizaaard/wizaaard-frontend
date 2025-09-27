import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { appInfo } from '../config/app-info.const';
import { ApiRequestService } from './api-request';
import { apiUrls } from '../config/api-urls.const';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = appInfo.baseUrl;
  private tokenKey = 'token';
  private user = 'user';

  constructor(
    private http: HttpClient,
    private apiService: ApiRequestService,
    private router: Router
  ) {}

  /**
   * Call login API with credentials.
   * @param email 
   * @param password 
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, { email, password }).pipe(
      tap((response: any) => {
        // store token when login succeeds
        if (response && response?.success) {
          this.setToken(response?.data?.access_token);
        }
      })
    );
  }

  /**
   * Logout: clear token from storage.
   */
  logout(): void {
    const token = localStorage.getItem(this.tokenKey); // your token key name
    if (!token) {
      // No token; just clear local storage
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.user);
      return;
    }

    // Make HTTP request to backend logout route
    this.http.post(
      apiUrls.logout, 
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: () => {
        // Success - clear local storage
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.user);
        // optionally navigate to login page
        window.location.reload();
      },
      error: (err) => {
        // Even if server fails, clear storage locally
        console.error('Logout error', err);
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.user);
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Save token to localStorage.
   */
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Get token from localStorage.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Save user to localStorage.
   */
  setUser(user: any): void {
    localStorage.setItem(this.user, JSON.stringify(user));
  }

  /**
   * Get user from localStorage.
   */
  getUser(): any | null {
    const userString = localStorage.getItem(this.user);
    if (userString) {
      try {
        return JSON.parse(userString); // convert back to object
      } catch (err) {
        console.error('Error parsing user from localStorage', err);
        return null;
      }
    }
    return null;
  }

  /**
   * Optionally, clear user
   */
  clearUser(): void {
    localStorage.removeItem(this.user);
  }

  /**
   * Check if user is authenticated.
   */
  authCheck(): boolean {
    return !!this.getToken();
  }

  /**
   * Example of calling a protected endpoint with Authorization header.
   */
  getProfile(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}profile`, { headers });
  }
}
