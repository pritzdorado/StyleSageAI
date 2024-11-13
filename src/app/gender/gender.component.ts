import { Component, OnInit } from '@angular/core';
import { Wardrobe } from '../model/wardrobe';
import { WardrobeCategory } from '../model/wardrobe-category';
import { WardrobeService } from '../service/wardrobe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit {

  public wardrobesCategory: WardrobeCategory[]  = [];
 
  constructor(private wardrobeService: WardrobeService, private router: Router) {
     
  }

  ngOnInit(): void {
    console.log("ngOnInit called");
  }

  // Fetch and filter data based on the selected gender
  selectGender(gender: string) {
    console.log(`Gender selected: ${gender}`);  // Log selected gender

    this.wardrobeService.getData().subscribe(data => {
      console.log("Data retrieved from service:", data);  // Log data retrieved from the service
      
      this.wardrobesCategory = data;

      // Filter data based on the selected gender
      this.wardrobesCategory = data.filter((item: WardrobeCategory) => item.sex === gender);
      console.log("Filtered data:", this.wardrobesCategory);  // Log filtered data

      // Pass the filtered data to the Wardrobe component via the router
      this.router.navigate(['wardrobe'], { state: { data: this.wardrobesCategory } });
      console.log("Navigating to Wardrobe component with data");  // Routes the user to Wardrobe page
    });
  }

}
