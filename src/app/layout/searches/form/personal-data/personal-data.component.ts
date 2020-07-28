import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { FormService } from 'src/app/service/form.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
  animations: [routerTransition()]
})
export class PersonalDataComponent implements OnInit {
form:FormGroup;
form_id:any;
search_id: any;

  constructor(private router: Router, private fb: FormBuilder, private formservice: FormService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.form_id = params['form_id']);
    this.route.params.subscribe(params => this.search_id = params['id']);
   }

  ngOnInit() {
    this.form = this.fb.group({
      gender: ['', Validators.compose([Validators.required])],
      age: ['', Validators.compose([Validators.required])],
      scholarity: ['', Validators.compose([Validators.required])],
      occupation: ['', Validators.compose([Validators.required])],
      family_income: ['', Validators.compose([Validators.required])],
      housing_situation: ['', Validators.compose([Validators.required])],
      region: ['', Validators.compose([Validators.required])]
    });
  }

  changeGender(e) {
    console.log(e.target.value);
  }

  doSubmit(){
    if (this.form.valid) {
      this.formservice.addPersonalData(this.form.value,this.search_id,this.form_id).then((result: any) => {
        if (!result.error) {
          console.log(this.form_id)
          this.router.navigateByUrl(`searches/${this.search_id}/forms/${this.form_id}/social_demand`)
        }
        else{
          console.log(result.error)
        }
      });
    }
    
  }

}
