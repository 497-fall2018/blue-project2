import React, { Component } from 'react';
import './App.css';
import app_logo from './app_logo.png';
import music from './autumn_leaves.mp3';
import firebase from './firebase.js';
import $ from 'jquery';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Autosu from './component/input-search';
class App extends Component {

  constructor() {

    super();
    this.state = {
      activity: '',
      activity_src: '',
      playlists: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }
  handleValue(key) {
    console.log("11111");
    this.setState({
      activity: key,
    });
  }
  handleChange(e) {
    this.setState({
      activity: e.target.value,
    });
  }
  handleKeyDown(e) {

    console.log("success!");


  }

  handleSubmit(e) {
    e.preventDefault();
    var temp_url = ''
    for (let p in this.state.playlists) {
      if (this.state.playlists[p].activity.toUpperCase() == this.state.activity.toUpperCase()) {
        //console.log(this.state.playlists[p].activity)
        temp_url = this.state.playlists[p].activity_src;
        //console.log(temp_url);
        break;

      }
    }
    this.setState({
      activity_src: temp_url,
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
    var user_requested_activity = "";
    var requested_url = "";
    for (let p in this.state.playlists) {
      if (this.state.playlists[p].activity == 'Cleaning') {
        requested_url = this.state.playlists[p].activity_src;
        break;
      }
    }


    return (
      <div className='App'>

        <div className='searchPart'>

          <section className='add-item'>
            <form id="form" action="#" onSubmit={this.handleSubmit} >
              <div id="prefetch">
                <div style={{ padding: 100 }}>
                  <Grid
                    container
                    direction="column"
                    justify="left"
                    alignItems="left"

                  >
                    <Typography align='left' color='inherit' component="h2" variant="h1" gutterBottom>
                      DJ Produ
                    </Typography>
                    <Typography align='left' color='inherit' variant="h5" gutterBottom>
                      DJ Produ saves your favorite beats all across platforms. Type your task and you are ready to go!
      </Typography>
                    <div style={{ marginTop: 20 }}>
                      <Autosu trigger={this.handleKeyDown} activ={this.handleValue} />

                    </div>
                  </Grid>
                </div>

                <Typeahead
                  labelKey="name"
                  options={["Running", "Studying", "Working Out", "Eating", "Sleeping", "Relaxing"]}
                  placeholder="Choose an activity"
                />
                <input id='add_activity' class="typeahead" type="text" placeholder="Enter Your Activity Here" onChange={this.handleChange} />
              </div>

              <button id="generate_music"
                onClick={
                  function () {
                    document.getElementById('rec').hidden = false;
                  }}>
                Generate Music</button>
            </form>
          </section>
        </div>

        <div className="RecPart">
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
