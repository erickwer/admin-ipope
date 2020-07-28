import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { SearchService } from 'src/app/service/search.service';
import { FormService } from  'src/app/service/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-vote-stimulateds',
  templateUrl: './vote-stimulateds.component.html',
  styleUrls: ['./vote-stimulateds.component.scss'],
  animations:[routerTransition()]
})
export class VoteStimulatedsComponent implements OnInit {

  search_id: any;
  form_id: any;
  form: FormGroup;
  search: any;
  description:any;
  mayor: any;
  city: any;
  mayor_candidates:any[];
  first_disp:any[];
  second_disp:any[];


  constructor(private route: ActivatedRoute,private fb: FormBuilder,private formService: FormService ,private searchService: SearchService, private router: Router) {
    this.route.params.subscribe(params => this.form_id = params['form_id']);
    this.route.params.subscribe(params => this.search_id = params['id']);
  }

  ngOnInit() {
    this.getSearch();
    this.form = this.fb.group({
      name_mayor: ['', Validators.compose([Validators.required])],
      not_name_mayor: ['', Validators.compose([Validators.required])],
      first_dispute: ['', Validators.compose([Validators.required])],
      second_dispute: ['', Validators.compose([Validators.required])],
      mayor_candidate_supports: ['', Validators.compose([Validators.required])]

    });
  }

  getSearch() {
    this.searchService.getSearch(this.search_id).then((result: any) => {
      if (result) {
        this.search = result;
        this.description = this.search.description;
        this.mayor = this.search.mayor;
        this.city = this.search.city;
        this.mayor_candidates = this.search.mayors;
        this.first_disp =  this.search.first_disputes;
        this.second_disp = this.search.second_disputes;
      }
    });
  }
  doSubmit(){
    if (this.form.valid) {
      this.formService.addVoteStimulated(this.form.value,this.search_id,this.form_id).then((result: any) => {
        if (!result.error) {
          console.log(this.form_id)
          this.router.navigateByUrl(`searches/${this.search_id}/forms`)
        }
        else{
          console.log(result.error)
        }
      });
    }
    //this.router.navigateByUrl(`searches/${this.search_id}/form/${this.form_id}/vote-stimulateds`)
  }

}
