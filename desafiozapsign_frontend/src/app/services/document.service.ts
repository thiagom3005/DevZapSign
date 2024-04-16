import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = 'http://127.0.0.1:8000/api/docs/';

  constructor(private http: HttpClient) { }

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
  
  // Assina um documento por ID
  signDocument(doc: any): Observable<any> {
    console.log(doc);
    const signData = { 
      name: doc.name,
      date_limit_to_sign: doc.date_limit_to_sign,
      company: doc.company,
      created_by: doc.created_by,
      sign: true 
    };
    console.log(`${this.apiUrl}${doc.id}/`);
    return this.http.put<any>(`${this.apiUrl}${doc.id}/`, signData)
      .pipe(
        catchError(this.handleError)
      );
  }
}
