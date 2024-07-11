import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function CompleteWorkout({workout, status, fetchData}) {


    const completeWorkout = (workoutId) => {

        fetch(`https://fitness-tracker-ep6x.onrender.com/workouts/completeWorkoutStatus/${workoutId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {

            // console.log(data)

            if(data.message === "Workout status updated successfully") {

                Swal.fire({
                    title: 'Congratulations!',
                    icon: 'success',
                    text: 'Workout Completed'
                })

                fetchData();

            }else {

                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'error',
                    text: 'Please try again'
                })

                fetchData();
            }
        })
    }

    return (
        <>
            {
                status === 'completed' ?
                    <span/>
                :
                    <Button variant="success" size="sm" onClick={() => completeWorkout(workout)}>Mark as Complete</Button>
            }
        </>
    )
}
