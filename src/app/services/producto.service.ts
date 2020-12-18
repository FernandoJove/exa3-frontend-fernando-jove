import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private httpHeaders = new HttpHeaders({ 'Content-Type':'application/json'});
  private prodUrl:string = 'http://localhost:8080/producto/';
  constructor(private http: HttpClient, private router:Router,private authService: AuthService) { }


  private addAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }


  private isNoAutorization(e): boolean{
    if(e.status==401 || e.status==403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  getProductos():Observable<any>{
    return this.http.get(this.prodUrl,{headers:this.addAuthorizationHeader()}).pipe(
      catchError(e =>{
        this.isNoAutorization(e);
        return throwError(e);
      })
    );
  }
  
  getProductosbyNom(nomprod:String):Observable<any>{
  
    return this.http.get(this.prodUrl+'/'+nomprod,{headers:this.addAuthorizationHeader()}).pipe(
      catchError(e =>{
        this.isNoAutorization(e);
        return throwError(e);
      })
      
    );
  }


/*
  getProductoById(id:number):Observable<any> {
    return this.http.get(this.prodUrl+'/'+id,{headers:this.addAuthorizationHeader()}).pipe(
      catchError(e =>{
        this.router.navigate(['/roles']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
      })
    );
  }
  */
/*

  addProd(pro: Producto): Observable<number>{

    console.log(pro)
    return this.http.post<number>(this.prodUrl, pro, {headers:this.addAuthorizationHeader()}).pipe(
      map((response:any) =>response),

      
      catchError(e =>{
        if(this.isNoAutorization(e)){
          console.log(pro)
        return throwError(e)
        }
        if(e.status == 400){
          console.log(pro);
          return throwError(e);
          
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        console.log(pro)
        return throwError(e);
      })
      );
      
  }

  deleteRol(id: number): Observable<number>{
    return this.http.delete<number>(this.prodUrl+"/delete/"+id ,{headers:this.addAuthorizationHeader()}).pipe(
    catchError(e =>{
      if(this.isNoAutorization(e)){
      return throwError(e)
      }
      console.error(e.error.mensaje);
      Swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
    );
  }

  updateRol(prod: producto):Observable<number> {
    return this.http.put<number>(`${this.prodUrl}/update/${rol.idrol}`, rol,{headers:this.addAuthorizationHeader()}).pipe(
      map((response:any) =>response),
      catchError(e =>{
        if(this.isNoAutorization(e)){
        return throwError(e)
        }
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }*/
}
