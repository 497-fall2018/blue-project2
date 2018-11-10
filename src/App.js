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
import { connect } from 'react-redux'
import { updateVisibility } from './actions/actionCreator'
import { bindActionCreators } from 'redux'
import background_video from './background.mp4';
import background_video2 from './DJ_Audio.mp4';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SimpleModalWrapped from './component/SimpleModal.js'
import Add from '@material-ui/icons/Add'
import { IconButton } from '@material-ui/core';

import * as fromP from './reducers/getPlaylist'
// import gql from "graphql-tag";
import SpotifyPlayer from 'react-spotify-player';
import ReactTooltip from 'react-tooltip';
import { Hashtag } from 'react-twitter-widgets';


const size = {
  width: '100%',
  height: '100%',
};
const view = 'list'; // or 'coverart'
const theme = 'black'; // or 'white'

class App extends Component {


  constructor() {
    super();
    this.state = {
      //activity: '',
      open: false,
      activity_src: '',
      playlists: [],
      spotify_clicked: false,
      soundcloud_clicked: false,
      youtube_clicked: false,
      NU_clicked: false
    }


    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateVisibility(true);
  }

  handleOpenModal = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  componentDidMount() {

  }

  handleSpotifyClick() {
    if (this.state.spotify_clicked == false) {
      document.getElementById("spotifydiv").style.display = "block";
      document.getElementById("soundclouddiv").style.display = "none";
      document.getElementById("NUdiv").style.display = "none";
      document.getElementById("youtubediv").style.display = "none";
      this.setState({
        spotify_clicked: true,
        soundcloud_clicked: false,
        NU_clicked: false,
        youtube_clicked: false
      });
    }
    else {
      document.getElementById("spotifydiv").style.display = "none";
      document.getElementById("soundclouddiv").style.display = "none";
      document.getElementById("NUdiv").style.display = "none";
      document.getElementById("youtubediv").style.display = "none";
      this.setState({
        spotify_clicked: false,
        soundcloud_clicked: false,
        NU_clicked: false,
        youtube_clicked: false
      });
    }
  }

  handleSoundcloudClick() {
    if (this.state.soundcloud_clicked == false) {
      document.getElementById("soundclouddiv").style.display = "block";
      document.getElementById("spotifydiv").style.display = "none";
      document.getElementById("NUdiv").style.display = "none";
      document.getElementById("youtubediv").style.display = "none";
      this.setState({
        soundcloud_clicked: true,
        spotify_clicked: false,
        NU_clicked: false,
        youtube_clicked: false
      });
    }
    else {
      document.getElementById("soundclouddiv").style.display = "none";
      document.getElementById("spotifydiv").style.display = "none";
      document.getElementById("NUdiv").style.display = "none";
      document.getElementById("youtubediv").style.display = "none";
      this.setState({
        soundcloud_clicked: false,
        spotify_clicked: false,
        NU_clicked: false,
        youtube_clicked: false
      });
    }
  }

  handleNUClick() {
    if (this.state.NU_clicked == false) {
      document.getElementById("NUdiv").style.display = "block";
      document.getElementById("spotifydiv").style.display = "none";
      document.getElementById("soundclouddiv").style.display = "none";
      document.getElementById("youtubediv").style.display = "none";
      this.setState({
        NU_clicked: true,
        spotify_clicked: false,
        soundcloud_clicked: false,
        youtube_clicked: false
      });
    }
    else {
      document.getElementById("NUdiv").style.display = "none";
      document.getElementById("spotifydiv").style.display = "none";
      document.getElementById("soundclouddiv").style.display = "none";
      document.getElementById("youtubediv").style.display = "none";
      this.setState({
        NU_clicked: false,
        spotify_clicked: false,
        soundcloud_clicked: false,
        youtube_clicked: false
      });
    }
  }

  handleYoutubeClick() {
    if (this.state.youtube_clicked == false) {
      document.getElementById("NUdiv").style.display = "none";
      document.getElementById("spotifydiv").style.display = "none";
      document.getElementById("soundclouddiv").style.display = "none";
      document.getElementById("youtubediv").style.display = "block";
      this.setState({
        NU_clicked: false,
        spotify_clicked: false,
        soundcloud_clicked: false,
        youtube_clicked: true
      });
    }
    else {
      document.getElementById("NUdiv").style.display = "none";
      document.getElementById("spotifydiv").style.display = "none";
      document.getElementById("soundclouddiv").style.display = "none";
      document.getElementById("youtubediv").style.display = "none";
      this.setState({
        NU_clicked: false,
        spotify_clicked: false,
        soundcloud_clicked: false,
        youtube_clicked: false
      });
    }
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
          <video className='videoTag' autoPlay loop muted>
            <source src={background_video2} type='video/mp4' /> </video>
          <section className='add-item'>
            <form id="form" action="#" onSubmit={this.handleSubmit} >
              <div id="prefetch">
                <div style={{
                  paddingTop: 130,
                  paddingLeft: 100,
                  paddingRight: 100
                }}>
                  <Grid
                    container
                    direction="column"

                  >

                    <Typography align='left' color='inherit' component="h2" variant="h1" gutterBottom>
                      DJ Produ
                    </Typography>
                    <Typography align='left' color='inherit' variant="h5" gutterBottom>
                      DJ Produ saves your favorite beats all across platforms. Type your task and you are ready to go!
                    </Typography>
                    <div style={{ marginTop: 20 }}>
                      <Autosu />

                    </div>
                  </Grid>
                </div>
              </div>
            </form>
          </section>


        </div>

        <div className="RecPart">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            style={{ textAlign: "left", padding: 20 }}
            wrap="wrap"
          >

            <img data-tip data-for='spot_tooltip' alt="spotifyicon" className="spIcon" src={require('./img/spotify.ico')} onClick={(e) => this.handleSpotifyClick(e)} />
            <ReactTooltip id='spot_tooltip' place="top" type="light" effect="float">
              <a>Spotify Top Charts 2018</a>
            </ReactTooltip>

            <img data-tip data-for='sound_tooltip' alt="soundcloudicon" className="platformIcon" src={require('./img/soundcloud.png')} onClick={(e) => this.handleSoundcloudClick(e)} />
            <ReactTooltip id='sound_tooltip' place="top" type="light" effect="float">
              <a>Soundcloud Top Charts 2018</a>
            </ReactTooltip>

            <img data-tip data-for='youtube_tooltip' alt="youtubeicon" className="platformIcon" src={require('./img/youtube.png')} onClick={(e) => this.handleYoutubeClick(e)} />
            <ReactTooltip id='youtube_tooltip' place="top" type="light" effect="float">
              <a>Youtube Top Charts 2018</a>
            </ReactTooltip>

            <img data-tip data-for='NU_tooltip' id="NUicon" alt="NUicon" className="platformIcon" src={require('./img/NU.png')} onClick={(e) => this.handleNUClick(e)} />
            <ReactTooltip id='NU_tooltip' place="top" type="light" effect="float">
              <a>Recommended by NU Students like you!</a>
            </ReactTooltip>

            <div id="twitter_div">\
            <a style={{ color: "#ffffff" }}>Share DJPrudo!</a>
              <Hashtag hashtag="DJPrudo" />
            </div>

          </Grid>

          <div className="greyContainer">
            <div id="rec" className="w3-third w3-margin-bottom">
              <div className="resultiframe">
                {fromP.aplaylist(this.props.activity)}

              </div>
            </div>

            <div className="spotifydiv" id="spotifydiv">
              <SpotifyPlayer
                uri="spotify:playlist:37i9dQZEVXbLRQDuF5jeBp"
                size={size}
                view={view}
                theme={theme}
              />
            </div>

            <div id="NUdiv">
              <iframe width="100%" height="100%" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/315636479&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
            </div>

            <div id="soundclouddiv">
              <iframe width="100%" height="100%" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/281743188&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
            </div>


            <div id="youtubediv">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLw-VjHDlEOgvtnnnqWlTqByAtC7tXBg6D" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>


          </div>
        </div>
      </div>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    activity: state.activReducer.activity
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateVisibility
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
