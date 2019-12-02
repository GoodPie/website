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

  getAllProjects(): Observable<Project[]> {
    return this.projectCollection.valueChanges();
  }

  addNewProject(project: Project) {
    this.projectCollection.doc(project.slug).set(project);
  }
}
