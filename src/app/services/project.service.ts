import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Project} from '../models/project.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectCollection: AngularFirestoreCollection<Project>;

  constructor(private db: AngularFirestore) {
    this.projectCollection = this.db.collection<Project>('projects');
  }

  /**
   * Returns all projects
   */
  getAllProjects(): Observable<Project[]> {
    return this.projectCollection.valueChanges();
  }

  /**
   * Returns a specific project via its slug
   * @param name project slug
   */
  getProject(name: string) {
    return this.projectCollection.doc(name).valueChanges();
  }

  /**
   * Adds a new project to the database
   * @param project Project project to add to the database
   */
  addNewProject(project: Project) {
    this.projectCollection.doc(project.slug).set(project);
  }
}
