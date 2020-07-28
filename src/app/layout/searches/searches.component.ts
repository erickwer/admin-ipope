import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { SearchService } from 'src/app/service/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tables',
  templateUrl: './searches.component.html',
  styleUrls: ['./searches.component.scss'],
  animations: [routerTransition()]
})
export class SearchesComponent implements OnInit {
  searches: any[];

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit() {
    this.getAllSearches();
  }

  getAllSearches() {
    this.searchService.getAll().then((result: any) => {
      if (!result.error) {
        this.searches = result;
      }
    });
  }
  removeSearch(search_id: string) {
    Swal.fire({
      title: 'Tem certeza que deseja excluir esta pesquisa?',
      text: "Esta ação não pode ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.value) {
        this.searchService.removeSearch(search_id).then((result: any) => {
          if (!result.error) {
            Swal.fire(
              'Excluído!',
              'Sua pesquisa foi deletada.',
              'success'
            )
            this.getAllSearches()
          }
        });
      }
    })
  }
}
