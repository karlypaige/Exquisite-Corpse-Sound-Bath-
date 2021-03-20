import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import axios from "axios";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.state = {
      query: "",
      results: {},
      loading: false,
      message: "",
    };
    this.cancel = "";
  }
  componentDidMount() {
    this.props.getUsers();
  }

  handleDeleteUser(id) {
    return (e) => this.props.deleteUser(id);
  }
  //function to fetch
  fetchSearchResults(updatedPageNo = "", query) {
    const pageNumber = updatedPageNo ? `&page=${pageNumber}` : "";
    const searchUrl = `https://pixabay.com/api/?key=12413278-79b713c7e196c7a3defb5330e&q=${query}${pageNumber}`;
    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();

    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        const resultNotFoundMsg = !res.data.hits.length
          ? "There are no more search results. Please try a new search."
          : "";
        this.setState({
          results: res.data.hits,
          message: resultNotFoundMsg,
          loading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Failed to fecth results. Please check network",
          });
        }
      });
  }

  //onChange Event
  handleOnInputChange(event) {
    const query = event.target.value;
    this.setState({ query: query, loading: true, message: "" }, () => {
      this.fetchSearchResults(1, query);
    });
  }

  renderSearchResults() {
    const { results } = this.state;

    if (Object.keys(results).length && results.length) {
      return (
        <div className="results-container">
          {results.map((result) => {
            return (
              <a
                key={result.id}
                href={result.previewURL}
                className="result-items"
              >
                <h6 className="image-username">{result.username}</h6>
                <div className="image-wrapper">
                  <img
                    className="image"
                    src={result.previewURL}
                    alt={result.username}
                  />
                </div>
              </a>
            );
          })}
        </div>
      );
    }
  }
  render() {
    const { user, users } = this.props;
    const { query } = this.state;
    console.warn(this.state);
    return (
      <div>
          
         <div className="sidenav">
             <label>Exquisite Corpse Sound Bath</label>
             <h2 className="nav-title"> Discover</h2>
             <a href="#"><i class="fas fa-fire"></i> Featured</a>
  <a href="#"><i class="fas fa-music"></i> Music</a>
  <a href="#"><i class="fas fa-microphone"></i> Record</a>
  <a href="#"><i class="fas fa-search"></i> Search</a>
         </div>

        <div className="col-md-12">
          <h1>Hi {user.firstName}!</h1>

          <div class="d-grid gap-5 d-md-block">
            <button class="btn btn-primary" type="button">
              Record
            </button>
          </div>

          <hr></hr>

          <div className="container h-100">
            <label>Searh for Top Music 2021</label>
            <div className="d-flex justify-content-center h-100">
              <div className="searchbar">
                {/* <label className ="seacrch-label" htmlFor="search-input"></label> */}
                <input
                  className="search_input"
                  type="text"
                  placeholder="Search.."
                  value={query}
                  id="search-input"
                  name="query"
                  onChange={this.handleOnInputChange}
                ></input>

                {/*  */}

                <a href="#" className="search_icon">
                  <i className="fa fa-search"></i>
                </a>
              </div>
            </div>
            List of popular music with image
            {this.renderSearchResults()}
          </div>

          <hr></hr>

          <p>
            <Link to="/login">Logout</Link>
            
          </p>
        
          {/* <h3>All registered users:</h3> */}
          {/* {users.loading && <em>Loading users...</em>} */}
          {/* {users.error && <span className="text-danger">ERROR: {users.error}</span>} */}
          {/* {users.items && */}
          {/* // <ul> */}
          {/* {users.items.map((user, index) => */}
          {/* // <li key={user.id}> */}
          {/* {user.firstName + ' ' + user.lastName} */}
          {/* { */}
          {/* // user.deleting ? <em> - Deleting...</em>
                                    // : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    // : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                // } */}
          {/* </li> */}
          {/* // )} */}
          {/* </ul> */}
          {/* // } */}
         
        </div>
      <footer className="footer">
      
    <ul>
        <li><i className="fa fa-facebook fa-2x"></i></li>
        <li><i className="fa fa-twitter fa-2x"></i></li>
        <li><i className="fa fa-linkedin fa-2x"></i></li>
        <li><i className="fa fa-instagram fa-2x"></i></li>
    </ul>

      </footer>
      </div> //master div
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
