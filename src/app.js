const MainContainer = React.createClass({
  render: function () {
    return (
      <div className="mainContainer">
        <h1>Report Camp</h1>
        <br />
        <form className="form">
          <div className="location">
            <input
              type="text"
              name="location"
              placeholder="1234 Street Name, City, State, Zipcode"
            />
            <label htmlFor="location">Location</label>
          </div>
          <div className="email">
            <input
              type="text"
              name="location"
              placeholder="yourname@example.com"
            />
            <label htmlFor="location">E-mail</label>
          </div>
          <div className="phone">
            <input
              type="text"
              name="location"
              placeholder="(###) ###-####"
            />
            <label htmlFor="location">Phone Number</label>
          </div>
          <div className="description">
            <textarea
              name="description"
              placeholder="Please write a detailed description of what you see."
            ></textarea>
            <label htmlFor="location">Description</label>
          </div>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
        <br />
        <p className="mahalo"> Mahalo for helping your community!</p>
      </div>
    );
  }
});

ReactDOM.render(
  <MainContainer url = "/" pollInterval = {2000}/>,
  document.getElementById('app')
);