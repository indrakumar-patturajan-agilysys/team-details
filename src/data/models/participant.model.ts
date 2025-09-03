export interface Participant {
  id: string;
  name: string;
  email: string;
  whatsApp?: string;
  linkedIn?: string;
  gitHub?: string;
  created: Date;
}

export interface CreateParticipantRequest {
  name: string;
  email: string;
  whatsApp?: string;
  linkedIn?: string;
  gitHub?: string;
}
