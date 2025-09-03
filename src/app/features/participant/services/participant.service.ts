import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Participant, CreateParticipantRequest } from '../../../../data/models/participant.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private participants = signal<Participant[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      whatsApp: '+1234567890',
      linkedIn: 'https://linkedin.com/in/johndoe',
      gitHub: 'https://github.com/johndoe',
      created: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      whatsApp: '+0987654321',
      linkedIn: 'https://linkedin.com/in/janesmith',
      gitHub: 'https://github.com/janesmith',
      created: new Date('2024-02-10')
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      whatsApp: '+1122334455',
      linkedIn: 'https://linkedin.com/in/mikejohnson',
      gitHub: 'https://github.com/mikejohnson',
      created: new Date('2024-03-05')
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      whatsApp: '+2233445566',
      linkedIn: 'https://linkedin.com/in/sarahwilson',
      gitHub: 'https://github.com/sarahwilson',
      created: new Date('2024-03-20')
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@example.com',
      whatsApp: '+3344556677',
      linkedIn: 'https://linkedin.com/in/davidbrown',
      gitHub: 'https://github.com/davidbrown',
      created: new Date('2024-04-12')
    }
  ]);

  getParticipants(): Observable<Participant[]> {
    return of(this.participants());
  }

  getParticipant(id: string): Observable<Participant | undefined> {
    const participant = this.participants().find(p => p.id === id);
    return of(participant);
  }

  createParticipant(request: CreateParticipantRequest): Observable<Participant> {
    const newParticipant: Participant = {
      id: Date.now().toString(),
      ...request,
      created: new Date()
    };
    
    this.participants.update(participants => [...participants, newParticipant]);
    return of(newParticipant);
  }

  updateParticipant(id: string, request: CreateParticipantRequest): Observable<Participant> {
    let updatedParticipant!: Participant;
    
    this.participants.update(participants => 
      participants.map(p => {
        if (p.id === id) {
          updatedParticipant = { ...p, ...request };
          return updatedParticipant;
        }
        return p;
      })
    );
    
    return of(updatedParticipant);
  }

  deleteParticipant(id: string): Observable<boolean> {
    this.participants.update(participants => 
      participants.filter(p => p.id !== id)
    );
    return of(true);
  }
}
