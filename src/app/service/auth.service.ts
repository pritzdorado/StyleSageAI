import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSource = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedInSource.asObservable();

  login(token: string) {
    localStorage.setItem('userToken', token); //store token
    this.loggedInSource.next(true); //notify that user is logged in
  }

  logout() {
    localStorage.removeItem('userToken'); // Remove token
    this.loggedInSource.next(false); // Notify that user is logged out
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken'); // Check token presence
  }

  //get the current user id
  getCurrentUser(): number {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.id || 0;
  }
}
