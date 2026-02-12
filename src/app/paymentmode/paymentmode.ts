import { isPlatformBrowser } from '@angular/common';
import { Component, effect, signal,ElementRef, Inject, input, PLATFORM_ID, ViewChild, Input } from '@angular/core';


@Component({
  selector: 'app-paymentmode',
  imports: [],
  standalone: true,
  templateUrl: './paymentmode.html',
  styleUrl: './paymentmode.css',
})
export class Paymentmode {
  @Input() onPaymentSuccessFn!: (txnId: string, status: string) => void;
kidscount = input.required<number>();
totalamt=0;
amount=50;
  @ViewChild('paymentref',{static:true}) paymentref! :ElementRef;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,) {
      effect(() => {
   
    this.totalamt = this.kidscount() * this.amount;

    if (isPlatformBrowser(this.platformId)) {
      this.renderPaypal();  
    }
  });

  }

renderPaypal() {
  this.paymentref.nativeElement.innerHTML = ""; 
      window.paypal.Buttons({
        createOrder:(data:any,actions:any)=>{
        return actions.order.create({
          purchase_units:[{
            amount:{
              value:this.totalamt.toString(),
              currency_code:'USD'
            }
          }]
          
        })
        },
        onApprove:(data:any,actions:any)=>{
          return actions.order.capture().then((details:any)=>{
            console.log(details);
            const transactionId = details.id;
            const paymentStatus = details.status;
             this.onPaymentSuccessFn(transactionId, paymentStatus);
            }
          );
        },
        onError:(error:any)=>{
          console.log(error);
        }
        }).render(this.paymentref.nativeElement);
  }



}
