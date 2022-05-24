import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private fb: FormBuilder) { }

  ngAfterViewInit() {

  }

  ngOnInit() {
    this.updateProfile();
  }

  profileForm = this.fb.group({
    id: ['', Validators.required],
    code: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    firstname: ['', Validators.required],
    lastName: ['', Validators.required],
    securityLevel: [false],
    enabled: [false],
    info: this.fb.group({
      validate: [false],
      notify: [false],
    }),
    list: this.fb.array([
      this.fb.control(true),
      this.fb.control(false)
    ]),
    list2: this.fb.array([
      this.fb.group({
        item1: this.fb.control(true),
        item2: this.fb.control(''),
        item3: this.fb.control(''),
        item4: this.fb.control(''),
        list3: this.fb.array([
          this.fb.control(true),
          this.fb.control(false)
        ])
      }),
      this.fb.group({
        item1: this.fb.control(false),
        item2: this.fb.control(''),
        item3: this.fb.control(''),
        item4: this.fb.control(''),
        list3: this.fb.array([
          this.fb.control(false)
        ])
      })
    ])
  });

  get code() {
    return this.profileForm.get('code') as FormControl;
  }

  get firstname() {
    return this.profileForm.get('firstname') as FormControl;
  }

  get lastName() {
    return this.profileForm.get('lastName') as FormControl;
  }

  get list() {
    return this.profileForm.get('list') as FormArray;
  }

  get list2() {
    return this.profileForm.get('list2') as FormArray;
  }

  list3(i: number) {
    var array = this.profileForm.get('list2') as FormArray;
    return array.at(i).get('list3') as FormArray;
  }

  addItem() {
    this.list.push(this.fb.control(false));
  }

  updateProfile() {
    this.profileForm.patchValue({
      id: "f9eb5531-7d5a-40a3-8d5b-d668fa388559",
      code: "721",
      firstname: 'Alberto',
      info: {
        validate: true
      },
      list2: [
        {
          item1: false,
          item2: "b0777777-2122-419d-bb39-bce3f85aad84",
          item3: "81d0a292-7f2f-407d-9444-c4deb1f7aec0",
          item4: "2",
        }
      ]
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }
}
