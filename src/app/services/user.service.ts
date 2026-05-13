import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersSubject = new BehaviorSubject<User[]>([
    {
      name: 'Deepti',
      email: 'deepti@gmail.com',
      role: 'Admin'
    }
  ]);

  users$ = this.usersSubject.asObservable();

  addUser(user: User) {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, user]);
  }
}