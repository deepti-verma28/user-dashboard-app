import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css']
})
export class UserForm {
@Output() addUser = new EventEmitter();
@Output() close = new EventEmitter<void>();

closeModal() {
  this.close.emit();
}
  userForm: any;

  constructor(private fb: FormBuilder) {

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });

  }

  submitForm() {

  if (this.userForm.valid) {

    this.addUser.emit(this.userForm.value);

    this.close.emit();

    this.userForm.reset();

  }

}
}