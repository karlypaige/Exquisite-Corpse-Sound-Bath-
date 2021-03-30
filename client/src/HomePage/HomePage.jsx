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
    const searchUrl = `https://shazam.p.rapidapi.com/search/?key=c84a11a37dmsh97101e52facfc63p160003jsna7983511d133&q=${query}${pageNumber}`;
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
            message: "Failed to fetch results. Please check network",
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
          <a href="#">
            <i class="fas fa-fire"></i> Featured
          </a>
          <a href="#">
            <i class="fas fa-music"></i> Music
          </a>
           <Link to="/record" ><i class="fas fa-microphone"></i> Record
          </Link> 
          <a href="#">
            <i class="fas fa-search"></i> Search
          </a>
          <br></br>
          <br></br>
          <button className="btn btn-dark">Signout</button>
        </div>
        
    
        <div className="col-md-16">
          {/* <h1>Hi {user.firstName}!</h1> */}
          <div className="container">
            
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          {/* Wrapper for slides */}
          <div className="carousel-inner">
            <div className="item active">
              <img src="http://www.functionalstone.com/cv/images/exquisite-corpse(31).jpg" /> 
              <div class="carousel-caption">
                <h4><a href="#">Lorem ipsum dolor sit amet consetetur sadipscing</a></h4>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. <a class="label label-primary" href="http://sevenx.de/demo/bootstrap-carousel/" target="_blank">Free Bootstrap Carousel Collection</a></p>
            </div>
            </div>{/* End Item */}
            <div className="item">
              <img src="https://www.functionalstone.com/cv/images/exquisite-corpse(29).jpg" />
             
            </div>{/* End Item */}
            <div className="item">
              <img src="https://s3files.core77.com/blog/images/2011/10/XavierBarrade-EpicExquisiteCorpse-2.jpg" />
              
            </div>{/* End Item */}
            <div className="item">
              <img src="http://www.functionalstone.com/cv/images/exquisite-corpse-game(36).jpg" />
              
            </div>{/* End Item */}
            <div className="item">
              <img src="https://i.pinimg.com/736x/30/32/32/3032325f3dbd6287abdd7dccd3888d81--exquisite-corpse-future-school.jpg" />
              
            </div>{/* End Item */}
            
          </div>{/* End Carousel Inner */}
         
          {/* Controls */}
          <div className="carousel-controls">
            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
              <span className="glyphicon glyphicon-chevron-left" />
            </a>
            <a className="right carousel-control" href="#myCarousel" data-slide="next">
              <span className="glyphicon glyphicon-chevron-right" />
            </a>
          </div>
            
        </div>{/* End Carousel */}
          
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
            <li>
              <i className="fa fa-facebook fa-2x"></i>
            </li>
            <li>
              <i className="fa fa-twitter fa-2x"></i>
            </li>
            <li>
              <i className="fa fa-linkedin fa-2x"></i>
            </li>
            <li>
              <i className="fa fa-instagram fa-2x"></i>
            </li>
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
