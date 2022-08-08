import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { SearchService } from 'src/app/service/search.service';
import { FormService }  from 'src/app/service/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-vote-spontaneous',
  templateUrl: './vote-spontaneous.component.html',
  styleUrls: ['./vote-spontaneous.component.scss'],
  animations:[routerTransition()]
})
export class VoteSpontaneousComponent implements OnInit {

  search_id: any;
  form_id: any;
  form: FormGroup;
  search: any;
  description:any;
  mayor: any;
  city: any;


  constructor(private route: ActivatedRoute,private fb: FormBuilder,private formService: FormService, private searchService: SearchService, private router: Router) {
    this.route.params.subscribe(params => this.form_id = params['form_id']);
    this.route.params.subscribe(params => this.search_id = params['id']);
  }

  ngOnInit() {
    this.getSearch();
    this.form = this.fb.group({
      name_mayor: ['', Validators.compose([Validators.required])],
      not_name_mayor: ['', Validators.compose([Validators.required])],
      councilor_candidate: ['', Validators.compose([Validators.required])],
      expectation_mayor_victory: ['', Validators.compose([Validators.required])],
      mayor_indication_accept: ['', Validators.compose([Validators.required])]

    });
  }

  getSearch() {
    this.searchService.getSearch(this.search_id).then((result: any) => {
      if (result) {
        this.search = result;
        this.description = this.search.description;
        this.mayor = this.search.mayor;
        this.city = this.search.city;
      }
    });
  }

  doSubmit(){
    if (this.form.valid) {
      this.formService.addVoteSpontaneous(this.form.value,this.search_id,this.form_id).then((result: any) => {
        if (!result.error) {
          console.log(this.form_id)
          this.router.navigateByUrl(`searches/${this.search_id}/forms/${this.form_id}/vote_stimulateds`)
        }
        else{
          console.log(result.error)
        }
      });
    }
   
  }
};