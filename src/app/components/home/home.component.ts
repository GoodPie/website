import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

export interface Quote { text: string; }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  private quotesCollection: AngularFirestoreCollection<Quote>;
  quotes: Observable<Quote[]>;
  currentQuoteIndex = 0;
  quoteCount = 0;
  @ViewChild('quotes', {static : false}) quoteRef: ElementRef;

  constructor(db: AngularFirestore) {
    this.quotesCollection = db.collection<Quote>('quotes');
    this.quotes = this.quotesCollection.valueChanges(res => {
      console.log(res);
    });
  }

  ngOnInit() {

  }


  private changeQuote() {

    this.currentQuoteIndex += 1;
    if (this.currentQuoteIndex > this.quoteCount) {
      this.currentQuoteIndex = 0;
    }

  }

  private setQuoteCount(amount: number) {
    this.quoteCount = amount;
  }
}
