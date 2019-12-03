import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  accessDenied = false; // User has attempted to login but doesn't have permission to access the dashboard

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.user$.subscribe(value => {
      if (value !== null) {
        // Just another check on top of the auth guard to prevent users from accessing the admin dashboard
        if (value.roles === undefined || !value.roles.admin) {
          this.accessDenied = true;
        } else {
          // Navigate user to dashboard if admin
          this.router.navigate(['/dashboard']);
        }
      }
    });
  }

}
