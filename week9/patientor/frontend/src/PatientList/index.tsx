import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import React, { useEffect } from 'react';
import axios from 'axios';
import { Patient } from "../types";
import { useStateValue } from "../state";

const PatientList: React.FC = () => {
  const { id } = useParams< {id: string} >();
  const [{ patients }, dispatch] = useStateValue();

  useEffect(() => {
    const getPatient = async () => {
      const { 
        data: fetchedPatient
        } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      console.log(fetchedPatient)
      dispatch({
        type: "UPDATE_PATIENT",
        payload: fetchedPatient
      });
    }

    if (patients[id] === undefined) return;

    if (patients[id].entries === undefined) {
      getPatient();
    }
  }, []);

  if (patients[id] === undefined) return null;

  return (
    <div>
      <h2>{patients[id].name}</h2>
      <h3>ssn: {patients[id].ssn}</h3>
      <h3>occupation: {patients[id].occupation}</h3>
    </div>
  )
}

export default PatientList;