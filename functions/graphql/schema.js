const { ApolloServer, gql } = require('apollo-server-express');

const resolvers = require('./resolvers');

const schema = gql`
input PlaylistCreateInput {
  activity: String
  activity_src: String
}
type Playlist {
  activity: String
  activity_src: String
}
type Playlists {
  id: Int!
  activity: String
  activity_src: String
}
type Query {
  aplaylist(activity: String): [Playlist]
  playlists: [Playlists]
  helloword: String
}
type Mutation {
  createPlaylist(input: PlaylistCreateInput!): [Playlist]
}
`;


module.exports = new ApolloServer({
  typeDefs: schema,
  resolvers
});
