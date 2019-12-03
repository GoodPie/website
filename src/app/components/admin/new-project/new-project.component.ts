import { Component, OnInit } from '@angular/core';
import {Project, ProjectShowcase} from '../../../models/project.model';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  // Create an empty project for 2 way binding. We can utilize this later for editing posts
  newProject = new Project('', '', '', new ProjectShowcase(false, ''), '');

  // Whether project has been submitted or not
  submitted = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
  }

  onSubmit( ) {
    this.submitted = true;

    // Have to repackage the data for Firebase
    // TODO: Move to the actual class
    const data = {
      title: this.newProject.title,
      slug: this.newProject.slug,
      description: this.newProject.description,
      showcase: {
        isVideo: this.newProject.showcase.isVideo,
        link: this.newProject.showcase.link,
        height: this.newProject.showcase.height,
        width: this.newProject.showcase.width
      },
      url: this.newProject.url
    };

    // TODO: Authentication (low priority because only I will be adding data)

    // Use the service to publish the new project
    this.projectService.addNewProject(data);
  }

}
