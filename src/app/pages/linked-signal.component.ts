import {Component, WritableSignal, effect, linkedSignal, signal} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {AbstractControl, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

/**
 * 
 * helper function for signalFormControl
 * 
 * e.g.
 * username = new FormControl<string>('',{nonNullable:true});
 * signalUsername = signalFormControl(this.username);
 */
export const signalFormControl = <T>(control:AbstractControl<T>):WritableSignal<T> => {

  // formControl to signalFormControl
  const signalControl = linkedSignal(
    toSignal(control.valueChanges,{initialValue:control.value}),
  );

  // signalFormControl to formControl
  effect(():void => ((value):void => {
    control.setValue(value);
  })(signalControl()));

  return signalControl
};

@Component({
  selector: 'app-linked-signal',
  template: `
    <h1>Linked Signal</h1>

    <button (click)="onClickOp({op:'-'})">-</button>
    <button (click)="onClickOp({op:'+'})">+</button>

    <h3>Dynamic Signal Value :) {{ signalValue() }}</h3>

    <textarea [(ngModel)]="textareaValue"></textarea>

    <h3>text area value :) {{textareaValue()}}</h3>

    <h3>FormControl to signalFormControl</h3>

    <form>
      <input placeholder="your name" [formControl]="username" />
    </form>


    <form>
      <input placeholder="new username" [formControl]="newUsername">
    </form>

    <button (click)="setUsername({newUsername:newUsername.value ?? ''})">set new username </button>

    <h2>result</h2>
    <p>username formControl:{{username.value}}</p>
    <p>username signalFormControl:{{ signalUsername() }}</p>
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


  username = new FormControl<string>('',{nonNullable:true});

  newUsername = new FormControl<string>('');

  signalUsername = signalFormControl(this.username);

  setUsername = ({newUsername}:{newUsername:string}):void => {
    this.signalUsername.set(newUsername);
  };
}
