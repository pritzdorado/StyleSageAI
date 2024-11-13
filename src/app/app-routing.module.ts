import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { GenderComponent } from './gender/gender.component';
import { WardrobeComponent } from './wardrobe/wardrobe.component';
import { SavedOutfitComponent } from './saved-outfit/saved-outfit.component';
import { FashionAiComponent } from './fashion-ai/fashion-ai.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'gender', component:GenderComponent},
  {path:'wardrobe', component:WardrobeComponent},
  {path:'outfit', component:SavedOutfitComponent},
  {path:'AI', component:FashionAiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
