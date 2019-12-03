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
  projectName: string;
  currentProject: Project;
  projectLoaded = false;
  projectExists = true;

  // Sanitized URL for YouTube embedded videos
  contentSource: SafeResourceUrl;

  // Amount of columns to display depending on view width
  columnCount: number;
  faBackArrow = faArrowLeft;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    // Ensure the correct column count is displayed on initial load
    this.columnCount = (window.innerWidth <= 600) ? 1 : 2;

    // Fetch project name from URL and then attempt to get project data from Firebase
    this.route.paramMap.subscribe(params => {

        this.projectName = params.get('projectName');
        this.fetchProject();
    });


  }

  /**
   * Fetch project data from Firebase if it exists
   */
  private fetchProject() {
    this.projectService.getProject(this.projectName).subscribe(project => {
      if (project) {
        this.projectLoaded = true;
        try {
          // Attempt to cast project to Project class
          this.currentProject = project as Project;

          // Sanitize the URL for the embedded videos
          if (this.currentProject.showcase.isVideo) {
            this.contentSource = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentProject.showcase.link);
          }
          // Project exists and has been loaded successfully
          this.projectExists = true;
        } catch (e) {
          // Project does not exist
          this.projectExists = false;
        }
      } else {
        // Project does not exist
        this.projectExists = false;
      }
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
