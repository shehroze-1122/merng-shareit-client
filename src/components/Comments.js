import React, { useState } from 'react'
import moment from 'moment'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

import { Form, Comment, Header, Button } from 'semantic-ui-react'

import Delete from './Delete'

const ADD_COMMENT_MUTATION = gql`
    mutation addComment($commentInput: CommentInput!){
    createComment(commentInput: $commentInput) {
        id
        username
        comments {
        id
        username
        body
        }
        commentsCount
    }
}
`

const Comments = ({comments, postId, user}) => {

    const [ commentBody, setCommentBody ] = useState('');

    const [ createComment, { loading } ] = useMutation(ADD_COMMENT_MUTATION, {
        update: ()=>{
            setCommentBody('');
        }
    });

    const onChange = (event) =>{
        setCommentBody(event.target.value)
    } 

    const onSubmit = (event) =>{
        event.preventDefault()
        createComment({
            variables: {
                commentInput:{
                    postId,
                    body: commentBody
                } 
            }
        })
    }

    return (
        <Comment.Group>
            <Header as='h3' dividing>
                Comments
            </Header>
            {
                comments.length?(comments.map((comment)=>{
                    return (
                        <Comment key={comment.id}>
                                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                                <Comment.Content>
                                    <Comment.Author style={{display:'inline'}}>{comment.username}</Comment.Author>
                                    <Comment.Metadata>
                                        {moment(comment.createdAt).fromNow()}
                                    </Comment.Metadata>
                                    {
                                    user && user.username===comment.username && (
                                        <Delete commentId={comment.id} postId={postId} />
                                    )
                                }
                                    <Comment.Text>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    )
                })
            ):(
                <p>No comments found</p>
            )}
            <Form reply style={{marginTop: '30px'}} onSubmit={onSubmit} loading={loading}>
                <Form.TextArea label='Add a comment:' onChange={onChange} value={commentBody}/>
                <Button content='Comment' disabled={commentBody===''} type='submit' labelPosition='left' icon='send' primary />
            </Form>

        </Comment.Group>
    )
}

export default Comments
