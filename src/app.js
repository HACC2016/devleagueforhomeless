import React from "react";
import ReactDOM from "react-dom";

const MainContainer = React.createClass({
  watchID: (null: ?number),

  getInitialState: function() {
    return {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
  },

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const initialPosition = JSON.stringify(position);
        this.setState({
          initialPosition: position
        });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  toggleLocation: function (event) {

    const location = {
      latitude: this.state.initialPosition.coords.latitude,
      longitude: this.state.initialPosition.coords.longitude
    }

    console.log(this.state)

    $.ajax({
      url: "/api/homeless",
      type: "post",
      data: {
        latitude: location.latitude,
        longitude: location.longitude
      },
      success: function (data) {
        console.log(data)
      },
      error: function (response) {
        alert("GOT AN ERROR: " + response);
      }
    });
  },

  render: function () {
    return (
      <div id="sendPosition">
      <label htmlFor="sendPosition">Would you like to send your location?</label>
        <input id="yup" type="checkbox" onClick={this.toggleLocation} name="yes"></input>
        <label htmlFor="yup">YES</label>
        <p className="mahalo"> Mahalo for helping your community!</p>
      </div>
    );
  }
});

ReactDOM.render(
  <MainContainer url = "/" pollInterval = {2000}/>,
  document.getElementById('app')
);
