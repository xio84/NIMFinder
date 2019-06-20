import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { cyan } from '@material-ui/core/colors'

import Orders from './Orders';
import Title from './Title';
import { TextField, Button } from '@material-ui/core';
import Context from './APIEndpoint/Context'
import SearchName from './APIEndpoint/SearchName'

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with Material-UI by XIO84'}
    </Typography>
  );
}

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

  // searchHandler(){
  //   console.log('success');
  //   if (this.state.search==='Name'){
  //     let operation = new Context(new SearchName(this.props.location.state.token, this.state.name));
  //     var newrows = operation.searchresults();
  //     console.log(newrows);
  //     this.setState({rows: newrows})
  //     console.log(this.state.rows);
  //   }
  // }

  render()
  {return (
    <div className={this.props.classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={this.props.classes.appBar}>
        <Toolbar className={this.props.classes.toolbar}>
          {/* <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={clsx(this.props.classes.menuButton, open && this.props.classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography component="h1" variant="h6" color="inherit" noWrap className={this.props.classes.title}>
            Simple NIM Finder
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
            {/* Chart
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
              </Paper>
            </Grid> */}
            {/* Recent Deposits */}
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
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={this.props.classes.paper}>
                <Orders 
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