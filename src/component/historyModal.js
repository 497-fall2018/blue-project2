
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu'
import Sidebar from "react-sidebar";
import PageHeader from "react-bootstrap"
import SidebarContent from "./sidebar_content"


class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      name: '',
      link: '',
      errors: [],
      success: false,
      menu_clicked: false,
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  handleMenuOpen(){
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
  
  render() {
    return (
          <Sidebar
          sidebar={<b>
            <SidebarContent/>
          </b>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
          >
          <IconButton style={{ paddingTop: 30, paddingLeft: 30, color: 'white' }} onClick={() => this.onSetSidebarOpen(true)}><Menu/></IconButton>
        </Sidebar>
       
      
    );
  }
}
History.propTypes = {
  classes: PropTypes.object.isRequired,
};
// We need an intermediary variable for handling the recursive nesting.

export default History;
