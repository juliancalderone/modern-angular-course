import { TestBed } from '@angular/core/testing';
import { CartCalculatorService, CartItem } from './cart-calculator.service';

/* 
    - test para verificar el calculo del total, cuando los precios sean numeros
    - verificar que el metodo maneje bien los precios en string
    - verificar con cantidad por defecto el precio
    - verificar que el metodo devuelva 0 si no hay items
*/
describe('CartCalculatorService', () => {
  // no hay dependencias
  let service: CartCalculatorService;

  // antes de cada test
  beforeEach(() => {
    // aca irian las dependencias
    TestBed.configureTestingModule({});
    // obtenemos una instancia de un servicio, dentro del contexto de pruebas
    service = TestBed.inject(CartCalculatorService);
  });

  it('calculate total price correctly', () => {
    // mock de items
    const items: CartItem[] = [
      {
        price: 10,
        quantity: 2,
      },
      {
        price: '5',
        quantity: 3,
      },
      {
        price: 20,
      },
    ];

    expect(service.calculateTotal(items)).toBe(55);
  });

  it('calculate total price with default quantity', () => {
    const items: CartItem[] = [
      {
        price: 15,
      },
      {
        price: '10',
      },
    ];

    expect(service.calculateTotal(items)).toBe(25);
  });

  it('return 0 if no items', () => {
    expect(service.calculateTotal([])).toBe(0);
  });

  it('calculate total items count correctly', () => {
    const items: CartItem[] = [
      {
        price: 10,
        quantity: 4,
      },
      {
        price: '5',
        quantity: 5,
      },
      {
        price: 20,
      },
    ];

    expect(service.calculateItemsCount(items)).toBe(10);
  });

  it('calculate total items count with default quantity', () => {
    const items: CartItem[] = [
      {
        price: 15,
      },
      {
        price: '10',
      },
    ];

    expect(service.calculateItemsCount(items)).toBe(2);
  });

  it('return 0 items count if no items', () => {
    expect(service.calculateItemsCount([])).toBe(0);
  });
});
