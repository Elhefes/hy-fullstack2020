export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

//eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  entries: Entry[];
  occupation: string;
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>
export type NonSensitivePatients = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id' | 'entries'>

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}