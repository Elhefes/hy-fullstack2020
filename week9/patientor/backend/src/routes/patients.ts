import express from 'express';
import patientService from '../services/patientService'
import { toNewPatient } from '../utils'

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getNonSensitivePatients();
  res.send(patients);
})

router.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body);
  const patient = patientService.addPatient(newPatient);
  res.json(patient);
})

export default router;