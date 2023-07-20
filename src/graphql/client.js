import { ApolloClient, HttpLink, InMemoryCache, gql, split } from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from "@apollo/client/utilities";
import { GET_QUEUED_SONGS } from "./queries";

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
    cache: new InMemoryCache({
        typePolicies: {
            Song: {
              fields: {
                // Ignore the 'duration' field in the cache
                duration: {
                  read() {
                    return null; // Return null to ignore the field in the cache
                  },
                },
              },
            },
          },
    }),
    typeDefs: gql`
        type Song {
            id: uuid!,
            title: String!,
            artist: String!,
            thumbnail: String!,
            duration: Float!,
            url: String!
        }

        input SongInput {
            id: uuid!,
            title: String!,
            artist: String!,
            thumbnail: String!,
            duration: Float!,
            url: String!
        }

        type Query {
            queue: [Song]!
        }

        type Mutation {
            addOrRemoveFromQueue(input: SongInput!): [Song]!
        }
    
    `,

    resolvers: {
        Mutation: {
            addOrRemoveFromQueue: (_, { input }, { cache }) => {
                const queryResult = cache.readQuery({
                    query: GET_QUEUED_SONGS,
                });
                if(queryResult) {
                    const { queue } = queryResult
                    const isInQueue = queue.some(song => song.id === input.id);
                    const newQueue = isInQueue ? queue.filter(song => song.id !== input.id) :
                    [...queue, input]

                    cache.writeQuery({
                        query: GET_QUEUED_SONGS,
                        data: { queue: newQueue }
                    })
                    // console.log(newQueue)
                    return newQueue;
                }
                return []
            }
        }
    }
})

const hasQueue = Boolean(localStorage.getItem('queue'))

client.writeQuery({
    query: GET_QUEUED_SONGS
    ,
    data: {
        queue: hasQueue ? JSON.parse(localStorage.getItem('queue')) : []
    }
})



export default client;