import patientData from '../../data/patients'
import { Patient, NonSensitivePatients, Gender } from '../types';

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

const addPatient = (
  name: string, dateOfBirth: string, ssn: string, gender: Gender, occupation: string
): Patient => {

  const newPatient = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  }

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
};