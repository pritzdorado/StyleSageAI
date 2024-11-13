import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Wardrobe } from '../model/wardrobe';

@Injectable({
  providedIn: 'root'
})
export class WardrobeService extends BaseHttpService{

  private wardrobe = new BehaviorSubject<Wardrobe[]>([]);

  constructor(protected override http: HttpClient) { 
    super(http, '/api/wardrobe')
  }

  loadWardrobe(wardrobe: Wardrobe[]) {
    this.wardrobe.next(wardrobe);
  }

  getWardrobe(): Observable<Wardrobe[]> {
    return this.http.get<Wardrobe[]>(`${this.apiServerUrl}/api/wardrobe`);
  }

  /*
  getWardrobe(): Observable<Wardrobe[]> {
    return this.wardrobe.asObservable();
  }
  */

  public addWardrobe(formData: FormData): Observable<any> {
    return this.http.put(`${this.apiServerUrl}/api/wardrobe`, formData)
  }
}
