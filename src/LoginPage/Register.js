import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import querystring from 'query-string';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      {' team.'}
    </Typography>
  );
}

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: green[600],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const SnackStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

function MySnackbarContentWrapper(props) {
  const classes = SnackStyles();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

class Register extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      username:'',
      password:'',
      opensnack:false,
      snackmessage:'',
      snackvariant:'error'
    };
}

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({opensnack: false});
  }

  handleClick(event){
    var apiBaseUrl = "https://api.stya.net/nim";
    console.log("values",this.state.username,this.state.password);
    //To be done:check for empty values before hitting submit
    axios.post(apiBaseUrl+'/register', querystring.stringify({ username: this.state.username, password: this.state.password }))
   .then((response) => {
     console.log(response);
     if(response.data.code === 0){
       this.setState({opensnack: true, snackmessage: 'Registration success, please login', snackvariant: 'success'});
     }
      else if(response.data.code === -4){
        this.setState({opensnack: true, snackmessage: 'Username taken, please use another', snackvariant: 'warning'});
     }
     else if(response.data.code === -2){
      this.setState({opensnack: true, snackmessage: 'Please supply a username and a password!', snackvariant: 'error'});
     }
   })
   .catch((error) => {
     this.setState({opensnack: true, snackmessage: 'Registration failed', snackvariant: 'error'});
     console.log(error);
   });
  }

  render() {
    return (
      <div>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={this.props.classes.paper}>
        <Avatar className={this.props.classes.avatar}>
          <PersonAdd />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={this.props.classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="user"
                label="Username"
                name="user"
                autoComplete="user"
                autoFocus
                onChange = {event => {
                  const { value } = event.target;
                  this.setState({ username: value });
                  console.log('value= '+this.state.password + ' and '+this.state.username)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {event => {
                  const { value } = event.target;
                  this.setState({ password: value });
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={this.props.classes.submit}
            onClick={(event) => this.handleClick(event)}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/Login' variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          </div>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.opensnack}
        autoHideDuration={6000}
        onClose={this.handleClose}
      >
        <MySnackbarContentWrapper
          onClose={this.handleClose}
          variant={this.state.snackvariant}
          message={this.state.snackmessage}
        />
      </Snackbar>
    </div>
    );
  }
}

export default withStyles(styles)(Register);