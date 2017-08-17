import {
  Component,
  OnInit,
  OnDestroy
}                                     from '@angular/core';
import {Quote}                        from '../../CMS/home/quote.model';
import {routerTransition} from "../../router.animations";
import {QuotesService} from "../../CMS/home/quote.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // animations: [routerTransition()],
  // host: {'[@routerTransition]': ''}
})
export class HomeComponent implements OnInit, OnDestroy{

  quote: Quote;
  quotes: Quote[];
  idx: number = 0;
  id:any;

  constructor(private quoteService:QuotesService) {}

  ngOnInit() {
    this._getAll();
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  private _getAll():void {

    this.quotes = [];




    this.quoteService
        .getAllEnabled()
        .subscribe((quotes) => {
          this.quotes = quotes;
          this.nextQuote();
          this.id = setInterval(() => {
            this.nextQuote();
          }, 5000);
        });

  }

  public nextQuote(){
      this.idx = (this.idx + 1) % this.quotes.length;
      this.quote = this.quotes[this.idx];
  }
}
