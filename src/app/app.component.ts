import {Component, ViewEncapsulation} from '@angular/core';
import { faGithub, faSnapchatGhost } from '@fortawesome/free-brands-svg-icons';
import {RouterOutlet} from '@angular/router';
import {slider} from './route.animation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slider
  ]
})
export class AppComponent {


  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
