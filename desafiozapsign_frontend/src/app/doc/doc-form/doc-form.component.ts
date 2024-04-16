import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-doc-form',
  templateUrl: './doc-form.component.html',
  styleUrls: ['./doc-form.component.css']
})
export class DocFormComponent implements OnInit {
  document: any = {}; // Objeto para armazenar os dados do documento
  docId: any;
  availableUsers: any[] = []; // Lista de usuários disponíveis para associação
  isNewDocument: boolean = true; // Flag para indicar se é um novo documento
  availableCompanies: any[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Verifique se há um parâmetro de ID na rota para edição
    this.docId = this.route.snapshot.params['id'];
    if (this.docId) {
      this.isNewDocument = false; // É uma edição, não um novo documento
      this.loadDocument(this.docId); // Carrega os dados do documento existente
    } else {
      // Inicializa um novo documento vazio
      this.document = {
        name: '',
        date_limit_to_sign: '',
        company: null, // ID da empresa associada
        deleted: false,
        signed: false
      };
    }

    this.loadAvailableUsers();
    this.loadAvailableCompanies();
  }

  // Método para carregar os detalhes de um documento existente
  loadDocument(docId: any): void {
    this.apiService.getData(`docs/${docId}/`).subscribe(
      (data) => {
        this.document = data;
        this.document.date_limit_to_sign = this.formatDateToString(this.document.date_limit_to_sign);
      },
      (error) => {
        console.log('Erro ao carregar detalhes do documento:', error);
      }
    );
  }  

  // Método para carregar a lista de empresas disponíveis
  loadAvailableCompanies(): void {
    this.apiService.getData('companies/').subscribe(
      (data) => {
        this.availableCompanies = data;
      },
      (error) => {
        console.error('Erro ao carregar empresas:', error);
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

  saveDocument(): void {
    console.log('chegou aqui');
    const endpoint = this.isNewDocument ? 'docs/' : `docs/${this.docId}/`;
    const requestData = { ...this.document };

    if (this.isNewDocument){
      this.apiService.postData(endpoint, requestData).subscribe(
        (data) => {
          console.log('Documento salvo com sucesso:', data);
          this.router.navigate(['/docs']);
        },
        (error) => {
          console.error('Erro ao salvar documento:', error);
        }
      );
    }else
    {
      this.apiService.updateData(endpoint, requestData).subscribe(
        (data) => {
          console.log('Documento salvo com sucesso:', data);
          this.router.navigate(['/docs']);
        },
        (error) => {
          console.error('Erro ao salvar documento:', error);
        }
      );
    }    
  }  

  formatDateToString(date: string): string {
    const formattedDate = formatDate(date, 'yyyy-MM-ddTHH:mm', 'en-US');
    return formattedDate;
  }
}
