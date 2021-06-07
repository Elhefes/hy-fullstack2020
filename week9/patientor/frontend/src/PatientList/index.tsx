import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import React, { useEffect } from 'react';
import axios from 'axios';
import { useStateValue, setPatient } from "../state";

const PatientList: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const [{ patients }, dispatch] = useStateValue();
  const url = `${apiBaseUrl}/patients/${id}`

  useEffect(() => {
    const getPatient = async () => {
      const { data: fetchedPatient } = await axios.get(url);
      console.log(fetchedPatient)
      dispatch(setPatient(fetchedPatient));
    }

    if (patients[id]?.entries === undefined) {
      getPatient();
    }
  }, []);

  if (patients[id]) {
    return (
      <div>
        <h2>{patients[id].name}</h2>
        <h4>ssn: {patients[id].ssn}</h4>
        <h4>occupation: {patients[id].occupation}</h4>
        <h3>Entries</h3>
  
        {patients[id].entries?.map(entry => (
          <div>
            <p>{entry.date} {entry.description}</p>
            <ul>
              {entry.diagnosisCodes &&
               <ul>
               {entry.diagnosisCodes.map((code) => (
                 <li key={code}>{code}</li>
               ))}
             </ul>}
            </ul>
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export default PatientList;