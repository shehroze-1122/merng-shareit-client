import React, { useState, useContext } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import {useNavigate} from 'react-router-dom';
import gql from 'graphql-tag';

import { authContext } from '../context/AuthContextProvider';
import Error from '../components/Error';

const REGISTER_USER = gql`
    mutation registerUser($registerInput: RegisterInput!){
        register(registerInput: $registerInput)
        {
            id
            username
            createdAt
            email
            token
        }
    }

`
const Register = () => {

    const [ formData, setFormData ] = useState({
        username:'',
        email:'',
        password: '',
        confirmPassword: ''
    })

    const context = useContext(authContext);

    const [ error, setError ] = useState({});

    const navigate = useNavigate();

    const [addUser, { loading }] = useMutation(REGISTER_USER, {

        update: (_, { data: { register: userData }})=>{
            context.login(userData)
            setError({});
            navigate('/')
        },
        onError:(err)=>{
            setError(err.graphQLErrors[0].extensions.errors)
        }
    })
    const onChange = (event)=>{
        setFormData({...formData, [event.target.name]:event.target.value})
    }

    const onSubmit = (event)=>{
        event.preventDefault()
        addUser({
            variables:{
                registerInput: formData
            }
        })

    }

    return (
        <Form style={{maxWidth:'400px', margin:'auto', marginTop:'80px'}} loading={loading} >
        <h1 style={{textAlign:'center', fontSize:'2.5rem', margin:'20px 0px'}}>REGISTER</h1>
          <Form.Input 
            fluid
            label='Username'
            name='username' 
            placeholder='Enter username' 
            type='text'
            onChange={onChange}
            value={formData.username}
            error={error.username? true: false} 
            size='large'
            className='input-field'   
        />

        <Form.Input 
            fluid
            label='Email'
            name='email' 
            placeholder='Enter email' 
            type='email'
            onChange={onChange}
            value={formData.email} 
            error={error.email? true: false} 
            size='large'   
            className='input-field'  
        />

        <Form.Input 

            fluid
            label='Password' 
            name='password'
            placeholder='Enter password' 
            type='password'
            onChange={onChange}
            value={formData.password}
            error={error.password? true: false}  
            size='large'   
            className='input-field'  
        />

        <Form.Input 
            fluid
            name='confirmPassword'
            label='Confirm Password' 
            placeholder='Confirm Password' 
            type='password'
            onChange={onChange}
            value={formData.confirmPassword}   
            error={error.confirmPassword? true: false}  
            size='large'
            className='input-field'  
        /> 
        <Button 
            primary
            type='submit'
            content='Register'
            onClick={onSubmit}
            size='large'
            className='submit-button'  
        /> 

        {
            Object.keys(error).length? (
                <Error error={error}/>
            ):null
        }

        </Form>
    )
}

export default Register
