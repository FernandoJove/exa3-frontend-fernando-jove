import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
lista_:any;
selected:any;
count:number = 0;
  constructor(private _producto:ProductoService, public carrito_:CarritoService) { }

  ngOnInit() {
    console.log(this.carrito_.carrito_items)
    this.listProducts();
  }
  clear(){
    localStorage.clear();
    this.carrito_.carrito_items = []
  }

  selectChanged(event:any){
  this.selected = event.target.value;
  console.log(this.selected)
  this.SaveProduct(this.selected);
  }
  listProducts(){
    this._producto.getProductos().subscribe((data) =>{
      this.lista_ = data;
    });
  }
  getProds(nomprod){
    this._producto.getProductosbyNom(nomprod);
  }
  SaveProduct(item){
console.log("hola")
 
    console.log(item)

   let prod = {...item,cantidad:this.count}
   this.carrito_.saveLS(prod);
   console.log(this.carrito_)
   this.count=0
   
  }

}
