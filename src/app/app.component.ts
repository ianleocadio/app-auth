import { Component } from '@angular/core';
import { AuthService, IAuth, Auth } from './auth.service';
import { IAuthResponse, IAuthErrorResponse } from './AuthReponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Auth App';

  private authBody: IAuth = new Auth();

  private authResponse: IAuthResponse = {"token": null};
  private authErrorResponse: IAuthErrorResponse = {msg: undefined, status: undefined};


  constructor(private _authService: AuthService) {};

  authenticate() {
    this._authService.auth(this.authBody)
        .subscribe( data => this.handleSuccess(data),
                   this.handleError);
  }


  handleSuccess(data) {
    this.authResponse = JSON.parse(data);

    //localStorage.setItem('token', JSON.stringify(data));
    // localStorage.setItem('ngStorage-nome', this.authBody.username);
    // localStorage.setItem('ngStorage-pass', this.authBody.password);
    // localStorage.setItem('ngStorage-token', "");
    
    this._authService.redirectToHome(this.authBody.username, this.authResponse.token);
    //redirect to Home
  }

  handleError(data) {
    this.authErrorResponse = JSON.parse(data.error);
    console.log(this.authErrorResponse);
  }



}
