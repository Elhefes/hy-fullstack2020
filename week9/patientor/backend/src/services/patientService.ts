import patientData from '../../data/patients'
import { Patient, PublicPatient } from '../types';

const { v1: uuid } = require('uuid');

const getPatients = (): Array<Patient> => {
  return patientData;
};

const getNonSensitivePatients = (): PublicPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
}

const getPatient = (id: string): Patient | undefined => {
  const patient = patientData.find(p => p.id === id);
  console.log('')
  console.log(patient)
  return patient;
}

const addPatient = (obj: any): Patient => {
  const newPatient = {
    ...obj,
    id: uuid(),
  }

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatient,
};