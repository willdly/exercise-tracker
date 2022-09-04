import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if(response.status === 201){
            alert("Successfully added exercise.")
        } else{
            alert("Failed to add exercise. Please try again.");
            console.error(`Failed to add movie, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Exercise Name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Rep count"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Weight"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select onChange={e => setUnit(e.target.value)}>
                <option value='' disabled selected>Unit</option>
                <option value='lbs'>lbs</option>
                <option value='kgs'>kgs</option>
            </select>
            <input
                type="text"
                placeholder="MM-DD-YY"
                value={date}
                onChange={e => setDate(e.target.value)} />    
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;