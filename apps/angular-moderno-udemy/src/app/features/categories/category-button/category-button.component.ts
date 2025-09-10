import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-button.component.html',
  styleUrl: './category-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryButtonComponent {
  category = input.required<string>();
  filterCategory = model.required<string>();
  handleClick() {
    this.filterCategory.set(this.category());
  }
}
