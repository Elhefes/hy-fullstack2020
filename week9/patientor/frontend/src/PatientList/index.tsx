import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import React, { useEffect } from 'react';
import axios from 'axios';
import { useStateValue, setPatient } from "../state";
import { Diagnosis } from "../types";

const PatientList: React.FC = () => {
  const { id } = useParams<{id: string}>()
  const [{ patients }, dispatch] = useStateValue()
  const patientUrl = `${apiBaseUrl}/patients/${id}`
  const diagnoseUrl = `${apiBaseUrl}/diagnoses/`
  const [diagnosesCodes, setDiagnosesCodes] = React.useState<Diagnosis[]>();


  useEffect(() => {
    const getPatient = async () => {
      const { data: fetchedPatient } = await axios.get(patientUrl)
      console.log(fetchedPatient)
      dispatch(setPatient(fetchedPatient))

      const fetchedCodes = await axios.get<Diagnosis[]>(diagnoseUrl)
      console.log(fetchedCodes)
      setDiagnosesCodes(fetchedCodes.data);
    }

    if (patients[id]?.entries === undefined) {
      getPatient();
    }
  }, [])

  const getDiagnosisDescription = (code: string): string => {
    if (!diagnosesCodes) return '';
    const diagnosis = diagnosesCodes.find(d => d.code === code);
    return '' + diagnosis?.name
  }

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
                 <li key={code}>{code} {getDiagnosisDescription(code)}</li>
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