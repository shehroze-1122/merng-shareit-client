import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { Button, Confirm, Popup } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../pages/Home'

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }

`

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($deleteCommentInput: DeleteInput!){
    deleteComment(deleteCommentInput: $deleteCommentInput) {
        id
        username
        comments {
        id
        username
        }
        commentsCount
    }
    }

`
const Delete = ({postId, commentId, callback}) => {

    const [ modalOpen, setModelOpen ] = useState(false);

    const mutation = commentId? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION; 

    const [ deleteCommentOrPost ] = useMutation(mutation, {

        update: (cache)=>{
            if(!commentId){
                const { getPosts: posts } = cache.readQuery({ query: FETCH_POSTS_QUERY });
                cache.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: posts.filter((post)=>post.id !== postId) }})
                setModelOpen(false);
                if(callback) callback();
            }
        }
    })

    const onConfirm = () =>{
        deleteCommentOrPost({
            variables:{
                postId,
                deleteCommentInput: {
                    postId,
                    commentId
                }
            }
        })
    }

    const component = commentId?'comment':'post'

    return (
        <>
            <Popup
            inverted
            content={`Delete ${component}`}
            trigger={

                <Button
                    color='red'
                    icon='trash'
                    size='medium'
                    onClick={()=>setModelOpen(true)}
                    floated='right'
                    style={{marginLeft:'auto'}}
             />
            }
            />

            <Confirm
                open={modalOpen}
                content={`Do you want to permanently delete this ${component}?`}
                onCancel={()=>setModelOpen(false)}
                onConfirm={onConfirm}
            />
        </>
        
    )
}

export default Delete
