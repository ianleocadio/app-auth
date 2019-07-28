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

  private _url: string = "http://localhost:8080/api/rest/security/auth";
  private _url2: string = "http://localhost:8080/#/";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'text' as 'json'
  };

  constructor(private http: HttpClient) { }

  auth(body: IAuth, errorCallback = this.errorHandler): Observable<string>{
    
    return this.http.post<string>(this._url, body, this.httpOptions)
                    .pipe(catchError(errorCallback));
  }

  redirectToHome(username:string, token:string){
    window.location.href = this._url2 + "?username=" + username + "&token=" + token;
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }
  
}
