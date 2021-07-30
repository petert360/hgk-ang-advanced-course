import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  entity = 'users';

  constructor(
    private config: ConfigService,
    private http: HttpClient,
  ) { }


  get(id?: string | number): Observable<User | User[]> {
    let url = `${this.config.apiUrl}${this.entity}`;
    if (id) {
      url += `/${id}`;
    }

    return this.http.get<User[]>(url);
  }

  query(queryString: string): Observable<User | User[]> {
    const url = `${this.config.apiUrl}${this.entity}?${queryString}`;
    return this.http.get<User[]>(url);
  }

  update(user: User): Observable<User> {
    const url = `${this.config.apiUrl}${this.entity}/${user.id}`;
    return this.http.put<User>(url, user);
  }

  create(user: User): Observable<User> {
  //összerakjuk az url-t és post-tal elküldjük
    const url = `${this.config.apiUrl}${this.entity}`;
    return this.http.post<User>(url, user);
  }


  delete(user: User): Observable<User> {
    const url = `${this.config.apiUrl}${this.entity}/${user.id}`;
    return this.http.delete<User>(url);
  }

}