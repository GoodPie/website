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

  googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    return this.firebaseAuth.auth.signInWithPopup(provider)
      .then(credentials => this.updateUserData(credentials.user));
  }

  private updateUserData(authData) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc('users/' + authData.uid);

    const newUserData = {
      uid: authData.uid,
      email: authData.email,
      displayName: authData.displayName,
      profilePicture: authData.photoURL,
    };

    userRef.valueChanges().subscribe(user => {
      if (user.roles === {}) {
        const userData = {
          uid: authData.uid,
          email: authData.email,
          displayName: authData.displayName,
          profilePicture: authData.photoURL,
          roles: {}
        };

        return userRef.set(userData, {merge: true});
      }
    });


    return userRef.set(newUserData, {merge: true});
  }

  async signOut() {
    await this.firebaseAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
