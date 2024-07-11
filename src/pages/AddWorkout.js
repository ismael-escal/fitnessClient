import { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


export default function AddWorkout() {

	// creates context hooks to access the user context object and use its properties for user validation
    const { user } = useContext(UserContext);

    const navigate = useNavigate();


	// state hooks that will store the values of the input fields
	const [ name, setName ] = useState("");
	const [ duration, setDuration ] = useState("");
	// State hook that will determine whether the submit button is clickable or not
	const [ isActive, setIsActive ] = useState(false);


	function createWorkout(e) {

		// prevents page refresh when submitting the form
		e.preventDefault();

		fetch('https://fitness-tracker-ep6x.onrender.com/workouts/addWorkout', {
			method: "POST",
			headers: { 
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				name: name,
				duration: duration
			})
		})
		.then(res => res.json())
		.then(data => {
			//console.log(data);

			if(data.error === 'Failed to save the workout'){

				Swal.fire({
                    title: 'Unsuccessful Workout Creation',
                    icon: 'error',
                    text: 'Please try again'
                })
			} else if(data._id){

				Swal.fire({
                    title: 'Workout Added Successfully',
                    icon: 'success',
                })
                // Clear input fields after submission
				setName('');
			    setDuration('');
                navigate("/getMyWorkouts");
			} else {

				Swal.fire({
                    title: 'Unsuccessful Workout Creation.',
                    icon: 'error'
                })
			} 
		})
	};


	useEffect(() => {

		if(name !== "" && duration !== "") {

			setIsActive(true)
		} else {
			setIsActive(false)
		}

		// dependency - optional array - the useEffect runs only when there is a change in the inputs
	}, [name, duration])




	return (

		(user.id === null) ?
            <Navigate to="/" />
        :	
        	<>
        	<h1 className="my-5 text-center">Add Workout</h1>
        	<div className="d-flex justify-content-center align-items-center mb-4">
        		<Link className="btn btn-warning mx-2" to="/getMyWorkouts">Show My Workouts</Link>
	        </div>
        	<div className="d-flex justify-content-center align-items-center my-5">
                	<div className="border p-4 border-info rounded bg-light" style={{ width: '500px' }}>
				<Form onSubmit={e => createWorkout(e)}>
					{/* Two way data binding, the form saves the data to the variable and also retrieves that data from the variable*/}
				    <Form.Group>
				        <Form.Label>Workout 	Name:</Form.Label>
				        <Form.Control type="text" placeholder="Enter Workout Name" value={name} onChange={e => {setName(e.target.value)}} required/>
				    </Form.Group>

				    <Form.Group>
				        <Form.Label>Duration:</Form.Label>
				        <Form.Control type="text" placeholder="Enter Duration" value={duration} onChange={e => {setDuration(e.target.value)}} required/>
				    </Form.Group>

				    {/* Conditional Rendering of submit button based on the isActive state */}
				    {
				    	isActive ?
				    	<Button className="my-3 w-100" variant="warning" type="submit">Submit</Button>
				    	:
				    	<Button className="my-3 w-100" variant="danger" type="submit" disabled>Submit</Button>
				    }
				    
			    	</Form>
		    	</div>
    		</div> 
    		</	>
	)
}