import React, { Component } from 'react';
import './App.css';
import app_logo from './app_logo.png';
import music from './autumn_leaves.mp3';
import firebase from './firebase.js';
import $ from 'jquery'; 
import {Typeahead} from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Button } from 'reactstrap';



class App extends Component {
  constructor() {
    super();
    this.state={
      activity:'',
      activity_src:'',
      playlists: []
    } 
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const playlistsRef=firebase.database().ref('playlists');
    const playlist = {
      activity: this.state.activity,
      activity_src: this.state.activity_src
    }
    playlistsRef.push(playlist);
    this.setState({
      activity:'',
      activity_src:'',
    });
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
        playlists: newState
      });
    });
    }



  render() {
    var user_requested_activity="";
    var requested_url="";

    return (
      <div className='App'>
        <header id="app_header">
          <img id="logo" src={app_logo} alt="logo" width="200"/>
              <h1 id="app_title"> Welcome to DJPrudo!</h1>
              <h4>Your Home For Personal Music Curation</h4>
                <audio autoPlay loop>
                <source src={music}/>
                </audio>
        </header>
        

        <div className='container'>
          <section className='add-item'>
              <form id="form" action="#">
              <div id="prefetch">
                <input id='add_activity' class="typeahead" type="text" placeholder="Enter Your Activity Here" onChange={this.handelChange}/>
              </div>

           
              <button id="generate_music" onClick={function() {user_requested_activity=document.getElementById('add_activity').innerHTML; requested_url=this.playlists[user_requested_activity]; document.getElementById('user_playlist').src=requested_url; document.getElementById('rec').hidden=false;}}>Generate Music</button>
              </form>
          </section>

          <div hidden id="rec" class="w3-third w3-margin-bottom">
          <div class="w3-container w3-white">
            <p><b>Your Recommendation: Classical Music</b></p>
            <p class="w3-opacity">Robert Belson plays Classical Guitar</p>
            <iframe id="user_playlist" width="75%" height="400" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/281582773&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>
          </div>
        </div>




        </div>
      </div>

    );
  }
}

export default App;
