import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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
  },
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
  state = {
    open: false,
    name: '',
    link:'',
    errors: []
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {name, link} = this.state;
    const errors = validate(name, link);
    if (errors.length > 0) {
      this.setState({errors});
    }
    else{
      this.setState({open: false});
      
    }

  };

  render() {
    const { classes } = this.props;
    const {errors} = this.state;
    return (
      <div>
        <Button onClick={this.handleOpen}>Open Modal</Button>
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
            {errors.map(error => (
              <p key={error}>Error: {error}</p>
              ))}
              <TextField
                value = {this.state.name}
                onChange={evt => this.setState({ name: evt.target.value })}
                required
                id="outlined-required"
                label="Activity Name"
                margin="normal"
                variant="outlined"
              />
              <TextField
                value = {this.state.link}
                onChange={evt => this.setState({ link: evt.target.value })}
                required
                id="outlined-required"
                label="Playlist Link"
                margin="normal"
                variant="outlined"
              />
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

export default SimpleModalWrapped;
