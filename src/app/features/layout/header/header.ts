import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface BrandInfo {
  organizationName: string;
  logo: {
    title: string;
    favicon: string;
  };
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  protected readonly isSidenavOpen = signal(false);
  protected readonly activeMenu = signal('dashboard');
  protected readonly brandInfo = signal<BrandInfo>({
    organizationName: 'HERE AND NOW AI',
    logo: {
      title: 'https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/logo-of-here-and-now-ai.png',
      favicon: 'https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/favicon-logo-with-name.png'
    }
  });

  toggleSidenav(): void {
    this.isSidenavOpen.update(isOpen => !isOpen);
  }

  setActiveMenu(menu: string): void {
    this.activeMenu.set(menu);
    this.isSidenavOpen.set(false);
  }

  closeSidenav(): void {
    this.isSidenavOpen.set(false);
  }
}
