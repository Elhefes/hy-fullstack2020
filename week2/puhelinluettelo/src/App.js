import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true);
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
        console.log(response.data)
      })
  }, [])

  const deleteNumber = (name, id) => {
    const person = persons.find(n => n.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(setPersons(persons.filter(n => n.id !== id)));
    }
  };

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find(n => n.name === newName)

    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace
                                        the old number with a new one?`)) {

        const changedNumber = {...person, number: newNumber}
        personService
          .update(person.id, changedNumber)
          .then(returnedName => {
            setPersons(persons.map(name => name.id !== person.id ? name : returnedName))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
      })

      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setShowAll(false)
    setFilterName(event.target.value)
  }

  const numbersToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterName))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Numbers numbersToShow={numbersToShow} deleteNumber={deleteNumber} />
    </div>
  )

}

const Filter = (props) => {
  return (
    <div>
      filter shown with
      <input
        value={props.filterName}
        onChange={props.handleFilterChange}
      />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name:
          <input
          value={props.newName}
          onChange={props.handleNameChange}
        />
      </div>
      <div>
        number:
          <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Numbers = (props) => {
  return (
    props.numbersToShow.map((person, i) =>
      <ul key={person.name}>
        <ul> {person.name} {person.number}
          <button onClick={() => props.deleteNumber(person.name, person.id)}>
            delete
        </button>
        </ul>
      </ul>
    )
  )
}

export default App