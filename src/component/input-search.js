import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search'
import { IconButton } from '@material-ui/core';
import { connect } from 'react-redux'
import { updateActivity } from '../actions/actionCreator'
import { bindActionCreators } from 'redux'

const suggestions = [
  { label: 'Running' },
  { label: 'Reading' },
  { label: 'Studying' },
  { label: 'Working Out' },
  { label: 'Eating' },
  { label: 'Sleeping' },
  { label: 'Relaxing' },
];

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => { }, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        endAdornment: (
          <InputAdornment position="start">
            <IconButton classes={{
              root: classes.btn
            }}><Search /></IconButton>

          </InputAdornment>
        ),
        classes: {
          input: classes.input,
          underline: classes.whiteUnderline
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            );
        })}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
      const keep =
        count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
    color: 'white',
  },
  btn: {
    flexGrow: 1,
    color: 'white',
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  input: {
    color: 'rgba(256, 256, 256, 0.9)',
    //borderBottom: '1px solid rgba(256, 256, 256, 0.42)',
    fontSize: 20,
  },
  whiteUnderline: {
    '&:before': {
      borderBottom: '1px solid rgba(256, 256, 256, 0.42)',
    },
    '&:hover': {
      borderBottom: '1px solid rgba(256, 256, 256, 0.42)',
    },
    '&:after': {
      borderBottom: '2px solid rgba(256, 256, 256, 0.9)',
    },
  }
});

class IntegrationAutosuggest extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      single: '',
      suggestions: [],
    }
  }


  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };
  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };
  handleKeyDown = (name) => (event) => {
    this.props.updateActivity(this.state.single);
    // if (event.key == 'Enter') {
    //   this.props.updateActivity(this.state.single);
    //   console.log(this.props.updateActivity(this.state.single))
    // }
  }
  handleChange = (name) => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });

  };

  render() {
    const { classes } = this.props;
    // const children = this.options.children;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      handleKeyDown: this.handleKeyDown,
      getSuggestionValue,
      renderSuggestion,
    };

    function renderSuggestionContainerWithChildren(options)
    {
      return (
          <Paper {...options.containerProps} square>
            {options.children}
            <Button>
              Add new stuff
            </Button>
          </Paper>
      );
    }

    return (

      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'Insert your activity here!',
            value: this.state.single,
            onChange: this.handleChange('single'),
            onKeyDown: this.handleKeyDown('single'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
                {options.children}
                {options.children ?
                    (<Button>
                        Add new activity
                    </Button>)
                        :
                    null
                }
            </Paper>
          )}
        />

      </div>
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateActivity
  }, dispatch)
}
export default withStyles(styles)(connect(null, mapDispatchToProps)(IntegrationAutosuggest));
