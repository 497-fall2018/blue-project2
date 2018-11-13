import { GET_PLAYLISTS } from '../actions/actionTypes'

import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const get_a_playlist = gql`
query Aplaylist($activity: String) {
    aplaylist(activity: $activity) {
      activity,
      activity_src
    }
  }
`
const get_playlists = gql`
{
    playlists{
      id,
      activity,
      activity_src
    }
  }
`

export const playlists = () => (
  <Query query={get_playlists} >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.playlists.map(playlist => (
        <p key={playlist.id} value={playlist.activity}>{playlist.activity}</p>))

    }}
  </Query>
);
export const aplaylist = (activity) => (
  <Query query={get_a_playlist} variables={{ activity }} fetchPolicy="cache-and-network">
    {({ loading, error, data }) => {
      if (loading) return <p></p>;
      if (error) return <p>Error :(</p>;
      return (
        <iframe className="iframe" allow="encrypted-media" id="user_playlist" width="75%" height="600" scrolling="no" frameBorder="no" src={
          data.aplaylist[0] === undefined ?
            "" : data.aplaylist[0].activity_src
        } />
      )

      //



    }}
  </Query>
);
