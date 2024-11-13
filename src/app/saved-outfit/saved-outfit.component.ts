import { Component, OnInit } from '@angular/core';
import { Outfit } from '../model/outfit';
import { OutfitService } from '../service/outfit.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-saved-outfit',
  templateUrl: './saved-outfit.component.html',
  styleUrls: ['./saved-outfit.component.css']
})
export class SavedOutfitComponent implements OnInit {

  public outfits: Outfit[] = [];

  constructor(private outfitService: OutfitService, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { 
  }

  public currentIndex: number = 0;

  ngOnInit(): void { 
    console.log("ngOnInit called");
    const userId = this.authService.getCurrentUser();
    console.log("Outfit of User:", userId);
    this.outfitService.getOutfitsForUser(userId).subscribe(data => {
        this.outfits = data;
        console.log("Order items loaded:", this.outfits);
    });
  }

  // Method to go to the previous outfit
  previousOutfit(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.outfits.length - 1; // Loop to the last outfit
    }
  }

  // Method to go to the next outfit
  nextOutfit(): void {
    if (this.currentIndex < this.outfits.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop to the first outfit
    }
  }

  // Method to get the current outfit's image for each item
  getCurrentOutfitImage(itemType: string): string {
    const basePath = '../assets/wardrobe/';
    
    // Retrieve the current outfit based on `currentIndex`
    const currentOutfit = this.outfits[this.currentIndex];
    
    // Return the correct image path based on item type
    switch (itemType) {
      case 'top': return basePath + (currentOutfit?.topImg || 'no_image') + '.svg';
      case 'bottom': return basePath + (currentOutfit?.bottomImg || 'no_image.png') + '.svg';
      case 'shoes': return basePath + (currentOutfit?.shoesImg || 'no_image.png') + '.svg';
      case 'outer': return basePath + (currentOutfit?.outerImg || 'no_image.png') + '.svg';
      case 'acc': return basePath + (currentOutfit?.accImg || 'no_image.png') + '.svg';
      case 'exAcc': return basePath + (currentOutfit?.exAccImg || 'no_image.png') + '.svg';
      default: return basePath + 'no_image.png';
    }
  }

  // Method to delete the current outfit
  deleteOutfit(): void {
    const currentOutfit = this.outfits[this.currentIndex];

    if (currentOutfit && currentOutfit.id) {
      this.outfitService.deleteOutfit(currentOutfit.id).subscribe(
        (response) => {
          // Remove the deleted outfit from the list
          this.outfits.splice(this.currentIndex, 1);
          
          // If the deleted outfit was the last one, go to the previous one
          if (this.currentIndex >= this.outfits.length) {
            this.currentIndex = this.outfits.length - 1;
          }

          // Show success message
          this.snackBar.open(`Outfit deleted successfully!`, '', {
            duration: 3000, // The notification will automatically close after 3 seconds
            verticalPosition: 'top', // Position of the snackbar
            horizontalPosition: 'center', // Position of the snackbar
            panelClass: ['success-snackbar']
          });
        },
        (error) => {
          console.error('Error deleting outfit:', error);
          // Show error message
          this.snackBar.open('Failed to delete outfit. Please try again later.', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      console.error('No outfit selected or outfit ID is missing');
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

  goToAI(): void {
    this.router.navigate(['AI']); // Redirect to login
  }
}

