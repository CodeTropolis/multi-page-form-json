import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormService } from '../services/form.service';
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myFormGroup: FormGroup;
  pages: any = [];
  numberOfPages: number = 0;
  pagesFinished: number = 1;
  isLastPage: boolean;
  subscription: Subscription;
  percentage: number;
  allControls = {}
  allowProgress: boolean;
  private allQuestions = {};
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  
  constructor(private formService: FormService, private router: Router) { }

  ngOnInit(): void {
    this.formService.getFormData().then(data => {
      this.pages = data;
      this.pages.forEach(page => {
        this.numberOfPages++;
        page.Sections.forEach(section => {
          let groupOfControls = {};
          section.Questions.forEach(question => {
            const id = question.QuestionID;

            // groupOfControls[id], for example, groupOfControls.Google which will
            // match the [formControlName] property in
            // the template as [formControlName]="control.Label"
            // groupOfControls[id] = new FormControl();
            groupOfControls[id] = question.IsRequired
              ? new FormControl(null, Validators.required)
              : new FormControl();

            // A running list of controls.
            this.allControls[id] = groupOfControls[id];
            // console.log(`@CodeTropolis: ngOnInit -> this.allControls`, this.allControls);
            this.allQuestions[id] = question.Label;
            // console.log(`@CodeTropolis: ngOnInit -> this.allQuestions`, this.allQuestions);
          });
          // Individual Form for each section
          section["formGroup"] = new FormGroup(groupOfControls);
        });
      });
      // Combined Form to hold the value across all pages
      this.myFormGroup = new FormGroup(this.allControls);
    })
  }

  // Strange issue with accessing paginator props within ngOnInit - moved here.
  ngAfterViewInit(){

    setTimeout(_ =>{

      this.percentage = (this.paginator.pageSize / this.paginator.length) * 100;
     
        this.subscription = this.myFormGroup.valueChanges.subscribe(val => {

        if(this.myFormGroup.valid){
          this.allowProgress = true;
          // this.paginator.disabled = false; 
        }else{
          this.allowProgress = false;
          // this.paginator.disabled = true; 
          }
        
        // Get the form values and create an array of objects to make an
        // iterable for the confirmation.component's template.
        const valueObjects = [];
        Object.keys(val).forEach(key => {
        // console.log(`@CodeTropolis: ngAfterViewInit -> key`, key);
          valueObjects.push({
            label: this.allQuestions[key],
            value: val[key]
          });
        });
        this.formService.formValue$.next(valueObjects);
      });

    }, 500)
  
  
  }

  pageEvents(e: any) {
  
    // Calc percentage based on Items per page drop down values
    this.percentage = (e.pageSize / e.length) * 100;
  
    // previous button clicked
    if (e.previousPageIndex > e.pageIndex) {
      this.pagesFinished--;
       this.percentage = (this.pagesFinished / this.numberOfPages) * 100;
    } 

   // next button clicked
    if (e.previousPageIndex < e.pageIndex){ 
      this.pagesFinished++;
      this.percentage = (this.pagesFinished / this.numberOfPages) * 100;
    }

    // If last page, show Finish button
    e.pageIndex === this.pages.length - 1 ||
    e.length === e.pageSize ||
    e.pageSize > e.length
      ? (this.isLastPage = true)
      : (this.isLastPage = false);
  }

  routeTo(route) {
    this.router.navigate([route]);
  }

}
