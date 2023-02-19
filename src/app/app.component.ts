import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CalculatorState } from './states/calculator.state';
import * as CalculatorActions from './actions/calculator.action';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'calculator';

  value$: Observable<CalculatorState>;
  content: string = '0'

  ngOnInit() {
    this.value$.subscribe((value)=> {
      if (value.operator == '=') {
        this.content = value.number1 + value.number2;
      } else if (value.operator != "C") {
        this.content = value.number1 + value.operator + value.number2;
      }
    })
  }

  constructor(private store: Store<{ calculator: CalculatorState }>) {
    this.value$ = store.select('calculator');
  }

  enterNumber($event: any) {
    this.store.dispatch(CalculatorActions.enterNumber({number: $event.target.value}));
  }

  enterOperator($event: any) {
    this.store.dispatch(CalculatorActions.enterOperator({operator: $event.target.value}));
  }
}
