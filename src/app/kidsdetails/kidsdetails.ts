import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Paymentmode } from '../paymentmode/paymentmode';

@Component({
  selector: 'app-kidsdetails',
  standalone:true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,Paymentmode],
  templateUrl: './kidsdetails.html',
  styleUrl: './kidsdetails.css',
})
export class Kidsdetails {
  @Input() onPaymentSuccessFn!: (txnId: string, status: string) => void;
   @Input() formgrp!: FormGroup;
kidscount = signal(1);

 get kids(){
  return this.formgrp.get('kids') as FormArray<FormGroup> 
}
deleteItems(index:number){
this.kids.removeAt(index);
this.kidscount.set(this.kids.length);
}

generateKids() {
    this.kids.push(
      new FormGroup({
        kidFirstName: new FormControl("", [Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
        Age: new FormControl("", [Validators.required]),
        Gender:new FormControl("",[Validators.required])
      })
    );
    this.kidscount.set(this.kids.length);
}

}
