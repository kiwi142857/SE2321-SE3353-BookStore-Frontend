import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:8080/graphql', // 本地 GraphQL 端点
    }),
    cache: new InMemoryCache(),
});

export default client;