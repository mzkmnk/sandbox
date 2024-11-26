import { Component, Injector, OnInit, effect, inject, runInInjectionContext, signal } from "@angular/core";
import {FormsModule} from '@angular/forms'

@Component({
    selector:'app-effect-lifecycle',
    imports:[FormsModule],
    template:`
    <h1>Effect Lifecycle Component</h1>

    <input [(ngModel)]="username" placehoder="input username">
    <p>result:) {{username()}}</p>
    `
})
export class EffectLifecycleComponent implements OnInit{

    username = signal<string>('');

    // // in the absense of dep, it was first loaded
    // outsideConstructor = effect(() => {
    //     console.log('outside contructor');
    // });

    // in the case of dep, it was first loaded
    outsideConstructorWithDep = effect(() => ((username) => {console.log('outside constructor',username)})(this.username()))


    private injector = inject(Injector);
    
    constructor(){

        // in the absense of dep, it was second loaded
        // effect(() => {
        //     console.log('inside constructor');
        // });

        // in the case of dep, it was second loaded
        effect(() => ((username) => {console.log('inside construcor',username)})(this.username()));

    }

    ngOnInit(){
        runInInjectionContext(this.injector,() => {
            effect(() => {
                console.log('effect in ngOnInit');
            });
        });
    };

};