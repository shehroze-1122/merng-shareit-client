import { ApolloClient, createHttpLink , InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({uri: 'http://localhost:5000/'})
const cache = new InMemoryCache();

const client = new ApolloClient({
    link: httpLink,
    cache
})

export default client;
