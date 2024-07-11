import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function DeleteWorkout({workout, fetchData}) {

	const [name, setName] = useState('');
	const [duration, setDuration] = useState('');

	const [showDelete, setShowDelete] = useState(false);

	const openDelete = (workoutId) => {


		fetch(`https://fitness-tracker-ep6x.onrender.com/workouts/getMyWorkout/${workoutId}`,{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {

			//console.log(data);

			setName(data.workout.name);
			setDuration(data.workout.duration);
		})

		setShowDelete(true);
	}

	const closeDelete = () => {

		setShowDelete(false);

		setName('');
		setDuration('');
	}

	const deleteWorkout = (e, workoutId) => {

		e.preventDefault();

		fetch(`https://fitness-tracker-ep6x.onrender.com/workouts/deleteWorkout/${workoutId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {

			if(data.message === 'Workout deleted successfully') {

				Swal.fire({
                    title: 'Deleted!',
                    icon: 'success',
                    text: 'Workout Successfully Deleted'
                })

                closeDelete();
                fetchData();

			} else {

				Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'Please try again'
                })

                closeDelete();
                fetchData();
			}
		})
	}


	return(
		<>
			<Button variant="danger" size="sm" onClick={() => openDelete(workout)}>Delete</Button>

			<Modal show={showDelete} onHide={closeDelete}>
				<Form onSubmit={e => deleteWorkout(e, workout)}>
					<Modal.Header closeButton>
						<Modal.Title>Are you sure you want to delete this workout?</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p><b>Name:</b>  {name}</p>
						<p><b>Duration:</b>  {duration}</p>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="warning" onClick={() => closeDelete()}>No</Button>
						<Button variant="danger" type="submit">Yes</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	)
}