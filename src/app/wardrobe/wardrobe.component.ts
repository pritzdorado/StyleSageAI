import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WardrobeCategory } from '../model/wardrobe-category';
import { AuthService } from '../service/auth.service';
import { WardrobeService } from '../service/wardrobe.service';
import { OutfitService } from '../service/outfit.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.css']
})
export class WardrobeComponent implements OnInit {

  public wardrobesCategory: WardrobeCategory[] = [];
  public filteredWardrobes: WardrobeCategory[] = [];
  public selectedCategory: string = 'Casual'; // default value
  public outfitName: string = ''; // holds the outfit name from input

  //grouping them by subcategories
  public filteredAccessories: any[] = [];
  public filteredUpperGarments: any[] = [];
  public filteredOuterwears: any[] = [];
  public filteredAccessories2: any[] = [];
  public filteredLowerGarments: any[] = [];
  public filteredFootwears: any[] = [];

  public currentIndexes: number[] = [0, 0, 0, 0, 0, 0];

  constructor(private router: Router, private authService: AuthService, private wardrobeService: WardrobeService, private outfitService: OutfitService, private snackBar: MatSnackBar) { 
    // Retrieve the filtered data passed through the router state from Gender page
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.wardrobesCategory = navigation.extras.state['data'];
      this.filteredWardrobes = [...this.wardrobesCategory]; // Initialize with full data
    }
  }

  ngOnInit(): void {
    console.log("Wardrobe data:", this.wardrobesCategory);
    this.filterByCategory();
  }

  // Filter wardrobes based on selected category (Casual or Formal)
  filterByCategory(): void {
    this.filteredWardrobes = this.wardrobesCategory.filter(item => item.categoryName === this.selectedCategory);
    console.log("Filtered wardrobes by category:", this.filteredWardrobes);
    this.filterBySubcategory();
  }

  // Filter by subcategory
  filterBySubcategory(): void {
    // Initialize the arrays, resets the array
    this.filteredAccessories = [];
    this.filteredUpperGarments = [];
    this.filteredOuterwears = [];
    this.filteredAccessories2 = [];
    this.filteredLowerGarments = [];
    this.filteredFootwears = [];
  
    // Loop through each category and its wardrobes to filter by subcategory
    this.filteredWardrobes.forEach(category => {
      category.wardrobes.forEach(item => {
        // Based on subcategory, push the item to the corresponding filtered array
        switch (item.subcategory) {
          case 'Accessories':
            this.filteredAccessories.push(item);
            break;
          case 'Top':
              this.filteredUpperGarments.push(item);
              break;
          case 'Outer Garment':
              this.filteredOuterwears.push(item);
              break;
          case 'Accessories2':
              this.filteredAccessories2.push(item);
              break;
          case 'Bottom':
              this.filteredLowerGarments.push(item);
              break;
          case 'Footwear':
              this.filteredFootwears.push(item);
              break;
          default:
            break;
        }
      });
    });
  
    console.log('Filtered Accessories:', this.filteredAccessories);
    console.log('Filtered Upper Garments:', this.filteredUpperGarments);
    console.log('Filtered Outerwears:', this.filteredOuterwears);
    console.log('Filtered Accessories 2:', this.filteredAccessories2);
    console.log('Filtered Lower Garments:', this.filteredLowerGarments);
    console.log('Filtered Footwears:', this.filteredFootwears);
  }

  // Logic for slider (next image)
  nextImage(itemIndex: number): void {
    this.currentIndexes[itemIndex] = (this.currentIndexes[itemIndex] + 1) % this.getFilteredImages(itemIndex).length;
    this.updateImageSrc(itemIndex);
  }

  // Logic for slider (previous image)
  previousImage(itemIndex: number): void {
    this.currentIndexes[itemIndex] = (this.currentIndexes[itemIndex] - 1 + this.getFilteredImages(itemIndex).length) % this.getFilteredImages(itemIndex).length;
    this.updateImageSrc(itemIndex);
  }
  
  // Update image src dynamically based on the current item index
  updateImageSrc(itemIndex: number): void {
    const imageFile = this.getFilteredImages(itemIndex)[this.currentIndexes[itemIndex]].imageFile;
    const imagePath = `../assets/wardrobe/${imageFile}.svg`;
    document.getElementById(`image${itemIndex}`)?.setAttribute('src', imagePath);
  }

  // Function to get filtered images based on the index
  getFilteredImages(itemIndex: number): any[] {
    switch (itemIndex) {
      case 0: return this.filteredAccessories;
      case 1: return this.filteredUpperGarments;
      case 2: return this.filteredOuterwears;
      case 3: return this.filteredAccessories2;
      case 4: return this.filteredLowerGarments;
      case 5: return this.filteredFootwears;
      default: return [];
    }
  }

  saveOutfit(): void {
    if (this.authService.isLoggedIn()) {
      const currentUserId = this.authService.getCurrentUser();
      
      const selectedOutfit = {
        id: 0,
        outfitName: this.outfitName, // retrieve from input field
        userId: currentUserId,
        topName: this.filteredUpperGarments[this.currentIndexes[1]].name,
        topImg: this.filteredUpperGarments[this.currentIndexes[1]].imageFile,
        bottomName: this.filteredLowerGarments[this.currentIndexes[4]].name,
        bottomImg: this.filteredLowerGarments[this.currentIndexes[4]].imageFile,
        shoesName: this.filteredFootwears[this.currentIndexes[5]].name,
        shoesImg: this.filteredFootwears[this.currentIndexes[5]].imageFile,
        outerName: this.filteredOuterwears[this.currentIndexes[2]].name,
        outerImg: this.filteredOuterwears[this.currentIndexes[2]].imageFile,
        accName: this.filteredAccessories[this.currentIndexes[0]].name,
        accImg: this.filteredAccessories[this.currentIndexes[0]].imageFile,
        exAccName: this.filteredAccessories2[this.currentIndexes[3]].name,
        exAccImg: this.filteredAccessories2[this.currentIndexes[3]].imageFile,
        dateCreated: new Date()
      };
      this.outfitService.addOutfit(selectedOutfit).subscribe(response => {
        console.log('Outfit saved:', response);
        //Notif for Outfit save
        this.snackBar.open(`Outfit saved successfully!`, '', {
          duration: 3000, // The notification will automatically close after 3 seconds
          verticalPosition: 'top', // Position of the snackbar
          horizontalPosition: 'center', // Position of the snackbar
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['outfit']);
      }, error => {
        console.error('Failed to save outfit:', error);
        alert('Failed to save outfit. Please try again.');
      });
    } else {
      this.router.navigate(['login']);
      alert('You need to login first');
    }
  }

  goToOutfits(): void {
    this.router.navigate(['outfit']);  // Navigate to the wardrobe route
  }

  goToGender(): void {
    this.router.navigate(['gender']);
  }

  logoutUser(): void {
    this.authService.logout();
    this.router.navigate(['login']); // Redirect to login
  }

  goToAI(): void {
    this.router.navigate(['AI']); // Redirect to login
  }
}
