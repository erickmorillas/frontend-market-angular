import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';

import { Product } from "../../models/product"

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  myForm: any;

  products: Product[] = [];

  constructor(private service: ProductsService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ProductComponent>) { }

  ngOnInit(): void {
    this.myForm = this.service.form;
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('id')?.value) {
        this.service.createProduct(this.service.form.value);
      } else {
        this.service.updateProduct(this.service.form.get('id')?.value, this.service.form.value);
      }

      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Submitted successfully');
      this.onClose();
    }
  }



  onClose() {
    this.dialogRef.close();
  }

}
