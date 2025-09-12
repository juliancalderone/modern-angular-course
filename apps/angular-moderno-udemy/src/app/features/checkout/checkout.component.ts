import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CheckoutService } from '@features/checkout/checkout.service';

import { RemoveProductComponent } from '@shared/ui/remove/remove-product.component';
import { CartStateService } from '@store/cart-state/cart-state.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RemoveProductComponent, SlicePipe, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export default class CheckoutComponent {
  readonly cartService = inject(CartStateService);
  cartStore = this.cartService.cartStore;

  private readonly _checkoutSvc = inject(CheckoutService);

  onProceedToPay(): void {
    this._checkoutSvc.processPay(this.cartStore);
  }

  clearAll(): void {
    this.cartService.clearCart();
  }

  onRemoveProduct(productId: number) {
    console.log(productId);
  }
}
