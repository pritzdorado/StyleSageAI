import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Outfit } from '../model/outfit';

@Injectable({
  providedIn: 'root'
})
export class OutfitService extends BaseHttpService {

  private outfits = new BehaviorSubject<Outfit[]>([]);

  constructor(protected override http: HttpClient) {
    super(http, '/api/outfits');
  }

  //Method to load outfits into the BehaviorSubject
  loadOutfits(outfits: Outfit[]) {
    this.outfits.next(outfits);
  }

  //Observable to get the current list of outfits
  getOutfits(): Observable<Outfit[]> {
    return this.outfits.asObservable();
  }

  //Method to add a new outfit
  public addOutfit(outfit: Outfit): Observable<Outfit> {
    return this.http.put<Outfit>(`${this.apiServerUrl}/api/outfits`, outfit);
  }

  //Method to update an existing outfit
  public updateOutfit(outfit: Outfit): Observable<Outfit> {
    return this.http.post<Outfit>(`${this.apiServerUrl}/api/outfits/${outfit.id}`, outfit);
  }

  //Method to delete an outfit
  public deleteOutfit(outfitId: number): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/api/outfits/${outfitId}`);
  }

  //Method to fetch all outfits for a user
  public getOutfitsForUser(userId: number): Observable<Outfit[]> {
    return this.http.get<Outfit[]>(`${this.apiServerUrl}/api/outfits/${userId}`);
  }
}
