import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'submitform',
  standalone: true,
  imports: [],
  templateUrl: './submitform.html',
  styleUrl: './submitform.css',
})
export class Submitform {
transactionId: string = '';
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.transactionId = this.route.snapshot.queryParamMap.get('transactionId') || '';
}

}
