import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "https://guzman-music-share.hasura.app/v1/graphql",
        headers: {
            "x-hasura-admin-secret": "M2tCYl0MBFaLE6TynuXG7BdqUNaWx8Evbk73FokXoFqz0fBezhevQj3le4tvaPMe"
        }
    }),
    cache: new InMemoryCache()
});

export default client;