import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {User} from '../models/user.model';
import {switchMap} from 'rxjs/operators';
import {auth} from 'firebase';

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

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.firebaseAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc('users/' + user.uid);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    console.log(user);

    return userRef.set(data, {merge: true});
  }

  async signOut() {
    await this.firebaseAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
