import { Observable } from 'rxjs/Observable';
import { CardapioPage } from './../../pages/cardapio/cardapio';
import { MyApp } from './../../app/app.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductProvider {
    private produtos: any;
    private AllProducts: any;
    constructor(public http: HttpClient) {
    }

    getProducts(id) {
        return Observable.create(
            observer => {
                this.http.get(MyApp.URL + "getProducts.php?id=" + id)
                    .subscribe(
                        result => {
                            if (result) {
                                this.produtos = result;
                                if (id == "") {
                                    this.AllProducts = result;
                                }
                            }
                            observer.next(result);
                            observer.complete();
                        })
            });
    }

    getList() {
        return this.produtos;
    }

    addProduct(items) {
        return Observable.create(
            observer => {
                this.http.post(MyApp.URL + 'addItems.php', items).subscribe(
                    (data) => {
                        observer.next(data);
                        observer.complete();
                    });
            }
        )

    }
}
