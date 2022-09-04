import React from 'react';
import Exercise from './Exercise';

function ExerciseList({ exercises, onDelete, onEdit }) {
    return (
        <table id="exercises">
            <thead>
                <tr>
                    <th>NAME</th>
                    <th>REPS</th>
                    <th>WEIGHT</th>
                    <th>UNIT</th>
                    <th>DATE</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <Exercise exercise={exercise}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default ExerciseList;
