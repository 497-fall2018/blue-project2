const admin = require('firebase-admin');
const functions = require('firebase-functions');


admin.initializeApp(functions.config().firebase);
const playlistsRef = admin.database().ref('playlists');

module.exports = {
  Query: {
    helloword: () => 'ok',
    aplaylist(obj, args, context, info) {
      return playlistsRef.once('value').then(snapshot => {
        const playlists = snapshot.val();
        return Object.values(playlists).filter(p => p.activity.toLowerCase() === args.activity);
      })
    },
    playlists() {
      return playlistsRef.once('value').then(snapshot => {
        const playlists = snapshot.val();
        return Object.keys(playlists).map(p => Object.assign({ id: p }, playlists[p]));
      })
    }
  },
  Mutation: {
    createPlaylist: (obj, args, context, info) => {
      let input = args.input;
      const playlist = [];
      new Promise((resolve) => {
        const playlist = playlistsRef.push(input, () => {
          resolve(Object.assign({}, input)
          );
        }
        );
      })
      return playlist;
    },
  }
};