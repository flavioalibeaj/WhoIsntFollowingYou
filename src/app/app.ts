import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from './components/toolbar/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar],
  template: `
    <wify-toolbar />
    <router-outlet />
  `,
})
export class App {}
