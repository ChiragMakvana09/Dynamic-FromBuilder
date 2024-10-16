import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
isFieldInvalid(arg0: string): any {
throw new Error('Method not implemented.');
}
  registrationForm: FormGroup;
  maxBirthdate: string;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      birthdate: [''],
      gender: [''],
      hobbies: this.fb.array([])
    }, { validators: this.passwordMatchValidator });

    const today = new Date();
    this.maxBirthdate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  }

  ngOnInit(): void {}

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value 
      ? null : { mismatch: true };
  }

  onCheckboxChange(event: any) {
    const hobbies: FormArray = this.registrationForm.get('hobbies') as FormArray;

    if (event.checked) {
      hobbies.push(new FormControl(event.source.value));
    } else {
      const index = hobbies.controls.findIndex(x => x.value === event.source.value);
      hobbies.removeAt(index);
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      const dataObject = {
        ...formData,
        hobbies: formData.hobbies
      };
      console.log(dataObject); // Display the data in the console

      // Reset the form fields
      this.registrationForm.reset(); // This clears the form values
      this.registrationForm.setControl('hobbies', this.fb.array([])); // Reset hobbies array
      this.registrationForm.updateValueAndValidity(); // Update validation state
    }
  }
}
