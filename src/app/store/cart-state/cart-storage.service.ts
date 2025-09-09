import { Injectable } from '@angular/core';
import { CartStore } from './cart-state.service';

@Injectable({
  providedIn: 'root',
})
export class CartStorageService {
  private readonly storageKey = 'cartState';

  saveState(state: CartStore): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving cart state:', error);
    }
  }

  loadState(): CartStore | null {
    try {
      const state = localStorage.getItem(this.storageKey);
      return state ? JSON.parse(state) : null;
    } catch (error) {
      console.error('Error loading cart state:', error);
      return null;
    }
  }
}
