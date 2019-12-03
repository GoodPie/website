import { Component, OnInit } from '@angular/core';
import {Project, ProjectShowcase} from '../../../models/project.model';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  newProject = new Project('', '', '', new ProjectShowcase(false, ''), '');
  submitted = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
  }

  onSubmit( ) {
    this.submitted = true;

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

    this.projectService.addNewProject(data);
  }

}
