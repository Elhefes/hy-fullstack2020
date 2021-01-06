interface result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const exerciseCalculator = (dailyExerciseHours: number[], targetDailyHours: number): result => {
  const totalExerciseHours = dailyExerciseHours.reduce((a, b) => a + b, 0)
  const averageTrainingHours = totalExerciseHours / dailyExerciseHours.length

  let exerciseRating: number = 1
  let exerciseRatingDescription: string = 'Could be better.'
  if (averageTrainingHours > targetDailyHours) {
    exerciseRating = 3
    exerciseRatingDescription = 'Perfect!'
  }
  else if (averageTrainingHours > targetDailyHours * (2/3)) {
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

console.log(exerciseCalculator([2, 0, 1, 2, 0, 1.2, 0.75], 1))
console.log(exerciseCalculator([2, 2, 1, 3.5, 4, 3, 2], 2))
console.log(exerciseCalculator([3, 0, 2, 0, 0, 2, 4], 3))