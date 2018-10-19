import React, { Component } from 'react';
import './App.css';
import app_logo from './app_logo.png';
import music from './autumn_leaves.mp3';
import firebase from './firebase.js';
import $ from 'jquery'; 
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
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
      activity:e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var temp_url = ''
    for (let p in this.state.playlists) {
      if(this.state.playlists[p].activity.toUpperCase() == this.state.activity.toUpperCase()){
        console.log(this.state.playlists[p].activity)
          temp_url = this.state.playlists[p].activity_src;
          console.log(temp_url);
          break;

        }
      }
    this.setState({
      activity_src:temp_url,
    });
    console.log(this.state.activity_src)
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

  render() {
    var user_requested_activity="";
    var requested_url="";
    for (let p in this.state.playlists) {
        if(this.state.playlists[p].activity == 'Cleaning'){
          requested_url = this.state.playlists[p].activity_src;
          break;
        }
      }


    return (
      <div className='App'>
          <div className ='searchPart'>
            <header id="app_header">
              <img id="logo" src={app_logo} alt="logo" width="200"/>
                  <h1 id="app_title"> Welcome to DJPrudo!</h1>
                  <h4>Your Home For Personal Music Curation</h4>
                    <audio autoPlay loop>
                    <source src={music}/>
                    </audio>
            </header>

              <section className='add-item'>
                <form id="form" action="#" onSubmit={this.handleSubmit}>
                <div id="prefetch">
                      <Typeahead
                          labelKey="name"
                          options={["Running","Studying","Working Out", "Eating","Sleeping","Relaxing"]}
                          placeholder="Choose an activity"
                          />
                <input id='add_activity' class="typeahead" type="text" placeholder="Enter Your Activity Here" onChange={this.handleChange}/>
                </div>
                  <button id="generate_music"
                    onClick={
                    function() {
                      document.getElementById('rec').hidden=false;}}>
                      Generate Music</button>
                  </form>
              </section>
          </div>

          <div className= "RecPart">
              <div hidden id="rec" class="w3-third w3-margin-bottom">
                <div class="w3-container w3-white">
                    <iframe id="user_playlist" width="75%" height="400" scrolling="no" frameborder="no" src={this.state.activity_src}></iframe>                 
                </div>
              </div>
          </div>
      </div>

    );
  }
}

export default App;
