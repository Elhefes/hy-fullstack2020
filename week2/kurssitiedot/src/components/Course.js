import React from "react";

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
          <ul>
            {props.content.map(content => <Part name = {content.name} exercises = {content.exercises}/>)}
          </ul>
    </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.name} {props.exercises}</p>
        </div>
    )
}

const Total = (props) => {
  const total = props.content.map(part => part.exercises).reduce((s, p) => s + p);
    return (
        <div>
            <p>Yhteensä {total} tehtävää</p>
        </div>
    )
}

const Course = (props) => {
  return (
    <div>
      <Header course = {props.course.name} />
      <Content content = {props.course.parts}/>
      <Total content = {props.course.parts}/>
    </div>
  )
}

export default Course