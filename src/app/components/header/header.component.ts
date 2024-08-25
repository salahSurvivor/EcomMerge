import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username;

  constructor(private jwt: JwtHelperService){}

  ngOnInit(){
    const token = this.jwt.decodeToken(localStorage.getItem('token'));
    this.username = token.name;
  }
}
