import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

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

app.get('/exercises', (req, res) => {
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
  } else if (!Array.isArray(daily_exercises) || daily_exercises.some(isNaN) || isNaN(Number(target))) {
    res.status(400).send({ error: 'malformatted parameters' });
  } else {
    res.json(exerciseCalculator(target, daily_exercises));
  }
  

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});