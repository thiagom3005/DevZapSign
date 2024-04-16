import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getData('users').subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Erro ao buscar usuários:', error);
      }
    );
  }

  viewUserDetails(userId: number): void {
    this.router.navigate(['/users', userId]);
  }

  editUser(userId: number): void {
    this.router.navigate(['/users', userId, 'edit']);
  }

  deleteUser(userId: number): void {
    this.apiService.deleteData(`users/${userId}`).subscribe(
      () => {
        this.loadUsers();
      },
      (error) => {
        console.error('Erro ao excluir usuário:', error);
      }
    );
  }

  createUser(): void {
    this.router.navigate(['/users/new']);
  }
}
