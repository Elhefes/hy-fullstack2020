import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
        return (
            <div><p>Ei yhtään palautetta annettu</p></div>
        )
    }
    return (
        <div>
            <Statistic text = "hyvä" value = {props.good}/>
            <Statistic text = "neutraali" value = {props.neutral}/>
            <Statistic text = "huono" value = {props.bad}/>
            <Statistic text = "yhteensä" value = {props.good + props.neutral + props.bad}/>
            <Statistic text = "keskiarvo" value = {(props.good + (props.bad)*-1)/(props.good
                 + props.bad + props.neutral)}/>
            <Statistic text = "positiivisia" value = {(props.good/(props.good + props.neutral 
                + props.bad)*100)}/>
            
        </div>
    )
}

const Statistic = (props) => {
    return (
        <div><p>{props.text} {props.value}</p></div>
    )
}

const Button = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
      <div>
        <button onClick= {() => setGood(good + 1)}>
            hyvä
        </button>
        <button onClick = {() => setNeutral(neutral + 1)}>
           neutraali
        </button>
        <button onClick = {() => setBad(bad + 1)}>
            huono
        </button>
        <h1>statistiikka</h1>
        <Statistics good = {good} neutral = {neutral} bad = {bad}/>
      </div>
  )

}


const App = () => {

  return (
    <div>
      <h1>anna palautetta</h1>
      <Button/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)