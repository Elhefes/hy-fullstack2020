import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import React, { useEffect } from 'react';
import axios from 'axios';
import { useStateValue, setPatient } from "../state";
import { Diagnosis, Entry, Patient } from "../types";
import { Icon, Button } from 'semantic-ui-react';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal';

const PatientList: React.FC = () => {
  const { id } = useParams<{id: string}>()
  const [{ patients }, dispatch] = useStateValue()
  const patientUrl = `${apiBaseUrl}/patients/${id}`
  const diagnoseUrl = `${apiBaseUrl}/diagnoses/`
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  useEffect(() => {
    const getPatient = async () => {
      const { data: fetchedPatient } = await axios.get(patientUrl)
      console.log(fetchedPatient)
      dispatch(setPatient(fetchedPatient))

      const fetchedCodes = await axios.get<Diagnosis[]>(diagnoseUrl)
      console.log(fetchedCodes)
    }

    if (patients[id]?.entries === undefined) {
      getPatient();
    }
  }, [])

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: patient } = await axios.post<Patient>(`${patientUrl}/entries`, values);
      console.log(patient)
      dispatch({ type: "UPDATE_PATIENT", payload: patient });
      closeModal();
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  if (patients[id]) {
    return (
      <div>
        <h2>{patients[id].name}</h2>
        <h4>ssn: {patients[id].ssn}</h4>
        <h4>occupation: {patients[id].occupation}</h4>
        <h3>Entries</h3>
        {patients[id].entries?.map(entry => (
          <div key = {entry.id}>
            <EntryDetails key={entry.id} entry={entry}/>
          </div>
        ))}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add entry</Button>
      </div>
    )
  } else {
    return null
  }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <div>
          <h3>{entry.date} <Icon name="doctor" size="big"/></h3>
          <p>{entry.description}</p>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div>
          <h3>{entry.date} <Icon name="stethoscope" size="big"/></h3>
          <p>{entry.description}</p>
        </div>
      );
    case 'HealthCheck':
      const color = entry.healthCheckRating == 0 ? "green" : "yellow"
      return (
        <div>
          <h3>{entry.date} <Icon name="doctor" size="big"/></h3>
          <p>{entry.description}</p>
          <Icon
            name="heart"
            size="large"
            color={color}
          />
        </div>
      );
    default:
      return assertNever(entry);
  }
}

export default PatientList;