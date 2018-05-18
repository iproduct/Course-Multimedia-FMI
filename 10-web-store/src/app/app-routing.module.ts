import {RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

@NgModule({
    imports: [RouterModule.forRoot([
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/products'
    },
    {
        path: 'products',
        component: ProductListComponent
    },
    {
        path: 'products/:productId',
        component: ProductDetailComponent
    }
])],
    exports: [RouterModule]
})
export class AppRoutingModule {}
