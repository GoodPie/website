import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {User} from '../models/user.model';
import {auth} from 'firebase';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {

    // Get the auth state and fetch the firestore user document
    this.user$ = this.firebaseAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // User is logged in
          return this.firestore.doc<User>('users/' + user.uid).valueChanges();
        } else {
          // User is not logged in
          return of(null);
        }
      })
    );
  }

  /**
   * Signs user in via Google
   */
  googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    return this.firebaseAuth.auth.signInWithPopup(provider)
      .then(credentials => this.updateUserData(credentials.user));
  }

  /**
   * Updates the users data to that found within the authentication provider
   * @param authData Authentication data
   */
  private updateUserData(authData) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc('users/' + authData.uid);

    // Default user data
    const newUserData = {
      uid: authData.uid,
      email: authData.email,
      displayName: authData.displayName,
      profilePicture: authData.photoURL,
    };

    userRef.valueChanges().subscribe(user => {
      if (user.roles === {}) {
        // For users who were created without roles
        // Do this so data isn't overridden if roles already exists
        const userData = {
          uid: authData.uid,
          email: authData.email,
          displayName: authData.displayName,
          profilePicture: authData.photoURL,
          roles: {}
        };

        // Update the user
        return userRef.set(userData, {merge: true});
      }
    });

    // Update the user with the new auth data
    return userRef.set(newUserData, {merge: true});
  }

  /**
   * Signs the user out and redirects to the home page
   */
  async signOut() {
    await this.firebaseAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
