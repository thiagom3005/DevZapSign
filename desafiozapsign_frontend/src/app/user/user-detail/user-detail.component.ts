import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: any;
  userId: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.apiService.getData(`users/${this.userId}/`).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.log('Erro ao carregar detalhes do usuário:', error);
      }
    );
  }

  editUser(): void {
    this.router.navigate(['/users', this.userId, 'edit']);
  }

  deleteUser(): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.apiService.deleteData(`users/${this.userId}/`).subscribe(
        () => {
          console.log('Usuário excluído com sucesso.');
          this.router.navigate(['/users']);
        },
        (error) => {
          console.log('Erro ao excluir usuário:', error);
        }
      );
    }
  }

  maskPassword(password: string): string {
    const lengthToKeepVisible = 4; // Número de caracteres visíveis no final da senha

    if (password.length <= lengthToKeepVisible) {
      return '*'.repeat(password.length); // Máscara total se a senha for muito curta
    }

    // Obter parte da senha para manter visível
    const visiblePart = password.slice(-lengthToKeepVisible);

    // Máscarar os caracteres iniciais da senha, exceto os últimos caracteres visíveis
    const maskedPart = '*'.repeat(password.length - lengthToKeepVisible);

    // Retornar a senha mascarada
    return maskedPart + visiblePart;
  }
}
