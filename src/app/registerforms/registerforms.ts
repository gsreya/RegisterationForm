
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Kidsdetails } from '../kidsdetails/kidsdetails';
import { Googlesheets } from '../googlesheets';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registerforms',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,Kidsdetails],
  templateUrl: './registerforms.html',
  styleUrl: './registerforms.css',
})
export class Registerforms implements OnInit {
constructor(
    private sheetService: Googlesheets,
    private router:Router
  ) {}
  payload:any;
 formgrp:FormGroup=new FormGroup({});

ngOnInit(){
 this.formgrp=new FormGroup({
  PFirstName:new FormControl("",[Validators.required,Validators.pattern(/^[a-z A-Z]+$/)]),
  PLastName:new FormControl("",[Validators.required,Validators.pattern(/^[a-z A-Z]+$/)]),
  EmailID:new FormControl("",[Validators.required,Validators.email]),
  Phonenumber:new FormControl("",[Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
  
  agreeCond:new FormControl("",[Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
  kids: new FormArray<FormGroup>([])

 });
 this.addKid();
}
get kids() {
    return this.formgrp.get('kids') as FormArray<FormGroup>;
  }

   addKid() {
    this.kids.push(
      new FormGroup({
        kidFirstName: new FormControl("", [Validators.required]),
        Age: new FormControl("", [Validators.required]),
        Gender: new FormControl("", [Validators.required])
      })
    );
  }
  deleteKid(index: number) {
    this.kids.removeAt(index);
  }
 onPaymentSuccess(transactionId: string, paymentStatus: string) {
    this.payload = {
      ...this.formgrp.value,
      PaymentStatus: paymentStatus,
      TransactionID: transactionId
    };
 console.log("Form payment ", this.payload);
  }



onSubmit() {
  if (this.formgrp.invalid) {
    this.formgrp.markAllAsTouched();
    return;
  }
  if (!this.payload) {
    alert("Payment not completed yet");
    return;
  }

    this.sheetService.sendRegistration(this.payload).subscribe({
    next: (res) => {console.log("Google Sheets response:", res);
      this.router.navigate(['/submitform'], {
        queryParams: {
          transactionId: this.payload.TransactionID
        }
      });
},
    error: (err) => console.error("Google Sheets error:", err)
  });

  console.log("Form submitted", this.payload);
}


}
