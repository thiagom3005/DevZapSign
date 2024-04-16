import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companies: any[] = [];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.apiService.getData('companies').subscribe(
      (data) => {
        this.companies = data;
      },
      (error) => {
        console.error('Erro ao buscar empresas:', error);
      }
    );
  }

  viewCompanyDetails(companyId: number): void {
    this.router.navigate(['/companies', companyId]);
  }

  editCompany(companyId: number): void {
    this.router.navigate(['/companies', companyId, 'edit']);
  }

  deleteCompany(companyId: number): void {
    if (confirm('Tem certeza que deseja excluir esta empresa?')) {
      this.apiService.deleteData(`companies/${companyId}`).subscribe(
        () => {
          this.loadCompanies();
        },
        (error) => {
          console.error('Erro ao excluir empresa:', error);
        }
      );
    }
  }

  createCompany(): void {
    this.router.navigate(['/companies/new']);
  }
}
