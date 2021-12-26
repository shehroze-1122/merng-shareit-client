import { ApolloClient, createHttpLink , InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'


const httpLink = createHttpLink({uri: 'https://merng-shareit-server.herokuapp.com/'})
const cache = new InMemoryCache();
const authLink = setContext(()=>{
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            authorization: token? `Bearer ${token}`:''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache
})

export default client;
