import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  accessDenied = false;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.user$.subscribe(value => {
      if (value !== null) {
        if (value.roles === undefined || !value.roles.admin) {
          this.accessDenied = true;
        } else {
          this.router.navigate(['/dashboard']);
        }
      }
    });
  }

}
