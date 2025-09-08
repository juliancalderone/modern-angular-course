import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '@features/products/product.interface';
import { ToastrService } from 'ngx-toastr';
import { CartCalculatorService } from 'src/app/store/cart-state/cart-calculator.service';

export interface CartStore {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}

export const initialCartState: CartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0,
};

@Injectable({ providedIn: 'root' })
export class CartStateService {
  private readonly _cartCalculatorService = inject(CartCalculatorService);
  private readonly _toastrService = inject(ToastrService);

  private readonly _products = signal<Product[]>([]);

  private readonly _totalAmount = computed(() =>
    this._cartCalculatorService.calculateTotal(this._products())
  );
  private readonly _productsCount = computed(() =>
    this._cartCalculatorService.calculateItemsCount(this._products())
  );

  readonly cartStore = computed<CartStore>(() => ({
    products: this._products(),
    totalAmount: this._totalAmount(),
    productsCount: this._productsCount(),
  }));

  addToCart(product: Product): void {
    const currentProducts = this._products();
    const existingProductIndex = currentProducts.findIndex(
      (p) => p.id === product.id
    );
    if (existingProductIndex >= 0) {
      currentProducts[existingProductIndex] = {
        ...product,
        quantity: (currentProducts[existingProductIndex].quantity || 0) + 1,
      };
      this._products.set(currentProducts);
    } else {
      this._products.update((products: Product[]) => [
        ...products,
        { ...product, quantity: 1 },
      ]);
    }
    this._toastrService.success('Product added!!', 'DOMINI STORE');
  }

  removeFromCart(productId: number): void {
    try {
      if (!productId) throw new Error('Invalid product ID');
      const currentProducts = this._products();
      const productExists = currentProducts.some(
        (product: Product) => product.id === productId
      );

      if (!productExists) {
        this._toastrService.error('Product not found in cart', 'DOMINI STORE');
      }

      this._products.update((products: Product[]) =>
        products.filter((product: Product) => product.id !== productId)
      );
      this._toastrService.success('Product removed!', 'DOMINI STORE');
    } catch (error) {
      console.error('Error removing product from cart:', error);
      this._toastrService.error(
        'An error occurred while removing the product',
        'DOMINI STORE'
      );
    }
  }

  clearCart(): void {
    this._products.set([]);
    this._toastrService.success('All Products removed!', 'DOMINI STORE');
  }
}
