import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { FormService } from 'src/app/service/form.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-social-demands',
  templateUrl: './social-demands.component.html',
  styleUrls: ['./social-demands.component.scss'],
  animations: [routerTransition()]

})
export class SocialDemandsComponent implements OnInit {

  form:FormGroup;
  form_id:any;
  search_id: any;
  
    constructor(private router: Router, private fb: FormBuilder, private formService: FormService, private route: ActivatedRoute) {
      this.route.params.subscribe(params => this.form_id = params['form_id']);
      this.route.params.subscribe(params => this.search_id = params['id']);
     }
  
    ngOnInit() {
      this.form = this.fb.group({
        education: ['', Validators.compose([])],
        health: ['', Validators.compose([])],
        dwelling: ['', Validators.compose([])],
        job: ['', Validators.compose([])],
        paving: ['', Validators.compose([])],
        cleaning: ['', Validators.compose([])],
        illumination: ['', Validators.compose([])],
        rural_roads: ['', Validators.compose([])],
        infrastructure: ['', Validators.compose([])],
        social_assistance: ['', Validators.compose([])],
        sanitation: ['', Validators.compose([])],
        others: ['', Validators.compose([])],
        nop: ['', Validators.compose([])],
      });
    }
  
    changeGender(e) {
      console.log(e.target.value);
    }
  
  
    doSubmit(){
      if (this.form.valid) {
        console.log(this.form)
        this.formService.addSocialDemands(this.form.value,this.search_id,this.form_id).then((result: any) => {
          if (!result.error) {
            console.log(this.form_id)
            this.router.navigateByUrl(`searches/${this.search_id}/forms/${this.form_id}/administrative_evaluation`)
          }
          else{
            console.log(result.error)
          }
        });
      }
    }
  
  }
  


