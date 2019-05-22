import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Customer } from './customer';

// function ratingRange(item: AbstractControl): { [key: string]: boolean } | null {
//   if (item.value !== null && (isNaN(item.value) || item.value < 1 || item.value > 5)) {
//     return { 'range': true };
//   }

//   return null;
// }

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();
  states: Array<Object> = [
    { label: 'AL', value: 'Alabama' },
    { label: 'AK', value: 'Alaska' },
    { label: 'AZ', value: 'Arizona' },
    { label: 'AR', value: 'Arkansas' },
    { label: 'CA', value: 'California' },
    { label: 'CO', value: 'Colorado' },
    { label: 'WI', value: 'Wisconsin' },
    { label: 'WY', value: 'Wyoming' },
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      notification: 'email',
      rating: [null, [Validators.min(1), Validators.max(5)]],
      sendCatalog: true
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  SetNotification(value: string): void {
    const control = this.customerForm.get('phone');
    value === 'text' ? control.setValidators(Validators.required) : control.clearAsyncValidators();
    control.updateValueAndValidity();
  }
}
