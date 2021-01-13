export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}