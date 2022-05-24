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
    documentalClassId: ['', Validators.required],
    code: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    displayName: ['', Validators.required],
    aireName: ['', Validators.required],
    highSecurityLevel: [false],
    enabled: [false],
    aireIntegration: this.fb.group({
      validate: [false],
      notify: [false],
    }),
    symbolicNames: this.fb.array([
      this.fb.control(true),
      this.fb.control(false)
    ]),
    documentTypeCodeToCopyAuthorization: ['', Validators.required],
    documentalClassesSiblings: this.fb.array([
      this.fb.group({
        selectedSibling: this.fb.control(true),
        documentalClassSiblingId: this.fb.control(''),
        selectedDocumentalClassId: this.fb.control(''),
        documentTypeCodeToCopyAuthorization: this.fb.control(''),
        symbolicNamesSibling: this.fb.array([
          this.fb.control(true),
          this.fb.control(false)
        ])
      }),
      this.fb.group({
        selectedSibling: this.fb.control(true),
        documentalClassSiblingId: this.fb.control(''),
        selectedDocumentalClassId: this.fb.control(''),
        documentTypeCodeToCopyAuthorization: this.fb.control(''),
        symbolicNamesSibling: this.fb.array([
          this.fb.control(true),
          this.fb.control(false)
        ])
      })
    ])
  });

  get code() {
    return this.profileForm.get('code') as FormControl;
  }

  get displayName() {
    return this.profileForm.get('displayName') as FormControl;
  }

  get aireName() {
    return this.profileForm.get('aireName') as FormControl;
  }

  get symbolicNames() {
    return this.profileForm.get('symbolicNames') as FormArray;
  }

  get documentalClassesSiblings() {
    return this.profileForm.get('documentalClassesSiblings') as FormArray;
  }

  symbolicNamesSiblings(i: number) {
    var array = this.profileForm.get('documentalClassesSiblings') as FormArray;
    return array.at(i).get('symbolicNamesSibling') as FormArray;
  }

  

  addSymbolicName() {
    this.symbolicNames.push(this.fb.control(''));
  }

  updateProfile() {
    this.profileForm.patchValue({
      documentalClassId: "f9eb5531-7d5a-40a3-8d5b-d668fa388559",
      code: "721",
      displayName: 'displayName',
      aireIntegration: {
        validate: true
      },
      documentalClassesSiblings: [
        {
          selectedSibling: false,
          documentalClassSiblingId: "b0777777-2122-419d-bb39-bce3f85aad84",
          selectedDocumentalClassId: "81d0a292-7f2f-407d-9444-c4deb1f7aec0",
          documentTypeCodeToCopyAuthorization: "2",
        }
      ]
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }
}
