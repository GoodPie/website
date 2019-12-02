import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatFormFieldModule,
  MatGridListModule, MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProjectComponent } from './components/project/project.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AuthGuard} from './auth.guard';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { QuotesComponent } from './components/admin/quotes/quotes.component';
import { ProjectsComponent } from './components/admin/projects/projects.component';
import { NewProjectComponent } from './components/admin/new-project/new-project.component';
import {FormsModule} from '@angular/forms';


const appRoutes: Routes = [
  { path: '',
    component: HomeComponent,
    data: {animation: 'isRight'}
  },
  {
    path: 'project/:projectName',
    component: ProjectComponent,
    data: {animation: 'isLeft'}
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'quotes',
        component: QuotesComponent,
        outlet: 'dashboard'
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        outlet: 'dashboard'
      },
      {
        path: 'new-project',
        component: NewProjectComponent,
        outlet: 'dashboard'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PageNotFoundComponent,
    ProjectComponent,
    LoginComponent,
    DashboardComponent,
    QuotesComponent,
    ProjectsComponent,
    NewProjectComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatTooltipModule,
    NgxPageScrollModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
