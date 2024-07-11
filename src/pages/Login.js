import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {

	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isActive, setIsActive] = useState(true);
    
    function authenticate(e) {

            // Prevents page redirection via form submission
            e.preventDefault();
            fetch('https://fitness-tracker-ep6x.onrender.com/users/login',{

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

                //console.log(data);

                if(typeof data.access !== "undefined"){

	                localStorage.setItem('token', data.access);
	                retrieveUserDetails(data.access);

	                Swal.fire({
	                    title: "Login Successful",
	                    icon: "success",
	                    text: "Welcome to Fitness Tracker App!"
	                });
	                setEmail('');
			    	setPassword('');
            	} else if (data.error === "No Email Found") {

	                Swal.fire({
	                    title: 'Email not found',
	                    icon: 'error',
	                    text: 'Email does not exist.'
	                })

		        } else if (data.error === "Email and password do not match") {

	                Swal.fire({
	                    title: 'Incorrect Email or Password',
	                    icon: 'error',
	                    text: 'Check your login details and try again.'
	                })

		        } else {

	                Swal.fire({
	                    title: 'Something went wrong',
	                    icon: 'error',
	                    text: 'Check your login details and try again.'
	                })
		        }
            
        })

        }

        const retrieveUserDetails = (token) => {
            
            fetch('https://fitness-tracker-ep6x.onrender.com/users/details', {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            .then(res => res.json())
            .then(data => {

                setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
                });

            })

        };

    useEffect(() => {

        if(email !== "" && password !==""){

			setIsActive(true)

		} else {

			setIsActive(false)

		}

    }, [email, password]);

    return (

    	user.id !== null ?
            <Navigate to="/" />
        :
	    	<div className="d-flex justify-content-center align-items-center my-5">
                <div className="border p-4 rounded bg-light" style={{ width: '500px' }}>
			        <Form onSubmit={(e) => authenticate(e)}>
			            <h1 className="my-5 text-center">Login</h1>
			            <Form.Group controlId="userEmail">
			                <Form.Label>Email address</Form.Label>
			                <Form.Control 
			                    type="text"
			                    placeholder="Enter email"
			                    value={email}
			                    onChange={(e) => setEmail(e.target.value)}
			                    required
			                />
			            </Form.Group>

			            <Form.Group controlId="password">
			                <Form.Label>Password</Form.Label>
			                <Form.Control 
			                    type="password" 
			                    placeholder="Password"
			                    value={password}
			                    onChange={(e) => setPassword(e.target.value)}
			                    required
			                />
			            </Form.Group>

			                { isActive ? 
			                <Button variant="primary" type="submit" id="submitBtn" className='my-5 w-100'>
			                    Submit
			                </Button>
			                : 
			                <Button variant="danger" type="submit" id="submitBtn" className='my-5 w-100' disabled>
			                    Submit
			                </Button>
			            }
			        </Form>
			    </div>
			</div>
    )
}