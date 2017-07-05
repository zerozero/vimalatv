import {
  Component,
  OnInit,
  OnDestroy
}                                     from '@angular/core';
import {Quote}                        from './quote.model';
import {routerTransition} from "../../router.animations";


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

  constructor() {}

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
    this.quotes.push( new Quote("The most uplifting moments came from Vimala Rowe's quietly wrenching account of the classic Strange Fruit", "The Guardian", "1"));
    // this.quotes.push( new Quote("marvelous", "you", "2"));
    // this.quotes.push( new Quote("superb", "someone", "3"));

    this.nextQuote();
      this.id = setInterval(() => {
        this.nextQuote();
      }, 3000);


    // this.quotationEditorService
    //     .getAll("quotes",true, this.config.product)
    //     .subscribe((quotes) => {
    //       this.quotes = quotes;
    //       this.nextQuote();
    //       this.id = setInterval(() => {
    //         this.nextQuote();
    //       }, 3000);
    //     });
  }

  public nextQuote(){
      this.idx = (this.idx + 1) % this.quotes.length;
      this.quote = this.quotes[this.idx];
  }
}
