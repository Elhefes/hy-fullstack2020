import express from 'express'
import { calculateBmi } from './bmiCalculator'
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log(req.query)
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (weight && height) {
    res.json({ 
      weight, 
      height, 
      bmi: `${calculateBmi(height, weight)}` 
    });
  } else {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});