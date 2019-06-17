import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import querystring from 'query-string';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
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
      {'Built with love by the'}
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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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

class Login extends Component {
  state = {
    
  username:'',
  password:'pass',
  opensnack:false,
  snackmessage:'',
  snackvariant:'error'

  }

constructor(props){
  super(props);

  this.handleClick = this.handleClick.bind(this);
  this.handleClose = this.handleClose.bind(this);

}

 handleClick(event){
    var apiBaseUrl = "https://api.stya.net/nim/";
    var body={
    "username":this.state.username,
    "password":this.state.password
    }
    console.log(body);
    axios.post(apiBaseUrl+'login', querystring.stringify({ username: body.username, password: body.password }))
    .then((response) => {
    if(response.data.code === 0){
    this.setState({opensnack: true, snackmessage: 'Login success, redirecting...', snackvariant: 'success'});
    }
    else if(response.data.code === -2){
      console.log(response);
      this.setState({opensnack: true, snackmessage: 'Username and password does not match!', snackvariant: 'error'});
    }
    else{
      console.log(response);
      this.setState({opensnack: true, snackmessage: 'Username does not exist!', snackvariant: 'error'});
    }
    })
    .catch(function (error) {
      this.setState({opensnack: true, snackmessage: 'Sign in failed!', snackvariant: 'error'});
    });
    }

  MadeWithLove() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Built with love by the '}
        <Link color="inherit" href="https://material-ui.com/">
          Material-UI
        </Link>
        {' team.'}
      </Typography>
    );
  }
    
  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({opensnack: false});
  }

  render() {
    return (
      <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="user"
              label="Username"
              name="user"
              autoComplete="user"
              onChange = {event => {
                const { value } = event.target;
                this.setState({ username: value });
                console.log('value= '+this.state.password + ' and '+this.state.username)
              }}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
              onClick={(event) => this.handleClick(event)}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link to='/Register' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
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

export default withStyles(styles)(Login);