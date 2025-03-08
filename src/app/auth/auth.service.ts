import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string) {
    return this.http.post<{ token: string }>(
      'http://127.0.0.1:8000/api/register', 
      {
        name,
        email,
        password,
        password_confirmation: password // Fontos, hogy küldd el a password_confirmation-t is!
      }
    );
  }
  
  

  logout(): void {
    localStorage.removeItem('token'); // Törli a token-t a localStorage-ból
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Ellenőrzi, hogy van-e token a localStorage-ban
  }
}