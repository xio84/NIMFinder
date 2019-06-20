import React, {Component} from 'react';
import { Link } from 'react-router-dom';

//Material-ui imports
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { cyan } from '@material-ui/core/colors'
import { TextField, Button } from '@material-ui/core';

//.js file imports
import Results from './Results';
import Title from './Title';

//Footer
function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with Material-UI by XIO84'}
    </Typography>
  );
}

//CSS Styles for Dashboard
const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: cyan[500],
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  depositContext: {
    flex: 1,
  },
});

class Dashboard extends Component {
  constructor(props){
    super(props);

    this.state = {
      name:'',
      NIM:'',
      search:'',
      query:''
    };

  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('pass');
  }

  render()
  {return (
    <div className={this.props.classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={this.props.classes.appBar}>
        <Toolbar className={this.props.classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={this.props.classes.title}>
            min(NIM)alist Finder
          </Typography>
          <Typography variant="body1" color="inherit" noWrap>
            Hello, {this.props.match.params.usr}. Not you? (
              <Link to='/login' onClick={this.logout}>log out</Link>
            )
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={this.props.classes.content}>
        <div className={this.props.classes.appBarSpacer} />
        <Container maxWidth="lg" className={this.props.classes.container}>
          <Grid container spacing={3}>
            {/* Search form */}
            <Grid item xs={12}>
              <Paper className={this.props.classes.paper}>
              <Title>Search By...</Title>
              <TextField
                id="Name"
                label="Name"
                placeholder="Enter Name Here"
                fullWidth
                margin="normal"
                variant="filled"
                value = {this.state.name}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange = {event => {
                  const { value } = event.target;
                  this.setState({ name: value });
                }}
                onKeyPress= {(e) => {
                  if(e.key === 'Enter') {
                    this.child.updaterows(this.state.name,'Name');
                  };
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick = {() => {this.child.updaterows(this.state.name,'Name')}}
              >
                Search By Name!
              </Button>
              <TextField
                id="NIM"
                label="NIM"
                placeholder="Enter NIM Here"
                fullWidth
                margin="normal"
                variant="filled"
                value = {this.state.NIM}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange = {event => {
                  const { value } = event.target;
                  this.setState({ NIM: value });
                }}
                onKeyPress= {(e) => {
                  if(e.key === 'Enter') {
                    this.child.updaterows(this.state.NIM,'NIM');
                  };
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick = {() => {this.child.updaterows(this.state.NIM,'NIM')}}
              >
                Search By NIM!
              </Button>
              <div>
              </div>
              </Paper>
            </Grid>
            {/* Search results */}
            <Grid item xs={12}>
              <Paper className={this.props.classes.paper}>
                <Results 
                token={this.props.location.state.token}
                onRef={ref => (this.child = ref)}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <MadeWithLove />
      </main>
    </div>
  );}
}

export default withStyles(useStyles)(Dashboard)