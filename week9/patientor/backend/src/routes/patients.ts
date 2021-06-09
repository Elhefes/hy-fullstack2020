import express from 'express';
import patientService from '../services/patientService'
import { toNewPatient } from '../utils'

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getNonSensitivePatients();
  res.send(patients);
})

router.get('/:id', (_req, res) => {
  const { id } = _req.params;
  const patient = patientService.getPatient(id)
  
  res.send(patient);
});

router.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body);
  const patient = patientService.addPatient(newPatient);
  res.json(patient);
})

router.post('/:id/entries', (req, res) => {
  switch (req.body.type) {
    case 'HealthCheck':
      if (!req.body.healthCheckRating) {
        res.status(400).json({error: 'Entry healthCheckRating not found.'}).end();
      }
      break;
    case 'OccupationalHealthcare':
      if (!req.body.employerName) {
        res.status(400).json({error: 'Entry employer name not found.'}).end();
      }
      break;
    default:
      res.status(400).json({error: 'Unsupported entry type'}).end();
      break;
  }

  const entry = patientService.addEntry(req.body, req.params.id);
  res.json(entry);
})


export default router;