import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import querystring from 'query-string';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';

import {MadeWithLove,styles,MySnackbarContentWrapper} from './LoginStyles';

class Login extends Component {
  state = {
    
  username:'',
  password:'pass',
  opensnack:false,
  snackmessage:'',
  snackvariant:'error',
  token:'',
  Saves:false

  }

constructor(props){
  super(props);

  this.handleClick = this.handleClick.bind(this);
  this.handleClose = this.handleClose.bind(this);

}

  componentWillMount(){
      var token = this.getToken();
      if (token.user !== "") {
        this.setState({ username : token.user, password : token.pass});
        var apiBaseUrl = "https://api.stya.net/nim/";
        var body={
        "username":token.user,
        "password":token.pass
        }
        console.log(body);
        axios.post(apiBaseUrl+'login', querystring.stringify({ username: body.username, password: body.password }))
        .then((response) => {
        if(response.data.code === 0){
          console.log(response);
          this.setState({token: response.data.token, opensnack: true, snackmessage: 'Login success, redirecting...', snackvariant: 'success'});
        }})
        };
  }

  setToken(user, pass) {
    // Saves user token to localStorage
    localStorage.setItem('user', user);
    localStorage.setItem('pass', pass);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return {'user' : localStorage.getItem('user'), 'pass' : localStorage.getItem('pass')}
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
      console.log(response);
      if (this.state.Saves === "remember"){
        this.setToken(body.username,body.password);
      }
      this.setState({token: response.data.token, opensnack: true, snackmessage: 'Login success, redirecting...', snackvariant: 'success'});
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
    .catch((error) => {
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
    if (this.state.snackvariant === 'success') {
      return <Redirect to={{
        pathname : this.state.username+'/search',
        state: {
          token : this.state.token
        }
      }}/>
    }

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
              control={<Checkbox value="remember" color="primary" onChange = {event => {
                const { value } = event.target;
                this.setState({ Saves: value });
              }} />}
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