const { ApolloServer, gql } = require('apollo-server-express');

const resolvers = require('./resolvers');

const schema = gql`
input PlaylistCreateInput {
  activity: String
  activity_src: String
}
input PlaylistUpdateInput {
  key:String
  activity: String
  activity_src: String
}
type Playlist {
  activity: String
  activity_src: String
}
type Query {
  aplaylist(activity: String): [Playlist]
  playlists: [Playlist]
  findKey(activity:String): String
  helloword: String
}
type Mutation {
  createPlaylist(input: PlaylistCreateInput!): [Playlist]
  updatePlaylist(input: PlaylistUpdateInput!): [Playlist]
}
`;


module.exports = new ApolloServer({
  typeDefs: schema,
  resolvers
});
