import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from './product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
   baseUrl ="http://localhost:3001/products"
  constructor(private snackbar: MatSnackBar,
    private http: HttpClient) { }


  showMessage(msg: string, isError: boolean = false): void{
    this.snackbar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable <Product>{
    return this.http.post<Product>(this.baseUrl, product ).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
      ); //post você vai inserir, criar 
  }

  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
      ); // get metodo de leitura
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
      ); // get metodo lendo por ID
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
      );  // put metodo de atualização
  }

  delete(id: number): Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
      );
  }

  /*showOnConsole(msg: string): void{  // isso é criação de metodo que o parametro é uma mensagem do tipo string e o void é que retorna algo inexistente ou n especifico
    console.log(msg) 
  }*/
  errorHandler(e: any): Observable<any>{
    // console.log(e)
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY
  }
}

