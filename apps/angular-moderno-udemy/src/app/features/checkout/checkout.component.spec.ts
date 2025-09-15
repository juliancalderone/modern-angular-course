import { TestBed } from '@angular/core/testing';
import { CartStateService } from '@store/cart-state/cart-state.service';
import { CheckoutService } from './checkout.service';
import CheckoutComponent from './checkout.component';

// Analizar siempre que vamos a testear y vemos las dependencias
const mockStateService = {
  clearCart: jest.fn(),
  products: [],
  totalAmount: 0,
  productsCount: 0,
};

const mockCheckoutService = {
  processPay: jest.fn(),
};

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  // configurar el test
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckoutComponent],
      // inyectamos los servicios que usa el componente con mocks
      providers: [
        { provide: CartStateService, useValue: mockStateService },
        { provide: CheckoutService, useValue: mockCheckoutService },
      ],
    }).compileComponents();

    // crear la instancia del componente
    const fixture = TestBed.createComponent(CheckoutComponent);
    // obtener la instancia del componente
    component = fixture.componentInstance;

    // limpiar los mocks antes de cada test
    jest.clearAllMocks();
  });

  describe('onProceedToPay', () => {
    it('call checkout service with cart store', () => {
      component.onProceedToPay();
      expect(mockCheckoutService.processPay).toHaveBeenCalledWith(
        component.cartStore
      );
    });
  });

  describe('clearAll', () => {
    it('call cart service to clear cart', () => {
      component.clearAll();
      expect(mockStateService.clearCart).toHaveBeenCalled();
    });
  });
});
