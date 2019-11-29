import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {faAngleDown, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {slider} from '../../route.animation';

export interface Quote { text: string; }

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectComponent implements OnInit {

  // Get the project information
  private currentProject: string;

  // Amount of columns to display depending on view width
  columnCount: number;
  faBackArrow = faArrowLeft;

  constructor(db: AngularFirestore, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // Ensure the correct column count is displayed on initial load
    this.columnCount = (window.innerWidth <= 600) ? 1 : 2;

    // Get the current reoute
    this.route.paramMap.subscribe(params => {
        this.currentProject = params.get('projectName');
        console.log(this.currentProject);
    });


  }

  /**
   * Ensure the correct column count is adjusted for page resize event
   * @param event ev
   */
  onResize(event) {
    this.columnCount = (window.innerWidth <= 600) ? 1 : 2;
  }

}
