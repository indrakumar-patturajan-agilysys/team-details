import { Component, signal } from '@angular/core';
import { MainLayout } from './features/layout/main-layout/main-layout';

@Component({
  selector: 'app-root',
  imports: [MainLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('team-details');
}
