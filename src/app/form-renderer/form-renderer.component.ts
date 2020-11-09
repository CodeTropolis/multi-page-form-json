import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatRadioChange } from "@angular/material/radio";

@Component({
  selector: 'app-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss']
})
export class FormRendererComponent {
  @Input() form: FormGroup;
  @Input() questions: any[] = [];

  constructor() {}

  ngOnInit() {}

  get f() {
    // console.log(this.form.controls)
    return this.form.controls;
  }

  radioChange(event: MatRadioChange) {
    console.log(event);
  }
}