import { Injectable } from "@angular/core";
import { IProduct } from "./IProduct";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productUrl = 'api/products/products.json';
    constructor(private http: HttpClient){}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(tap(data => console.log('ALL:' + JSON.stringify(data))),
        catchError(this.handleError)
        );
    }

    getProduct(id: number): Observable<IProduct>{
        return this.getProducts().pipe(
            map((products: IProduct[]) => products.find(p => p.productId === id))
        );
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            errorMessage= `Oops an error occurred: ${err.message}`;
        } else {
            errorMessage = `The server returned code: ${err.status}, the error message is : ${err.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}