import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'; // delete
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user) {
     const headers = new HttpHeaders();
     headers.append('Content-Type', 'application/json');
     return this.http.post('http://localhost:3000/users/register', user, {headers: headers});
  }

  authenticateUser(user) {
    const headers = new HttpHeaders();
     headers.append('Content-Type', 'application/json');
     return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers});
  }

  getProfile() {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
     return this.http.get('http://localhost:3000/users/profile', {headers: headers});
  }

  loadToken() {
    return this.authToken = localStorage.getItem('id_token');
  }

  loggedIn() {
    const tokenIsOk = tokenNotExpired('id_token');
    return tokenIsOk;
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
