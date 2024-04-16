import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:8000/api/'; // Substitua pela URL da sua API Django

  constructor(private http: HttpClient) { }

  // Método genérico para lidar com erros de HTTP
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      // Erro do lado do servidor
      console.error(
        `Código do erro: ${error.status}, ` +
        `Erro: ${error.error}`);
    }
    return throwError('Ocorreu um erro. Por favor, tente novamente mais tarde.');
  }

  // Método GET para buscar dados da API
  getData(endpoint: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + endpoint)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método POST para enviar dados para a API
  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + endpoint, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método PUT para atualizar dados na API
  updateData(endpoint: string, data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + endpoint, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método DELETE para excluir dados na API
  deleteData(endpoint: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + endpoint)
      .pipe(
        catchError(this.handleError)
      );
  }
}
