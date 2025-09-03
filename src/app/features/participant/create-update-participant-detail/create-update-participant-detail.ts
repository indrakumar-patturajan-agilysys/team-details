import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ParticipantService } from '../services/participant.service';
import { CreateParticipantRequest } from '../../../../data/models/participant.model';

@Component({
  selector: 'app-create-update-participant-detail',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-update-participant-detail.html',
  styleUrl: './create-update-participant-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUpdateParticipantDetail implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private participantService = inject(ParticipantService);

  protected readonly participantForm: FormGroup;
  protected readonly loading = signal(false);
  protected readonly isEditMode = signal(false);
  protected readonly participantId = signal<string | null>(null);

  constructor() {
    this.participantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      whatsApp: ['', [Validators.pattern(/^\+?[\d\s\-()]+$/)]],
      linkedIn: ['', [Validators.pattern(/^https?:\/\/(www\.)?linkedin\.com\/in\/[\w\-]+\/?$/)]],
      gitHub: ['', [Validators.pattern(/^https?:\/\/(www\.)?github\.com\/[\w\-]+\/?$/)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.participantId.set(id);
      this.loadParticipant(id);
    }
  }

  private loadParticipant(id: string): void {
    this.loading.set(true);
    this.participantService.getParticipant(id).subscribe({
      next: (participant) => {
        if (participant) {
          this.participantForm.patchValue({
            name: participant.name,
            email: participant.email,
            whatsApp: participant.whatsApp || '',
            linkedIn: participant.linkedIn || '',
            gitHub: participant.gitHub || ''
          });
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.router.navigate(['/participants']);
      }
    });
  }

  onSubmit(): void {
    if (this.participantForm.valid) {
      this.loading.set(true);
      const formValue = this.participantForm.value as CreateParticipantRequest;

      const operation = this.isEditMode() 
        ? this.participantService.updateParticipant(this.participantId()!, formValue)
        : this.participantService.createParticipant(formValue);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/participants']);
        },
        error: () => {
          this.loading.set(false);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.participantForm.controls).forEach(key => {
      const control = this.participantForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.participantForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.participantForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['pattern']) {
        switch (fieldName) {
          case 'whatsApp': return 'Please enter a valid phone number';
          case 'linkedIn': return 'Please enter a valid LinkedIn URL';
          case 'gitHub': return 'Please enter a valid GitHub URL';
          default: return 'Invalid format';
        }
      }
    }
    return '';
  }

  cancel(): void {
    this.router.navigate(['/participants']);
  }
}
