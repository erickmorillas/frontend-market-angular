import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';

import { ProductsService } from "../../services/product.service"
import { NotificationService } from "../../services/notification.service"

import { Product } from "../../models/product"

import { ProductComponent } from "../product/product.component";

@Component({
    selector: 'app-homee',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    displayedColumns: string[] = ['id', 'sku', 'title', 'handle', 'price', 'actions'];
    listData: [Product] | any;
    searchKey: string | any;

    @ViewChild(MatPaginator) paginator: MatPaginator | any;
    @ViewChild(MatSort) sort: MatSort | any;

    constructor(
        private productsService: ProductsService,
        private dialog: MatDialog,
        private notificationService: NotificationService
    ) { };

    ngOnInit() {
        this.fetchProduct()
    }

    fetchProduct() {
        this.productsService.getAllProducts$().subscribe((producto: any) => {
            this.listData = new MatTableDataSource(producto);
            this.listData.paginator = this.sort;
            this.listData.paginator = this.paginator;
        });
    }

    applyFilter() {
        this.listData.filter = this.searchKey.toLowerCase();
    }

    onCreate() {
        this.productsService.initializeFormGroup();
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "60%";
        this.dialog.open(ProductComponent, dialogConfig);
    }

    onEdit(row: any) {
        this.productsService.getProduct(row.id)
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "60%";
        this.dialog.open(ProductComponent, dialogConfig);
    }

    onDelete(id: any) {
        if (confirm('Are you sure to delete this record ?')) {
            this.productsService.deleteProduct(id);
            this.notificationService.warn('Deleted successfully');
        }
    }

}