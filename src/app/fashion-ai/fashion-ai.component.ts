import { Component, ChangeDetectorRef } from '@angular/core';
import { NlpService } from '../service/nlp.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-fashion-ai',
  templateUrl: './fashion-ai.component.html',
  styleUrls: ['./fashion-ai.component.css']
})
export class FashionAiComponent {
  prompt = '';
  response = '';

  constructor(private nlp: NlpService, private cdr: ChangeDetectorRef, private router: Router, private snackBar: MatSnackBar, private authService: AuthService) {}



  async sendPrompt() {
    try {
      const apiResponse = await this.nlp.sendPrompt(this.prompt);
  
      // Access the generated text from the nested structure
      const generatedText = apiResponse.candidates[0].content.parts[0].text;
      console.log('Generated Text:', generatedText); // Log to confirm
  
      this.response = generatedText; // Set the response to display in the component
      this.cdr.detectChanges(); // Detect changes if necessary
    } catch (error) {
      console.error('Error sending prompt:', error);
      this.response = 'An error occurred while processing your request.';
    }
  }  

  goToWardrobe(): void {
    this.snackBar.open(`Pick a gender to create outfits!`, '', {
      duration: 3000, // The notification will automatically close after 3 seconds
      verticalPosition: 'top', // Position of the snackbar
      horizontalPosition: 'center', // Position of the snackbar
      panelClass: ['success-snackbar']
    });
    this.router.navigate(['gender']);  // Navigate to the wardrobe route
  }

  logoutUser(): void {
    this.authService.logout();
    this.router.navigate(['login']); // Redirect to login
  }

  goToOutfits(): void {
    this.router.navigate(['outfit']);  // Navigate to the wardrobe route
  }
}
