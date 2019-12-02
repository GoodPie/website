import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

export interface Quote { text: string; }

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  private quotesCollection: AngularFirestoreCollection<Quote>;

  constructor(private db: AngularFirestore) {
    this.quotesCollection = this.db.collection<Quote>('quotes');
  }

  getAllQuotes(): Observable<Quote[]> {
    return this.quotesCollection.valueChanges();
  }

  addNewQuote(quote: Quote) {
    this.quotesCollection.add(quote);
  }
}
