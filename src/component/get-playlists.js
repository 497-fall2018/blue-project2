import React, { Component } from 'react';
import firebase from './firebase.js';
import $ from 'jquery';
import { connect } from 'react-redux'
import { getPlaylistsActivity } from './actions/actionCreator'
import { bindActionCreators } from 'redux'




class Playlists extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    }
  }

  componentDidMount() {
    const playlistsRef = firebase.database().ref('playlists');
    playlistsRef.on('value', (snapshot) => {
      let playlists = snapshot.val();
      let newState = [];

      for (let p in playlists) {
        newState.push({
          id: p,
          activity: playlists[p].activity,
          activity_src: playlists[p].activity_src
        });
      }

      this.setState({
        playlists: newState,

      });

    });
  }
}

const mapStateToProps = (state) => {
  return { playlists: state.playlistsReducer.playlists }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateActivity
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
