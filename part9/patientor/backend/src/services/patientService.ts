import patientData from '../../data/patients'
import { Patient, NonSensitivePatients } from '../types';

const { v1: uuid } = require('uuid');

const getPatients = (): Array<Patient> => {
  return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
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
};