import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.signinForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signinForm.valid) {
      const user: User = this.signinForm.value;

      // Logging the user data to see if it's correctly gathered
      console.log('Form Data:', user);

      this.userService.addUser(user).subscribe({
        next: (response) => {
          console.log('User added successfully', response);
          this.signinForm.reset(); // Reset the form after successful submission
          this.snackBar.open(`Account has been successfully created!`, '', {
            duration: 3000, // The notification will automatically close after 3 seconds
            verticalPosition: 'top', // Position of the snackbar
            horizontalPosition: 'center', // Position of the snackbar
            panelClass: ['signup-snackbar']
          });
          this.router.navigate(['login']);
        },
        error: (error) => {
          console.error('There was an error adding the user!', error);
        }
      });
    } else {
      console.log('Form is invalid');
      this.signinForm.markAllAsTouched(); // Show validation messages for all fields
    }
  }

  toLogin() {
    this.router.navigate(['login']); 
  }
}
