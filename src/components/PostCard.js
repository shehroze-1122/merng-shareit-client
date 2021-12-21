import React from 'react'
import { Image, Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const PostCard = ({post: {id, username, createdAt, body, commentsCount, likesCount}}) => {
    return (
        <Card fluid style={{marginBottom: '25px'}}>
            <Card.Content as={Link} to={`/posts/${id}`}>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>
                {body}
                </Card.Description>
            </Card.Content>

            <Card.Content extra>
                <div >
                    <Button
                    basic
                    color='green'
                    content='Like'
                    icon='heart'
                    label={{ basic: false, color: 'green', pointing: 'left', content: likesCount }}
                    size='large'
                    style={{margin:'7px 4px'}}
                    />
                    <Button
                    basic
                    color='blue'
                    content='Comment'
                    icon='comment'
                    size='large'
                    label={{ basic: false, color: 'blue', pointing: 'left', content: commentsCount }}
                    />
                </div>
            </Card.Content>
        </Card>
    )
}

export default PostCard;
