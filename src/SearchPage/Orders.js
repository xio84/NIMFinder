/* eslint-disable no-script-url */

import React, { Component } from 'react';
import axios from 'axios';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { TableFooter, Button, TablePagination } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { withStyles } from '@material-ui/styles';

import Context from './APIEndpoint/Context'
import SearchName from './APIEndpoint/SearchName'


const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
  },
}))

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

// const useStyles = makeStyles(theme => ({
//   seeMore: {
//     marginTop: theme.spacing(3),
//   },
// }));

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

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

class Orders extends Component {

  constructor(props){
    super(props);
    


    this.state = {
      page:0,
      rowsPerPage:5,
      payload:10,
      APIPage:0,
      rows : [
        createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
        createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
        createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
        createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
        createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
        createData(5, '19 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
      ],
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.updaterows = this.updaterows.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  
  updaterows(query,search){
    this.setState({payload : 10});
    var rows=[];
    if (search==='Name'){
      var apiBaseUrl = "https://api.stya.net/nim/byname";
      var rows=[];
      axios.get(apiBaseUrl,{
          headers: {
              'Auth-Token': this.props.token
          },
          params: {
              name: query,
              count: 100
          }
      })
      .then((response) =>{
          console.log(response);
          this.setState({payload : 5});
          Array.prototype.push.apply(rows,response.data.payload);
          this.setState({APIPage : this.state.APIPage+1});
      })
      .catch((error) => {
          this.setState({payload : -3});
      })
      this.setState({rows: rows});

        //For Strategy Design
        // var operation = new Context(new SearchName(this.props.token, query));
        // var x = operation.searchresults();
        // this.setState({rows: x});
        // console.log(this.state.rows);
    }
    if (search==='NIM'){
      var apiBaseUrl = "https://api.stya.net/nim/byid";
      axios.get(apiBaseUrl,{
          headers: {
              'Auth-Token': this.props.token
          },
          params: {
              query: query,
              count: 100
          }
      })
      .then((response) =>{
          console.log(response);
          this.setState({payload : 5});
          Array.prototype.push.apply(rows,response.data.payload);
          this.setState({APIPage : this.state.APIPage+1});
      })
      .catch((error) => {
          this.setState({payload : -3});
      })
      this.setState({rows: rows});

        //For Strategy Design
        // var operation = new Context(new SearchName(this.props.token, query));
        // var x = operation.searchresults();
        // this.setState({rows: x});
        // console.log(this.state.rows);
    }
  }

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

    console.log(this.state.rows);
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

export default Orders