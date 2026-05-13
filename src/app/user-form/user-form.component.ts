import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserFormComponent {

  @Output() addUser = new EventEmitter();

  @Output() close = new EventEmitter<void>();

  userForm;

  constructor(private fb: FormBuilder) {

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });

  }

  closeModal() {
    this.close.emit();
  }

  submitForm() {

    if (this.userForm.valid) {

      this.addUser.emit(this.userForm.value);

      this.close.emit();

      this.userForm.reset();

    }

  }
}