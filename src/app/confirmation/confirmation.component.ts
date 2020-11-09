import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { FormService } from "../services/form.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  formValue$: BehaviorSubject<any>;

  constructor(private formService: FormService, private router: Router) { }

  ngOnInit(): void {
    this.formValue$ = this.formService.formValue$;
  }

  routeTo(route) {
    console.log(route);
    this.router.navigate([route]);
  }

}
