import React from 'react';

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return <p>Number of exercises {courseParts.reduce((a, b) => a + b.exerciseCount, 0)}</p>
};

export default Total;