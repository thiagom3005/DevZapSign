import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})

export class CompanyDetailComponent implements OnInit {
  company: any;
  companyId: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.params['id'];
    this.apiService.getData(`companies/${this.companyId}`).subscribe(
      (data) => {
        this.company = data;
      },
      (error) => {
        console.error('Erro ao buscar detalhes da empresa:', error);
      }
    );
  }

  // Método para editar a empresa
  editCompany(): void {
    this.router.navigate(['/companies', this.companyId, 'edit']);
  }

  // Método para excluir a empresa
  deleteCompany(): void {
    if (confirm('Tem certeza que deseja excluir esta empresa?')) {
      this.apiService.deleteData(`companies/${this.companyId}/`).subscribe(
        () => {
          console.log('Empresa excluída com sucesso.');
          this.router.navigate(['/companies']);
        },
        (error) => {
          console.log('Erro ao excluir empresa:', error);
        }
      );
    }
  }
}
