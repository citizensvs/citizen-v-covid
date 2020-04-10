import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { AlertService } from '../../services/alert.service';
import { IssueService } from '../../services/issue.service';
import { User } from '../../models/user'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  types: any[] = [
    {
      id: 1,
      value: "Health"
    },
    {
      id: 2,
      value: "Sanitation"
    }
  ];
  allSubTypes: any[] = [
    {
      id: 1,
      typeId: 1,
      value: "Medicine"
    },
    {
      id: 2,
      typeId: 1,
      value: "Doctor"
    },
    {
      id: 3,
      typeId: 2,
      value: "Garbage Collection"
    },
    {
      id: 4,
      typeId: 2,
      value: "Blocked Drains"
    }

  ];

  subTypes: any[];

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private issueService: IssueService,
    private alertService: AlertService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser.auth_token);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: "1",
      sub_type: "",
      longitude: "0",
      latitude: "0"
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.issueService.createIssue(this.registerForm.value, this.currentUser.auth_token)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Issue Submitted', true);
          this.loading = false;
          this.registerForm.reset();
          this.registerForm.markAsPristine();
          this.registerForm.markAsUntouched();
          this.registerForm.updateValueAndValidity();         
        },
        error => {
          if (typeof (error) == 'object') {
            this.alertService.error(error.message);
          }
          else {
            this.alertService.error(error);
          }
          this.loading = false;
        });
  }
  onSelect(typeId) {
    this.subTypes = this.allSubTypes.filter((item) => item.typeId == typeId);
  }

}
