import { Component, OnInit } from '@angular/core';
import {faFacebook, faGithub, faLinkedin, faSnapchatGhost} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faGithub = faGithub;
  faSnapchat = faSnapchatGhost;
  faFacebook = faFacebook;
  faLinkedin = faLinkedin;

  constructor() { }

  ngOnInit() {
  }

}
