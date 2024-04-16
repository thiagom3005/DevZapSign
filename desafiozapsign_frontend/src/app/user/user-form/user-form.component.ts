import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: any = {};
  userId: any;
  availableCompanies: any[] = [];
  isNewUser: boolean = true;

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.isNewUser = false;
      this.loadUser(this.userId);
    }

    this.loadAvailableCompanies();
  }

  formatDateToString(date: string): string {
    const formattedDate = formatDate(date, 'yyyy-MM-ddTHH:mm', 'en-US');
    return formattedDate;
  }

  loadUser(userId: string): void {
    this.apiService.getData(`users/${userId}/`).subscribe(
      (data) => {
        this.user = data;
        this.user.last_password_definition_at = this.formatDateToString(this.user.last_password_definition_at);
      },
      (error) => {
        console.error('Erro ao carregar usuário:', error);
      }
    );
  }

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

  saveUser(): void {
    const endpoint = this.isNewUser ? 'users/' : `users/${this.userId}/`;
    const requestData = { ...this.user };

    if (this.isNewUser){
      this.apiService.postData(endpoint, requestData).subscribe(
        (data) => {
          console.log('Usuário salvo com sucesso:', data);
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error(requestData);
          console.error('Erro ao salvar usuário:', error);
        }
      );
    }else{
      this.apiService.updateData(endpoint, requestData).subscribe(
        (data) => {
          console.log('Usuário salvo com sucesso:', data);
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Erro ao salvar usuário:', error);
        }
      );
    }
  }
}
