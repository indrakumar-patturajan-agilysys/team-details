import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ParticipantService } from '../services/participant.service';
import { Participant } from '../../../../data/models/participant.model';

@Component({
  selector: 'app-participant-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './participant-list.html',
  styleUrl: './participant-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParticipantList implements OnInit {
  private participantService = inject(ParticipantService);
  
  protected readonly participants = signal<Participant[]>([]);
  protected readonly loading = signal(true);
  protected readonly sortBy = signal<keyof Participant>('name');
  protected readonly sortDirection = signal<'asc' | 'desc'>('asc');
  protected readonly currentPage = signal(1);
  protected readonly itemsPerPage = signal(10);

  ngOnInit(): void {
    this.loadParticipants();
  }

  private loadParticipants(): void {
    this.loading.set(true);
    this.participantService.getParticipants().subscribe({
      next: (participants) => {
        this.participants.set(participants);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  sort(column: keyof Participant): void {
    if (this.sortBy() === column) {
      this.sortDirection.update(dir => dir === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortBy.set(column);
      this.sortDirection.set('asc');
    }
  }

  getSortedParticipants(): Participant[] {
    const sorted = [...this.participants()].sort((a, b) => {
      const aValue = a[this.sortBy()];
      const bValue = b[this.sortBy()];
      
      let comparison = 0;
      if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      }
      
      return this.sortDirection() === 'asc' ? comparison : -comparison;
    });

    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    return sorted.slice(startIndex, startIndex + this.itemsPerPage());
  }

  getTotalPages(): number {
    return Math.ceil(this.participants().length / this.itemsPerPage());
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage.set(page);
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString();
  }

  deleteParticipant(id: string): void {
    if (confirm('Are you sure you want to delete this participant?')) {
      this.participantService.deleteParticipant(id).subscribe({
        next: () => {
          this.loadParticipants();
        }
      });
    }
  }

  formatWhatsAppUrl(whatsApp: string): string {
    const cleanNumber = whatsApp.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}`;
  }
}
