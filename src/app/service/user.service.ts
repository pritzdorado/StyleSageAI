import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService {

  private users = new BehaviorSubject<User[]>([]);

  constructor(protected override http: HttpClient) {
    super(http, '/api/user')
  }

  //Method to load users into the BehaviorSubject
  loadUsers(users: User[]) {
    this.users.next(users);
  }

  //Observable to get the current list of users
  getUsers(): Observable<User[]> {
    return this.users.asObservable();
  }

  //Method to add a new user
  public addUser(user: User): Observable<any> {
    return this.http.put(`${this.apiServerUrl}/api/user`, user)
  }

  //Method to update an existing user
  public updateUser(user: User): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/api/user/${user.id}`, user);
  }

  //Method to delete a user
  public deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/api/user/${userId}`);
  }

  
  //for login
  authenticateUser(username: string, password: string): Observable<User | null> {
    const loginData = { username, password };
    return this.http.post<User>(`${this.apiServerUrl}/api/user/authenticate`, loginData);
  }
}
