import { Row, Col } from 'react-bootstrap';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Home() {

    const { user } = useContext(UserContext);

	return (
		<>
        <Row className="mt-5">
            <Col className="p-4 text-center">
                <h1>Welcome To Fitness Tracker Application</h1>
                <p>Create, Update, Delete and View your Workouts</p>
                {(user.id === null) ?
                    <Link className="btn btn-warning" to={'/login'}>Login to View your Workouts</Link>
                :
                    <Link className="btn btn-warning" to={'/getMyWorkouts'}>Check your Workouts</Link>
                }
                
            </Col>
        </Row>
		</>
	)
}