import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { SearchService } from 'src/app/service/search.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './create-secretary.component.html',
  styleUrls: ['./create-secretary.component.scss'],
  animations: [routerTransition()]
})
export class CreateSecretaryComponent implements OnInit {

  form: FormGroup;
  search_id: any;
  secretary: any;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private searcheService: SearchService) {
    this.search_id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.form = this.fb.group({
      search_id: [this.search_id, Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
    });
  }

  doSubmit() {
    if (this.form.valid) {      
      this.searcheService.addSecretary(this.form.value, this.search_id).then((result: any) => {
        if (!result.error) {
          Swal.fire({
            icon: 'success',
            text: 'Secretário cadastrado com sucesso',
            confirmButtonText: 'Ok'
          })
          this.router.navigateByUrl(`/searches/view/${this.search_id}`);
        }
      });
    }
  }
}
