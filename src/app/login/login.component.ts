import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginFailed: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onLogin() {
    this.userService.authenticateUser(this.username, this.password).subscribe(
      (user) => {
        if (user) {
          this.authService.login('userToken');  
          localStorage.setItem('currentUser', JSON.stringify(user));  // Store customer in localStorage
          this.snackBar.open(`Login successful! Welcome, ${user.username}`, '', {
            duration: 3000, // The notification will automatically close after 3 seconds
            verticalPosition: 'top', // Position of the snackbar
            horizontalPosition: 'center', // Position of the snackbar
            panelClass: ['login-snackbar']
          });
          this.router.navigate(['gender']);  // Redirect to home
        } else {
          this.loginFailed = true;
        }
      },
      (error) => {
        console.error('Login failed', error);
        this.loginFailed = true;
      }
    );
  }
  toSignup() {
    this.router.navigate(['signup']); 
  }
}
