import { Component, OnInit } from "@angular/core";
import { IProduct } from "./IProduct";
import { callbackify } from "util";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    productTitle: string = 'Product List';
    seeImage: boolean = true;

    _listFilter: string;
    errorMessage: string;

    constructor(private productService: ProductService) {
        //this.listFilter = 'cart';
    }

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    products: IProduct[];

    ngOnInit() {
        this.productService.getProducts().subscribe(
            products => {
            this.products = products,
            this.filteredProducts = this.products,
            error => this.errorMessage = <any> error
            }
        
        );
    }

    toggleImage(): void {
        this.seeImage = !this.seeImage;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    onRatingClicked(message: string): void {
        this.productTitle = 'Product List' + message;
    }
}