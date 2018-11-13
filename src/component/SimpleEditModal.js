import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Edit from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { compose } from "react-apollo";

const playlistquery = gql`
query {
    playlists{
      activity,
      activity_src
    }
  }
`;
function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    font: 'Lato',
    borderRadius: '5px'
  },

  error: {
    color: 'red',
    fontSize: '16px',
    marginLeft: theme.spacing.unit * 25,
    marginTop: '30px',
    // marginBottom: '-10px',
    width: theme.spacing.unit * 50,
  },

  success: {
    color: 'green',
    fontSize: '16px',
    marginLeft: theme.spacing.unit * 25,
    marginTop: '30px',
    // marginBottom: '-10px',
    width: theme.spacing.unit * 50,
  }
});
function validate(link) {
  // we are going to store errors for all fields
  // in a signle array
  const errors = [];
  if (link.length === 0) {
    errors.push("Please enter a playlist link");
  }
  return errors;
}
class SimpleEditModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      link: '',
      errors: [],
      success: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({
      open: false,
      link: '',
      errors: [],
      success: false
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const Key = this.props.data.findKey;
    const { link } = this.state;
    const errors = validate(link);
    if (errors.length > 0) {
      this.setState({ errors });
    }
    else {
      this.props.mutate({
        variables: {
          input: { key: Key, activity: this.props.activity, activity_src: link }
        }
      });
      this.setState({
        link: '',
        errors: [],
        success: true
      })
    }

  };
  render() {

    const { classes } = this.props;
    const { errors } = this.state;
    const { success } = this.state;
    return (
      <div>
        <IconButton style={{ color: 'white' }} onClick={this.handleOpen}><Edit /></IconButton>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Swap the playlist with one you love!
            <form>
                <TextField
                  value={this.props.activity}
                  label="Activity Name"
                />
                <TextField
                  value={this.state.link}
                  onChange={evt => this.setState({ link: evt.target.value })}
                  required
                  id="outlined-required"
                  label="Playlist Link"
                  margin="normal"
                  variant="outlined"
                  fullWidth={true}
                />
                {errors.map(error => (
                  <p style={getModalStyle()} className={classes.error} key={error}>Error: {error}</p>
                ))}
                {success ?
                  <p style={getModalStyle()} className={classes.success}>Add successfully!</p> : null
                }
              </form>
              <Button onClick={this.handleSubmit}>Submit</Button>
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}
SimpleEditModal.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    activity: state.activReducer.activity
  }
}
// We need an intermediary variable for handling the recursive nesting.

export default compose(
  withStyles(styles),
  (connect(mapStateToProps, null)),
  graphql(gql`query findKey($activity: String) {
        findKey(activity:$activity)
}`, {
      options: (props) => ({
        variables: {
          activity: props.activity
        }
      })
    }),
  graphql(gql` mutation updatePlaylist($input: PlaylistUpdateInput!){
        updatePlaylist(input: $input){
          activity,
          activity_src
  }}`, {
      options: (props) => ({
        update: (proxy, { data: { updatePlaylist } }) => {
          const { playlists } = proxy.readQuery({ query: playlistquery });
          proxy.writeQuery({
            query: playlistquery,
            data: {
              playlists: playlists.filter(p => p.activity !== props.activity).concat(updatePlaylist)
            }
          });
        },
      })
    }),
)(SimpleEditModal);
