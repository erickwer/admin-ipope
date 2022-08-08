import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { SearchService } from 'src/app/service/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-search',
  templateUrl: './view-search.component.html',
  styleUrls: ['./view-search.component.scss'],
  animations: [routerTransition()]
})
export class ViewSearchComponent implements OnInit {
  search_id: any;
  search: any;
  description:any;
  secretaries: any[];
  mayors: any[];
  councilors: any[];
  first_cand: any[];
  second_cand: any[];

  constructor(private route: ActivatedRoute, private searchService: SearchService, private router: Router) {
    this.search_id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.getSearch();
  }

  getSearch() {
    this.searchService.getSearch(this.search_id).then((result: any) => {
      if (result) {
        this.search = result;
        this.description = this.search.description
        this.secretaries = this.search.secretaries;
        this.mayors = this.search.mayors;
        this.councilors = this.search.councilors;
        this.first_cand =  this.search.first_disputes;
        this.second_cand = this.search.second_disputes;
      }
    });
  }
  removeMayor(mayor_id: string){
    Swal.fire({
      title: 'Tem certeza que deseja excluir este candidato?',
      text: "Esta ação não pode ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.value) {
        this.searchService.removeMayorCandidate(mayor_id, this.search_id).then((result: any) => {
          if (!result.error) {
            Swal.fire(
              'Excluído!',
              'O candidato a prefeito foi excluído.',
              'success'
            )
            this.getSearch()
          }
        });
      }
    })
  }

  removeSecretary(secretary_id: string){
    Swal.fire({
      title: 'Tem certeza que deseja excluir este secretário?',
      text: "Esta ação não pode ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.value) {
        this.searchService.removeSecretary(secretary_id, this.search_id).then((result: any) => {
          if (!result.error) {
            Swal.fire(
              'Excluído!',
              'O secretário foi excluído.',
              'success'
            )
            this.getSearch()
          }
        });
      }
    })
  }
  removeFirst(first_id: string){
    Swal.fire({
      title: 'Tem certeza que deseja excluir este candidato da primeira disputa??',
      text: "Esta ação não pode ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.value) {
        this.searchService.removeFirst(first_id, this.search_id).then((result: any) => {
          if (!result.error) {
            Swal.fire(
              'Excluído!',
              'O candidato foi excluído da primera disputa.',
              'success'
            )
            this.getSearch()
          }
        });
      }
    })
  }

  removeSecond(second_id: string){
    Swal.fire({
      title: 'Tem certeza que deseja excluir este candidato da segunda disputa??',
      text: "Esta ação não pode ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.value) {
        this.searchService.removeSecond(second_id, this.search_id).then((result: any) => {
          if (!result.error) {
            Swal.fire(
              'Excluído!',
              'O candidato foi excluído da segunda disputa.',
              'success'
            )
            this.getSearch()
          }
        });
      }
    })
  }
  }

