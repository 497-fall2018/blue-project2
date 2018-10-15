import React, { Component } from 'react';
import './App.css';
import app_logo from './app_logo.png';
import music from './autumn_leaves.mp3';
import $ from 'jquery'; 
import {Typeahead} from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';


class App extends Component {
  
  state = {
      multiple: false,
    };


  render() {
    var Typeahead = require('react-bootstrap-typeahead').Typeahead; // CommonJS
    const {multiple} = this.state;

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
                <input id='add_activity' class="typeahead" type="text" placeholder="Enter Your Activity Here"/>
              </div>

           



              <button id="generate_music" onClick={function() {document.getElementById('rec').hidden=false;}}>Generate Music</button>
              </form>
          </section>

          <div hidden id="rec" class="w3-third w3-margin-bottom">
          <div class="w3-container w3-white">
            <p><b>Your Recommendation: Classical Music</b></p>
            <p class="w3-opacity">Robert Belson plays Classical Guitar</p>
            <iframe width="75%" height="400" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/281582773&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>
          </div>
        </div>




        </div>
      </div>

    );
  }
}

export default App;
