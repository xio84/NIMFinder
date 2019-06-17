import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function MadeWithLove() {
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

const useStyles = makeStyles(theme => ({
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
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange = {(event,newValue) => this.setState({username:newValue})}
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
            onChange = {(event,newValue) => this.setState({password:newValue})}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => this.handleClick(event)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}

// //App.js
// import React, { Component } from 'react';
// import './App.css';
// import Loginscreen from './LoginPage/LoginScreen'
// class App extends Component {
//   constructor(props){
//     super(props);
//     this.state={
//       loginPage:[],
//       uploadScreen:[]
//     }
//   }
//   componentWillMount(){
//     var loginPage =[];
//     loginPage.push(<Loginscreen parentContext={this}/>);
//     this.setState({
//                   loginPage:loginPage
//                     })
//   }
//   render() {
//     return (
//       <div className="App">
//         {this.state.loginPage}
//         {this.state.uploadScreen}
//       </div>
//     );
//   }
// }
// const style = {
//   margin: 15,
// };
// export default App;

// //Login.js
// import React, { Component } from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
// import axios from 'axios';
// class Login extends Component {
// constructor(props){
//   super(props);
//   this.state={
//   username:'',
//   password:''
//   }
//  }

//  handleClick(event){
//     var apiBaseUrl = "https://api.stya.net/nim/";
//     var self = this;
//     var body={
//     "username":this.state.username,
//     "password":this.state.password
//     }
//     axios.post(apiBaseUrl+'login', body)
//     .then(function (response) {
//     console.log(response);
//     if(response.data.code == 0){
//     console.log("Login successfull");
//     alert("Login successfull user = " + this.state.username)
//     }
//     else if(response.data.code == 204){
//     console.log("Username password do not match");
//     alert("username password do not match")
//     }
//     else{
//     console.log("Username does not exists Error = " + response.data.code);
//     alert("Username does not exist Error = " + response.data.code);
//     }
//     })
//     .catch(function (error) {
//     console.log(error);
//     });
//     }

// render() {
//     return (
//       <div>
//         <MuiThemeProvider>
//           <div>
//           <AppBar
//              title="Login"
//            />
//            <TextField
//              hintText="Enter your Username"
//              floatingLabelText="Username"
//              onChange = {(event,newValue) => this.setState({username:newValue})}
//              />
//            <br/>
//              <TextField
//                type="password"
//                hintText="Enter your Password"
//                floatingLabelText="Password"
//                onChange = {(event,newValue) => this.setState({password:newValue})}
//                />
//              <br/>
//              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
//          </div>
//          </MuiThemeProvider>
//       </div>
//     );
//   }
// }
// const style = {
//  margin: 15,
// };
// export default Login;