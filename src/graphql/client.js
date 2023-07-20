import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from "@apollo/client/utilities";

const DOMAIN = "guzman-music-share.hasura.app/v1/graphql"
const ADMIN_SECRET = "M2tCYl0MBFaLE6TynuXG7BdqUNaWx8Evbk73FokXoFqz0fBezhevQj3le4tvaPMe"

const httpLink = new HttpLink({
    uri: `https://${DOMAIN}`,
    headers: {
        "x-hasura-admin-secret": `${ADMIN_SECRET}`
    }
})

const wsLink = new WebSocketLink({
    uri: `wss://${DOMAIN}`,
    options: {
        reconnect: true,
        timeout: 30000,
        connectionParams: {
            headers: {
                "x-hasura-admin-secret": `${ADMIN_SECRET}`
            }
        }
    }
})

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        )
    },
    wsLink,
    httpLink
)
const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
})

export default client;