interface result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const exerciseCalculator = (targetDailyHours: number, dailyExerciseHours: number[]): result => {
  const totalExerciseHours = dailyExerciseHours.reduce((a, b) => a + b, 0)
  const averageTrainingHours = totalExerciseHours / dailyExerciseHours.length

  let exerciseRating: number = 1
  let exerciseRatingDescription: string = 'Could be better.'
  if (averageTrainingHours >= targetDailyHours) {
    exerciseRating = 3
    exerciseRatingDescription = 'Perfect!'
  }
  else if (averageTrainingHours >= targetDailyHours * (2/3)) {
    exerciseRating = 2
    exerciseRatingDescription = 'Almost there!'
  }

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter(Number).length,
    success: averageTrainingHours >= targetDailyHours,
    rating: exerciseRating,
    ratingDescription: exerciseRatingDescription,
    target: targetDailyHours,
    average: averageTrainingHours
  }
}

interface arguments {
  targetDailyHours: number,
  dailyHours: number[]
}

const parseArguments = (args: Array<string>): arguments => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (isNaN(Number(args[2]))) {
    throw new Error('First argument is not a number')
  }

  const hourArgs = args.slice(3)
  const dailyHours: number[] = [];

  hourArgs.forEach((arg) => {
    if (isNaN(Number(arg))) {
      throw new Error('At least of the provided values is not a number!');
    }
    dailyHours.push(Number(arg))
  })

  return{
    targetDailyHours: Number(args[2]),
    dailyHours
  }
}

try {
  const { targetDailyHours, dailyHours } = parseArguments(process.argv)
  console.log(exerciseCalculator(targetDailyHours, dailyHours))
} catch (error) {
  console.log(error)
}