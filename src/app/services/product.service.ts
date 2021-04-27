import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Product } from "../models/product";
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ProductsService {

    product: Product[] | any;
    products$: Subject<Product[]> | any;

    constructor(
        private http: HttpClient
    ) {
        this.products$ = new Subject<Product>();
        this.getAllProducts()
    }

    form: FormGroup = new FormGroup({
        id: new FormControl(null),
        handle: new FormControl('', Validators.required),
        title: new FormControl('', Validators.required),
        description: new FormControl(''),
        sku: new FormControl(''),
        grams: new FormControl(''),
        stock: new FormControl(''),
        price: new FormControl('', Validators.required),
        compare_price: new FormControl(''),
        barcode: new FormControl(''),
    });

    initializeFormGroup() {
        this.form.setValue({
            id: null,
            handle: '',
            title: '',
            description: '',
            sku: '0',
            grams: '0',
            stock: '0',
            price: '0',
            compare_price: '0',
            barcode: '0',
        });
    }

    getAllProducts() {
        this.http.get<Product[]>(`${environment.baseUrl}product`).subscribe((data: any) => {
            this.product = data.body;
            this.products$.next(data.body)
        });
    }

    getAllProducts$(): Observable<Product[]> {
        this.getAllProducts();
        return this.products$.asObservable();
    }

    getProduct(id: string) {
        return this.http.get<Product>(`${environment.baseUrl}product/${id}`).subscribe((data: any) => {
            this.form.setValue(data.body)
        });
    }

    createProduct(product: Product) {
        return this.http.post(`${environment.baseUrl}product`, product)
            .subscribe((data: any) => {
                if (data.status === 200) {
                    console.log("was added successfully");
                    this.getAllProducts()
                    this.products$.next(this.product)
                } else {
                    console.log("not added successfully");
                }
            });
    }

    updateProduct(id: string, product: Product) {
        return this.http.put(`${environment.baseUrl}product/${id}`, product)
            .subscribe((data: any) => {
                if (data.status === 200) {
                    console.log("was updated successfully");
                    this.getAllProducts()
                    this.products$.next(this.product)
                } else {
                    console.log("not updated successfully");
                }
            });
    }

    deleteProduct(id: string) {
        return this.http.delete(`${environment.baseUrl}product/${id}`)
            .subscribe((data: any) => {
                if (data.status === 200) {
                    console.log("was deleted successfully");
                    this.getAllProducts()
                    this.products$.next(this.product)
                } else {
                    console.log("not deleted successfully");
                }
            });;
    }
}
