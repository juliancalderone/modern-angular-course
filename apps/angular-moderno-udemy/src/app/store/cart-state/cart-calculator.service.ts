import { Injectable } from '@angular/core';

export interface CartItem {
  price: number | string;
  quantity?: number;
}

@Injectable({ providedIn: 'root' })
export class CartCalculatorService {
  calculateTotal<T extends CartItem>(items: T[]): number {
    return items.reduce(
      (total, item) => total + Number(item.price) * (item.quantity || 1),
      0
    );
  }

  calculateItemsCount<T extends CartItem>(items: T[]): number {
    return items.reduce((count, item) => count + (item.quantity || 1), 0);
  }
}
