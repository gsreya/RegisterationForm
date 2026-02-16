
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Kidsdetails } from '../kidsdetails/kidsdetails';
import { Googlesheets } from '../googlesheets';
import { Router } from '@angular/router';
import { NgOtpInputComponent} from 'ng-otp-input';


@Component({
  selector: 'app-registerforms',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,Kidsdetails,NgOtpInputComponent],
  templateUrl: './registerforms.html',
  styleUrl: './registerforms.css',
})
export class Registerforms implements OnInit {
  config = {
    length: 6,
    allowNumbersOnly: true,

  }
  otpCode = '';
  isVerified: boolean = false;

  generate6DigitNumber() {
    this.otpCode = Math.floor(100000 + Math.random() * 9000).toString();;
    console.log(this.otpCode);
  }

    submitOtp() {
    console.log(this.formgrp.value.code);
    if (this.formgrp.value.code === this.otpCode) {
      this.isVerified = true;
    }
    else {
      this.isVerified = false;
      this.formgrp.get('code')?.setErrors({ invalidOtp: true });
      this.formgrp.get('code')?.markAsTouched();

    }
  }
constructor(
    private sheetService: Googlesheets,
    private router:Router
  ) {}
  payload:any;
 formgrp:FormGroup=new FormGroup({});

  ngOnInit() {

 this.formgrp=new FormGroup({
  PFirstName:new FormControl("",[Validators.required,Validators.pattern(/^[a-z A-Z]+$/)]),
  PLastName:new FormControl("",[Validators.required,Validators.pattern(/^[a-z A-Z]+$/)]),
  EmailID:new FormControl("",[Validators.required,Validators.email]),
  Phonenumber:new FormControl("",[Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
  code: new FormControl<string>('', [Validators.required, Validators.minLength(6),Validators.maxLength(6)]),

  agreeCond:new FormControl("",[Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
  kids: new FormArray<FormGroup>([])

 });
 this.addKid();
  }
  
  verifyEmail() {
    const emailCtrl = this.formgrp.get('EmailID');
    
  if (!emailCtrl || emailCtrl.invalid) {
      emailCtrl?.markAsTouched();
      emailCtrl?.updateValueAndValidity({ onlySelf: true });
      return;
    }

    else {
       this.generate6DigitNumber();}
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
