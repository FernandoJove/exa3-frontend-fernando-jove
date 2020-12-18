import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  @Input()producto;
  lista_:any;
  constructor(private _producto:ProductoService) { }

  ngOnInit(): void {
    this.listProducts();
  }
  listProducts(){
    this._producto.getProductos().subscribe((data) =>{
      this.lista_ = data;
    });
  }
}
