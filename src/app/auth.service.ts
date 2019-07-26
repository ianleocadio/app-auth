import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IAuthResponse } from './AuthReponse';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';




export interface IAuth {
  username: string,
  password: string
}

export class Auth implements IAuth {
  public username;
  public password;

  constructor() {
    this.username = "763266";
    this.password = "763266";
  };
}


@Injectable()
export class AuthService {

  private _url: string = "http://localhost:8080/auth/login";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'

    })
  };

  constructor(private http: HttpClient) { }

  auth(body: IAuth, errorCallback = this.errorHandler): Observable<IAuthResponse>{
    
    let res = this.http.post<IAuthResponse>(this._url, body, this.httpOptions)
    .pipe(catchError(errorCallback));

    return res;
  }

  redirectToHome(){
    window.location.href = 'http://localhost:8080/#/home';
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }
  
}
