import { Routes } from '@angular/router';
import { Submitform } from './submitform/submitform';
import { Registerforms } from './registerforms/registerforms';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: Registerforms },
  { path: 'submitform', component: Submitform }
];


