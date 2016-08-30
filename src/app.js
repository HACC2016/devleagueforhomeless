const MainContainer = React.createClass({
  render: function () {
    return (
      <div className="mainContainer">
        <h1>Report Camp</h1>
        <form className="formContainer">
          <div>
            Location
            <input type="text" name="location" />
          </div>
          <div>
            Email
            <input type="text" name="location" />
          </div>
          <div>
            Phone Number
            <input type="text" name="location" />
          </div>
          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>
        <br />
        <p> Mahalo for helping your community!</p>
      </div>
    );
  }
});

ReactDOM.render(
  <MainContainer url = "/" pollInterval = {2000}/>,
  document.getElementById('app')
);