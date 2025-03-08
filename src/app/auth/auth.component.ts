import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  isLogin: boolean = true; // Állapotváltozó: igaz = bejelentkezés, hamis = regisztráció
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(response => {
      if (response.token) {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/profile']); // Sikeres bejelentkezés
      } else {
        this.errorMessage = 'Bejelentkezés sikertelen';
      }
    });
  }

  register() {
    // Ellenőrizzük, hogy az email érvényes formátumú
    if (!this.isValidEmail(this.email)) {
      this.errorMessage = "Kérem, adjon meg egy érvényes e-mail címet.";
      return;
    }
  
    // Továbbmegyünk, ha az email érvényes
    this.authService.register(this.name, this.email, this.password).subscribe(
      response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/profile']);
        } else {
          this.errorMessage = 'Regisztráció sikertelen';
        }
      },
      error => {
        // Ha valami hiba történt a backend-en
        this.errorMessage = error.error.message || 'Hiba történt a regisztráció során';
      }
    );
  }
  
  // Email validáció
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  
  
  

  toggleForm() {
    this.isLogin = !this.isLogin; // Átváltás bejelentkezés és regisztráció között
  }
}
