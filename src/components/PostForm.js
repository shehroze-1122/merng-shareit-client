import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { FETCH_POSTS_QUERY } from '../pages/Home';

const CREATE_POST = gql`
    mutation addNewPost($body: String!){

        createPost(body: $body) {
            id
            body
            username
            createdAt
            likesCount
            commentsCount
            likes{
                id
                username
            }
            comments{
                id 
                username
                body
                createdAt
            }
        }
    }

`


const PostForm = () => {

    const [ body, setBody ] = useState('');
    
    const [ addNewPost, { loading, error }] = useMutation(CREATE_POST, {

        update:(cache, { data: { createPost: newPost }})=>{
            
            const { getPosts: posts } = cache.readQuery({ query: FETCH_POSTS_QUERY })
            cache.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: [ newPost, ...posts]}})
        }
    })

    const onChange = (event)=>{
        setBody(event.target.value)
    }

    const onSubmit = (event)=>{
        event.preventDefault()
        addNewPost({
            variables:{
                body: body
            }
        })
        setBody('');
    }

    return (
        <Form loading={loading}>
            <h1>Create a Post</h1>

            <Form.Input 
                fluid
                name='postBody'
                placeholder='Share It!'
                onChange={onChange}
                value={body}
                size='massive'
            />

            <Button 
                primary
                type='submit'
                content='Post'
                onClick={onSubmit}
                size='large'
                className='submit-button'  
                style={{marginBottom: '20px'}}
            /> 
            {
                error && (
                <div className='ui message err-msg' style={{marginBottom:'20px'}}>
                    <p> {error.message}</p>    
                </div>
                )
            }
        
        </Form>
    )
}

export default PostForm
