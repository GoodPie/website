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

  /**
   * Fetches all quotes without meta data
   */
  getAllQuotes(): Observable<Quote[]> {
    return this.quotesCollection.valueChanges();
  }

  /**
   * Adds a new quote to Firebase
   * @param quote Quote quote object
   */
  addNewQuote(quote: Quote) {
    this.quotesCollection.add(quote);
  }
}
