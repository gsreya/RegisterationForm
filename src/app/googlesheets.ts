import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Googlesheets {
   private scriptUrl = "GooglesheetID"
    constructor(private http: HttpClient) {}

sendRegistration(data: any) {
  console.log("Sending to:", this.scriptUrl);
  const formData = new FormData();
  formData.append("payload", JSON.stringify(data));

  return this.http.post(this.scriptUrl, formData, {
  responseType: "text",
  headers: new HttpHeaders()
});
}



}
