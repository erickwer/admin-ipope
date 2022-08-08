import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { SearchService } from 'src/app/service/search.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tables',
  templateUrl: './create-search.component.html',
  styleUrls: ['./create-search.component.scss'],
  animations: [routerTransition()]
})
export class CreateSearchComponent implements OnInit {

  form: FormGroup;
  user: any;

  constructor(private router: Router, private fb: FormBuilder, private searchService: SearchService) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.form = this.fb.group({
      user_id: [this.user.id, Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      president: ['', Validators.compose([Validators.required])],
      governor: ['', Validators.compose([Validators.required])],
      mayor: ['', Validators.compose([Validators.required])]
    });
  }

  doSubmit() {
    if (this.form.valid) {
      this.searchService.addSearch(this.form.value).then((result: any) => {
        if (!result.error) {
          Swal.fire({
            icon: 'success',
            text: 'Pesquisa cadastrada com sucesso',
            confirmButtonText: 'Ok'
          })
          this.router.navigateByUrl('/searches');
        }
      });
    }
  }
}
