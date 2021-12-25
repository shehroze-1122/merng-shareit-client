import React, { useContext } from 'react'
import { Dimmer, Loader, Grid } from 'semantic-ui-react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag';

import PostForm from '../components/PostForm';
import { authContext } from '../context/AuthContextProvider';
import PostCard from '../components/PostCard';

export const FETCH_POSTS_QUERY = gql`

    query fetchPosts{
        getPosts{
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
const Home = () => {
    const { data, loading, error } = useQuery(FETCH_POSTS_QUERY);

    const { user } = useContext(authContext);

    return (
        <Grid columns='three'>
            <Grid.Row >
                <h1 style={{margin:'30px auto', text:'center', fontSize:'2.3rem'}}>Recent Posts</h1>
            </Grid.Row>

            {loading?(
            <Dimmer active>
                <Loader active className='workaround' size='massive' inline='centered' content='Loading' />
            </Dimmer>):(
                <Grid.Row>
                    
                    {
                        user && (
                            <Grid.Column>
                                <PostForm />
                            </Grid.Column>
                        )
                    }
                   
                    
                   { data.getPosts.map((post)=>(
                        <Grid.Column key={post.id}>
                            <PostCard post={post}/>
                        </Grid.Column>
                   ))}
                </Grid.Row>
            )}
            
        </Grid>
    )
}

export default Home
