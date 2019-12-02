import { Component, OnInit } from '@angular/core';
import {Quote, QuotesService} from '../../../services/quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  quotes: Quote[];
  contentLoaded = false;

  constructor(private quoteService: QuotesService) { }

  ngOnInit() {
    // Get all the quotes
    this.quoteService.getAllQuotes().subscribe(quotes => {
      this.contentLoaded = true;
      this.quotes = quotes;
    });
  }

}
