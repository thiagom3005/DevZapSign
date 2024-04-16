import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-doc-detail',
  templateUrl: './doc-detail.component.html',
  styleUrls: ['./doc-detail.component.css']
})
export class DocDetailComponent implements OnInit {
  document: any;
  documentId: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      this.documentId = this.route.snapshot.params['id'];
      this.apiService.getData(`docs/${this.documentId}/`).subscribe(
        (data) => {
          this.document = data;
        },
        (error) => {
          console.log('Erro ao carregar detalhes do documento:', error);
        }
      );
  }

  editDocument(): void {
    this.router.navigate(['/docs', this.documentId, 'edit']);
  }

  deleteDocument(): void {
    if (confirm('Tem certeza que deseja excluir este documento?')) {
      this.apiService.deleteData(`docs/${this.documentId}/`).subscribe(
        () => {
          console.log('Documento excluído com sucesso.');
          this.router.navigate(['/docs']);
        },
        (error) => {
          console.log('Erro ao excluir documento:', error);
        }
      );
    }
  }
}
