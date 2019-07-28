import { Component } from '@angular/core';
import { AuthService, IAuth, Auth } from './auth.service';
import { IAuthResponse } from './AuthReponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Auth App';

  private authBody: IAuth = new Auth();

  private authResponse: IAuthResponse = {"token": null};
  private authError;


  constructor(private _authService: AuthService) {};

  authenticate() {
    this._authService.auth(this.authBody)
        .subscribe( data => this.handleSuccess(data),
                   this.handleError);
  }


  handleSuccess(data) {
    this.authResponse = JSON.parse(data);

    console.log(this.authResponse.token);

    //localStorage.setItem('token', JSON.stringify(data));
    // localStorage.setItem('ngStorage-nome', this.authBody.username);
    // localStorage.setItem('ngStorage-pass', this.authBody.password);
    // localStorage.setItem('ngStorage-token', "");
    
    this._authService.redirectToHome(this.authBody.username, this.authResponse.token);
    //redirect to Home
  }

  handleError(data) {
    console.log(data);
  }



}
