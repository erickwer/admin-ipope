import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { SearchService } from 'src/app/service/search.service';
import { FormService } from 'src/app/service/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-administrative-evaluation',
  templateUrl: './administrative-evaluation.component.html',
  styleUrls: ['./administrative-evaluation.component.scss'],
  animations: [routerTransition()]
})
export class AdministrativeEvaluationComponent implements OnInit {

  search_id: any;
  form_id: any;
  form: FormGroup;
  search: any;
  description:any;
  mayor: any;
  president:any;
  governor:any;
  secretaries: any[];
  mayorsCandidate:any[];
  councilors: any[];

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private searchService: SearchService, private formService: FormService, private router: Router) {
    this.route.params.subscribe(params => this.form_id = params['form_id']);
    this.route.params.subscribe(params => this.search_id = params['id']);
  }

  ngOnInit() {
    this.getSearch();
    this.form = this.fb.group({
      ava_current_mayor: ['', Validators.compose([Validators.required])],
      ava_legislative_power: ['', Validators.compose([Validators.required])],
      ava_current_governor: ['', Validators.compose([Validators.required])],
      ava_current_president: ['', Validators.compose([Validators.required])],
      active_secretary: ['', Validators.compose([Validators.required])],
      active_councilor: ['', Validators.compose([Validators.required])],
      ava_coronavirus:['', Validators.compose([Validators.required])]

    });
  }

  getSearch() {
    this.searchService.getSearch(this.search_id).then((result: any) => {
      if (result) {
        this.search = result;
        this.description = this.search.description;
        this.mayor = this.search.mayor;
        this.governor = this.search.governor;
        this.president = this.search.president;
        this.secretaries = this.search.secretaries;
        this.councilors = this.search.councilors;
        console.log(this.search);
      }
    });
  }
  doSubmit(){
    if (this.form.valid) {
      this.formService.addAdmnistrativeEvaluation(this.form.value,this.search_id,this.form_id).then((result: any) => {
        if (!result.error) {
          console.log(this.form_id)
          this.router.navigateByUrl(`searches/${this.search_id}/forms/${this.form_id}/vote_spontaneous`)
        }
        else{
          console.log(result.error)
        }
      });
    }
  }
}
