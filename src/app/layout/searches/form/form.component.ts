import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { SearchService } from 'src/app/service/search.service';
import { FormService }  from 'src/app/service/form.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  animations: [routerTransition()],
})
export class FormComponent implements OnInit {

  form:FormGroup;
  description:any;
  search_id:any;
  form_id:any;
  totalForm: any;
  
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private formService: FormService ,private searchService: SearchService) { 
    this.description = "Formulário de pesquisa";
    this.search_id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, Validators.compose([Validators.required])]
    });
    this.getForm()

  }

  async getForm(){
    await this.formService.getForms(this.search_id).then((result: any ) =>{
      this.totalForm =  result.totalForms
    })
  }

  async createForm() {
      await this.searchService.createForm(this.form.value,this.search_id).then((result: any) => {
        if (!result.error) {
          this.form_id = result.id
          this.router.navigateByUrl(`searches/${this.search_id}/forms/${this.form_id}/personal_data`);
        }
      });
  }
}
