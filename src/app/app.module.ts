import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WardrobeComponent } from './wardrobe/wardrobe.component';
import { SavedOutfitComponent } from './saved-outfit/saved-outfit.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GenderComponent } from './gender/gender.component';
import { FashionAiComponent } from './fashion-ai/fashion-ai.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WardrobeComponent,
    SavedOutfitComponent,
    MainBodyComponent,
    SignupComponent,
    GenderComponent,
    FashionAiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
