import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {slider} from '../../route.animation';
import {Quote, QuotesService} from '../../services/quotes.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  // Used to fetch quotes from Firebase
  private quotesCollection: AngularFirestoreCollection<Quote>;
  quotes: Quote[] = [];
  currentQuoteIndex = 0;
  quoteCount = 0;

  // Amount of columns to display depending on view width
  columnCount: number;

  faDownArrow = faAngleDown;

  constructor(quotesService: QuotesService) {
    // Begin fetching the quotes
    quotesService.getAllQuotes().subscribe(quotes => this.quotes = quotes);
  }

  ngOnInit() {
    // Ensure the correct column count is displayed on initial load
    this.columnCount = (window.innerWidth <= 600) ? 1 : 2;
  }

  /**
   * Ensure the correct column count is adjusted for page resize event
   * @param event ev
   */
  onResize(event) {
    this.columnCount = (window.innerWidth <= 600) ? 1 : 2;
  }

  /**
   * Changes the displayed quote
   */
  changeQuote() {
    this.currentQuoteIndex = Math.ceil(Math.random() * this.quoteCount);
  }

  /**
   * Used from the HTML to set the number of quotes we have from Firebase within the foreach loop
   * Not sure if this is the best way to do this but.. :/
   * @param amount Amount of quotes
   */
  setQuoteCount(amount: number) {
    this.quoteCount = amount;
  }
}
