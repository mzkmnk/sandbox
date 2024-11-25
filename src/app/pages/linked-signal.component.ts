import {Component, linkedSignal, signal} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-linked-signal',
  template: `
    <h1>Linked Signal</h1>

    <button (click)="onClickOp({op:'+'})">+</button>
    <button (click)="onClickOp({op:'-'})">-</button>

    <h3>Dynamic Signal Value :) {{ signalValue() }}</h3>

    <textarea [(ngModel)]="textareaValue"></textarea>

    <h3>text area value :) {{textareaValue()}}</h3>

    <h3>if u used linkedSignal in form </h3>

    <form>
      <textarea [formControl]="textareaValueFormControl"></textarea>
    </form>
  `,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LinkedSignalComponent {

  signalValue = signal<number>(1);

  onClickOp({op}:{op:'+'|'-'}){
    this.signalValue.update((val) => op === '+' ? val+1 : val-1);
  }

  textareaValue = linkedSignal({
    source:() => this.signalValue(),
    computation:() => '',
  })

  textareaValueFormControl = new FormControl<string>('');

}
