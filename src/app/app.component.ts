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

  private authResponse: IAuthResponse;
  private authError;


  constructor(private _authService: AuthService) {};

  authenticate() {
    this._authService.auth(this.authBody)
        .subscribe( data => this.handleSuccess(data),
                   this.handleError);
  }


  handleSuccess(data) {
    this.authResponse = data;

    localStorage.setItem('_m', JSON.stringify(data));
    // localStorage.setItem('ngStorage-nome', this.authBody.username);
    // localStorage.setItem('ngStorage-pass', this.authBody.password);
    // localStorage.setItem('ngStorage-token', "");
    
    this._authService.redirectToHome();
    //redirect to Home
  }

  handleError(data) {
    alert('Error');
  }



}
