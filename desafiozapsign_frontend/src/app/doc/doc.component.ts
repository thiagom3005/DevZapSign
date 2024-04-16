import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {
  documents: any[] = [];

  constructor(private apiService: ApiService, private router: Router, private documentService: DocumentService) { }

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.apiService.getData('docs').subscribe(
      (data: any) => {
        this.documents = data;
      },
      (error) => {
        console.error('Erro ao carregar documentos:', error);
      }
    );
  }

  signDocument(doc: any): void {
    this.documentService.signDocument(doc);
    this.loadDocuments();
  }

  viewDocumentDetails(docId: number): void {
    this.router.navigate(['/docs', docId]);
  }

  editDocument(docId: number): void {
    this.router.navigate(['/docs', docId,'edit']);
  }

  deleteDocument(docId: number): void {
    if (confirm('Tem certeza que deseja excluir este documento?')) {
      this.apiService.deleteData(`docs/${docId}`).subscribe(
        () => {
          console.log('Documento excluído com sucesso.');
          this.loadDocuments();
        },
        (error) => {
          console.error('Erro ao excluir documento:', error);
        }
      );
    }
  }

  createDocument(): void {
    this.router.navigate(['/docs/new']);
  }
}
