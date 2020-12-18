import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carrito_items = [];

  constructor() {
    let parseCarrito = JSON.parse(localStorage.getItem('carrito'))
    this. carrito_items = parseCarrito || []
  }

  getdata (){
    return this.carrito_items;
  }
  saveLS(item){    
    this.carrito_items.push(item)    
    localStorage.setItem('carrito', JSON.stringify(this.carrito_items));
  }
  
}
