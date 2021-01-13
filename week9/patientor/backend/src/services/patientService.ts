import patientData from '../../data/patients'
import { Patient, NonSensitivePatients } from '../types';

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

export default {
  getPatients,
  getNonSensitivePatients
};