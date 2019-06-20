/* eslint-disable no-script-url */

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { TableFooter, TablePagination } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

//Imports for Strategy Design
// import Context from './APIEndpoint/Context'
// import SearchName from './APIEndpoint/SearchName'
// import SearchNIM from './APIEndpoint/SearchNIM'

//CSS styles for table footer
const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
  },
}))

//Action handlers for table footer components
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

//TablePaginationActions properties
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

class Results extends Component {

  constructor(props){
    super(props);
    


    this.state = {
      page:0,
      rowsPerPage:5,
      rows : [],
    };

    //Function binders
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.updaterows = this.updaterows.bind(this);
  }

  //Creates "pointers" to be referenced from outside component
  componentDidMount() {
    this.props.onRef(this)
  }
  //Destroys said "pointers"
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  
  //Updates Data
  updaterows(query,search){
    this.setState({payload : 10});
    //Buffer
    var rows=[];
    var apiBaseUrl;
    if (search==='Name'){
      //Endpoint
      apiBaseUrl = "https://api.stya.net/nim/byname";
      //Asynchronous HTTP request with axios
      axios.get(apiBaseUrl,{
          headers: {
              'Auth-Token': this.props.token
          },
          params: {
              name: query,
              count: 1000
          }
      })
      .then((response) =>{
        if(response.data.status==="OK"){
          // console.log(response);
            Array.prototype.push.apply(rows,response.data.payload);
            this.setState({rows: rows});
          }
          else{
            alert('Request failed, try logging in again')
          }
      })
      .catch((error) => {
          console.log(error);
      })

        //For Strategy Design
        // var operation = new Context(new SearchName(this.props.token, query));
        // var x = operation.searchresults();
        // this.setState({rows: x});
        // console.log(this.state.rows);
    }
    else if (search==='NIM'){
      apiBaseUrl = "https://api.stya.net/nim/byid";
      axios.get(apiBaseUrl,{
          headers: {
              'Auth-Token': this.props.token
          },
          params: {
              query: query,
              count: 1000
          }
      })
      .then((response) =>{
        if(response.data.status==="OK"){
            Array.prototype.push.apply(rows,response.data.payload);
            this.setState({rows: rows});
          }
          else{
            alert('Request failed, try logging in again')
          }
      })
      .catch((error) => {
        console.log(error);
      })

        //For Strategy Design
        // var operation = new Context(new SearchName(this.props.token, query));
        // var x = operation.searchresults();
        // this.setState({rows: x});
        // console.log(this.state.rows);
    }
  }

  //Table action handlers
  handleChangePage(event, newPage) {
    this.setState({page:newPage});
  }
  handleChangeRowsPerPage(event) {
    this.setState({rowsPerPage : parseInt(event.target.value, 10)});
  }

  render(){
    if (this.state.rows===undefined){
      console.log(this.state.rows);
      return (
        <React.Fragment>
          <Title>{this.props.search} Search Result</Title>
        </React.Fragment>
      )
    }

  return (
    <React.Fragment>
      <Title>{this.props.search} Search Result</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>NIM Jurusan</TableCell>
            <TableCell>NIM TPB</TableCell>
            <TableCell>Prodi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.nim_jur}</TableCell>
              <TableCell>{row.nim_tpb}</TableCell>
              <TableCell>{row.prodi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={5}
                count={this.state.rows.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                SelectProps={{
                  inputProps: { 'aria-label': 'Rows per page' },
                  native: true,
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
          </TableRow>
        </TableFooter>
      </Table>
    </React.Fragment>
  );}
}

export default Results