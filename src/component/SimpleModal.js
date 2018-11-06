import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Add'
import { IconButton } from '@material-ui/core';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
const playlistquery = gql`
query {
    playlists{
      activity,
      activity_src
    }
  }
`
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
function validate(name, link) {
  // we are going to store errors for all fields
  // in a signle array
  const errors = [];
  if (name.length === 0) {
    errors.push("Please enter an activity name");
  }
  if (link.length === 0) {
    errors.push("Please enter a playlist link");
  }
  return errors;
}
class SimpleModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      name: '',
      link: '',
      errors: [],
      success: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false, errors: [], success: false });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, link } = this.state;
    const errors = validate(name, link);
    if (errors.length > 0) {
      this.setState({ errors });
    }
    else {
      this.props.mutate({
        variables: {
          input: { activity: name, activity_src: link }
        }
      })
      this.setState({
        name: '',
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
        <IconButton style={{ color: 'white' }} onClick={this.handleOpen}><Add /></IconButton>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Add a new activity!
            <form>
                <TextField
                  value={this.state.name}
                  onChange={evt => this.setState({ name: evt.target.value })}
                  required
                  id="outlined-required"
                  label="Activity Name"
                  margin="normal"
                  variant="outlined"
                  fullWidth={true}
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
SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};
// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);
export default graphql(gql`
mutation createPlaylist($input: PlaylistCreateInput!){
  createPlaylist(input: $input){
    activity,
  	activity_src
  }
}
`, {
    options: {
      update: (proxy, { data: { createPlaylist } }) => {
        const { playlists } = proxy.readQuery({ query: playlistquery });
        proxy.writeQuery({
          query: playlistquery,
          data: { playlists: playlists.concat(createPlaylist) }
        });
      },
    }
  })(SimpleModalWrapped);
