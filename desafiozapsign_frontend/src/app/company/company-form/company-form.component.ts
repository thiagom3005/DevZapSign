import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  isNewCompany: boolean = true; // Flag para indicar se é uma nova empresa ou edição
  company: any = {}; // Objeto que representa a empresa
  companyId: any;
  availableUsers: any[] = []; // Lista de usuários disponíveis para associação
  availableDocuments: any[] = []; // Lista de documentos disponíveis para associação

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id');
    
    if (this.companyId) {
      this.isNewCompany = false;
      this.loadCompany(this.companyId);
    }

    this.loadAvailableUsers();
    this.loadAvailableDocuments();
  }

  // Método para carregar dados do usuário a ser editado
  loadCompany(companyId: string): void {
    this.apiService.getData(`companies/${companyId}/`).subscribe(
      (data) => {
        this.company = data;
      },
      (error) => {
        console.error('Erro ao carregar empresa:', error);
      }
    );
  }

  // Método para carregar a lista de usuários disponíveis
  private loadAvailableUsers(): void {
    this.apiService.getData('users').subscribe(
      (data) => {
        this.availableUsers = data;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  // Método para carregar a lista de documentos disponíveis
  private loadAvailableDocuments(): void {
    this.apiService.getData('docs').subscribe(
      (data) => {
        this.availableDocuments = data;
      },
      (error) => {
        console.error('Erro ao carregar documentos:', error);
      }
    );
  }

  // Método para salvar a empresa
  saveCompany(): void {
    const endpoint = this.isNewCompany ? 'companies/' : `companies/${this.companyId}/`;
    const requestData = { ...this.company }; // Copia dos dados do usuário para enviar à API

    if (this.isNewCompany){
      this.apiService.postData(endpoint, requestData).subscribe(
        (data) => {
          console.log('Empresa salva com sucesso:', data);
          this.router.navigate(['/companies']);
        },
        (error) => {
          console.error('Erro ao salvar empresa:', error);
        }
      );
    }else
    {
      this.apiService.updateData(endpoint, requestData).subscribe(
        (data) => {
          console.log('Empresa salva com sucesso:', data);
          this.router.navigate(['/companies']);
        },
        (error) => {
          console.error('Erro ao salvar empresa:', error);
        }
      );
    }

    
  }
}
