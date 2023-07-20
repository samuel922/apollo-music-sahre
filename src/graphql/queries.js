import { gql } from "@apollo/client";

export const GET_SONGS = gql`
query getSongs {
    songs(order_by: {created_at: desc}) {
      id
      title
      artist
      thumbnail
      url
    }
  }  

`