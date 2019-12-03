import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {faAngleDown, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {slider} from '../../route.animation';
import {ProjectService} from '../../services/project.service';
import {Project} from '../../models/project.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

export interface Quote { text: string; }

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectComponent implements OnInit {

  // Get the project information
  private projectName: string;
  private currentProject: Project;
  private projectLoaded = false;

  private contentSource: SafeResourceUrl;

  // Amount of columns to display depending on view width
  columnCount: number;
  faBackArrow = faArrowLeft;

  // Whether the project actually exists
  private projectExists = true;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    // Ensure the correct column count is displayed on initial load
    this.columnCount = (window.innerWidth <= 600) ? 1 : 2;

    // Get the current reoute
    this.route.paramMap.subscribe(params => {
        this.projectName = params.get('projectName');
        this.projectService.getProject(this.projectName).subscribe(project => {
          if (project) {

            try {
              console.log(project);
              this.currentProject = project as Project;
              if (this.currentProject.showcase.isVideo) {
                this.contentSource = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentProject.showcase.link);
              }
              this.projectExists = true;
              this.projectLoaded = true;
            } catch (e) {
              console.log(e);
              this.projectExists = false;
              this.projectLoaded = true;
            }
          } else {
            this.projectExists = false;
            this.projectLoaded = true;
          }
        });
    });


  }

  cleaniFrameUrl(url: string) {

  }

  /**
   * Ensure the correct column count is adjusted for page resize event
   * @param event ev
   */
  onResize(event) {
    this.columnCount = (window.innerWidth <= 600) ? 1 : 2;
  }

}
