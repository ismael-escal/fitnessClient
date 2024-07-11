import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register() {

	const {user} = useContext(UserContext);

	const navigate = useNavigate();

	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

    const [isActive, setIsActive] = useState(false);
    
    function registerUser(e) {

		e.preventDefault();

		fetch('https://fitness-tracker-ep6x.onrender.com/users/register',{

		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({

			email: email,
			password: password

		})
		})
		.then(res => res.json())
		.then(data => {

			//determine the returned data. Especially useful when the given API is online.
			//console.log(data);

			//data will only contain an email property if we can properly save our user.
			if(data.message === "Registered Successfully"){

				setEmail('');
				setPassword('');
				setConfirmPassword('');

				Swal.fire({
	        	    title: "Registration Successful",
	        	    icon: "success",
	        	    text: "Thank you for registering!"
	        	});

	        	navigate("/login");
			} else if (data.error === 'Email invalid') {

				Swal.fire({
	                    title: 'Invalid Email Format',
	                    icon: 'error',
	                    text: 'Please enter a valid email address.'
	                })
			} else if (data.error === 'Password must be atleast 8 characters') {

				Swal.fire({
	                    title: 'Password must be atleast 8 characters long',
	                    icon: 'error',
	                    text: 'Please enter a valid password.'
	                })
			} else {

				Swal.fire({
                    title: 'Something went wrong',
                    icon: 'error',
                    text: 'Please try again.'
                })
			}

		})
	}

	useEffect(()=>{

        if((email !== "" && password !=="" && confirmPassword !=="") && (password === confirmPassword)){

          setIsActive(true)

        } else {

          setIsActive(false)

        }


	},[email,password,confirmPassword])
    

	return (
		user.id !== null ?
            <Navigate to="/login" />
        :
			<div className="d-flex justify-content-center align-items-center my-5">
	            <div className="border p-4 rounded bg-light" style={{ width: '500px' }}>
			        <Form onSubmit={(e) => registerUser(e)}>
			        <h1 className="my-5 text-center">Register</h1>
			            <Form.Group>
			                <Form.Label>Email:</Form.Label>
			                <Form.Control 
			                type="email"
			                placeholder="Enter Email" 
			                required 
			                value={email} 
			                onChange={e => {setEmail(e.target.value)}}/>
			            </Form.Group>
			            <Form.Group>
			                <Form.Label>Password:</Form.Label>
			                <Form.Control 
			                type="password" 
			                placeholder="Enter Password" 
			                required 
			                value={password} 
			                onChange={e => {setPassword(e.target.value)}}/>
			            </Form.Group>
			            <Form.Group>
			                <Form.Label>Confirm Password:</Form.Label>
			                <Form.Control 
			                type="password" 
			                placeholder="Confirm Password" 
			                required 
			                value={confirmPassword} 
			                onChange={e => {setConfirmPassword(e.target.value)}}/>
			            </Form.Group>
			            {
			                isActive

			                ? <Button variant="primary" type="submit" className='my-5 w-100'>Submit</Button>
			                : <Button variant="danger" className='my-5 w-100' disabled>Submit</Button>
			            }
			        </Form>
			    </div>
			</div>
		
		)
}