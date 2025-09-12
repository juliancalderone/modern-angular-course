import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CategoryFilterComponent } from '@features/categories/category-filter/category-filter.component';
import { FooterComponent } from '@layout/footer/footer.component';
import { HeaderComponent } from '@layout/header/header.component';
import HeroComponent from '@layout/hero/hero.component';
import { SpinnerComponent } from '@shared/ui/spinner/spinner.component';
import { CartStateService } from '@store/cart-state/cart-state.service';
import { filter } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HeroComponent,
    CategoryFilterComponent,
    SpinnerComponent,
    FooterComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currentRoute = '';
  readonly cartStore = inject(CartStateService).cartStore;

  private readonly _router = inject(Router);

  constructor() {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects.slice(1);
      });
  }
}
