import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShoppingCartPageComponent } from './pages/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products'
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'products/:id',
        component: ProductDetailsComponent
    },
    {
        path: 'shopping-cart',
        component: ShoppingCartPageComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];
