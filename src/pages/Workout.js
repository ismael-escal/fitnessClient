import { useState, useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import EditWorkout from '../components/EditWorkout';
import DeleteWorkout from '../components/DeleteWorkout';
import CompleteWorkout from '../components/CompleteWorkout';
import UserContext from '../UserContext';

export default function Workout() {
    const { user } = useContext(UserContext);
    const [workouts, setWorkouts] = useState([]);

    const fetchData = () => {
        fetch(`https://fitness-tracker-ep6x.onrender.com/workouts/getMyWorkouts`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.workouts) {
                setWorkouts(data.workouts);
            } else {
                setWorkouts([]);
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, [user.id]);

    return(
        (user.id === null) ? 
            <Navigate to="/" /> 
        : 
            <>
                <h1 className="text-center my-4 pb-5">My Workouts</h1>
                <Table striped bordered hover responsive> 
                    <thead>
                        <tr className="text-center">
                            <th className="bg-dark text-light">Name</th>
                            <th className="bg-dark text-light">Duration</th>
                            <th className="bg-dark text-light">Status</th>
                            <th colSpan="3" className="bg-dark text-light">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        { workouts.length > 0 ? 
                            workouts.map(workout => (
                                <tr key={workout._id}>
                                    <td className="text-primary">{workout.name.toUpperCase()}</td>
                                    <td>{workout.duration}</td>
                                    <td className={workout.status === 'completed' ? "text-success" : "text-danger"}>
                                        {workout.status === 'completed' ? "Completed" : "Pending"}
                                    </td>
                                    <td><CompleteWorkout workout={workout._id} status={workout.status} fetchData={fetchData} /></td>
                                    <td><EditWorkout workout={workout._id} fetchData={fetchData} /></td> 
                                    <td><DeleteWorkout workout={workout._id} fetchData={fetchData} /></td>
                                </tr>
                            ))
                        : 
                            <tr>
                                <td colSpan="12" className="py-5 bg-secondary text-light">No workouts yet</td>
                            </tr>
                        }
                    </tbody>
                </Table>  
                <div className="my-4">
                    <Link className="btn btn-warning mx-2" to="/addWorkout">Add Workout</Link>
                </div>  
            </>
    );
}
