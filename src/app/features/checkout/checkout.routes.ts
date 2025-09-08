import { Route } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./checkout.component'),
  },
];

export default routes;
