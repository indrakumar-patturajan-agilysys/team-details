import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BrandInfo {
  organizationName: string;
  website: string;
  email: string;
  mobile: string;
  slogan: string;
  socialMedia: {
    blog: string;
    linkedin: string;
    instagram: string;
    github: string;
    x: string;
    youtube: string;
  };
}

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Footer {
  protected readonly currentYear = signal(new Date().getFullYear());
  protected readonly brandInfo = signal<BrandInfo>({
    organizationName: 'HERE AND NOW AI',
    website: 'https://hereandnowai.com',
    email: 'info@hereandnowai.com',
    mobile: '+91 996 296 1000',
    slogan: 'designed with passion for innovation',
    socialMedia: {
      blog: 'https://hereandnowai.com/blog',
      linkedin: 'https://www.linkedin.com/company/hereandnowai/',
      instagram: 'https://instagram.com/hereandnow_ai',
      github: 'https://github.com/hereandnowai',
      x: 'https://x.com/hereandnow_ai',
      youtube: 'https://youtube.com/@hereandnow_ai'
    }
  });
}
