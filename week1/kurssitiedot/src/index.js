import React from 'react'
import ReactDOM from 'react-dom'

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
            <Part content = {props.content[0].name} points = {props.content[0].exercises}/>
            <Part content = {props.content[1].name} points = {props.content[1].exercises}/>
            <Part content = {props.content[2].name} points = {props.content[2].exercises}/>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.content} {props.points}</p>
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>Yhteensä {props.content[0].exercises + props.content[1].exercises 
                + props.content[2].exercises} tehtävää</p>
        </div>
    )
}

const App = () => {
    const course = {
      name: 'Half Stack -sovelluskehitys',
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7
        },
        {
          name: 'Komponenttien tila',
          exercises: 14
        }
      ]
    }
    
    return (
        <div>
          <Header course = {course.name} />
          <Content content = {course.parts}/>
          <Total content = {course.parts}/>
        </div>
      )
  }

  
ReactDOM.render(<App />, document.getElementById('root'))