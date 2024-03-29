import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { SearchService } from 'src/app/service/search.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-second-dispute',
  templateUrl: './create-second-dispute.component.html',
  styleUrls: ['./create-second-dispute.component.scss'],
  animations: [routerTransition()]
})
export class CreateSecondDisputeComponent implements OnInit {
  form: FormGroup;
  search_id: any;
  search: any;
  description: any;
  mayors: any[];
  second_cand: any[];
  
  
    constructor(private route: ActivatedRoute, private searchService: SearchService, private fb: FormBuilder, private router: Router) {
      this.search_id = this.route.snapshot.params.id; }
  
    ngOnInit() {
      this.getSearch();
      this.form = this.fb.group({
        name: ['', Validators.compose([Validators.required])]
      });
    }
  
    getSearch() {
      this.searchService.getSearch(this.search_id).then((result: any) => {
        if (result) {
          this.search = result;
          this.description = this.search.description
          this.mayors = this.search.mayors;
          this.second_cand =  this.search.first_disputes;        
         
        }
      });
    }
  
    doSubmit() {
      if (this.form.valid) {      
        this.searchService.addSecond(this.form.value, this.search_id).then((result: any) => {
          if (!result.error) {
            Swal.fire({
              icon: 'success',
              text: 'Candidato Inserido na Segunda Disputa',
              confirmButtonText: 'Ok'
            })
            this.router.navigateByUrl(`/searches/view/${this.search_id}`);
          }
        });
      }
    }

}
