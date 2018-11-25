

var PersonBox = React.createClass({
  loadPeopleFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handlePersonSubmit: function(person) {
    var people = this.state.data;
    // Optimistically set an id on the new Person. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    person.id = Date.now();
    var newPeople = people.concat([person]);
    this.setState({data: newPeople});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: person,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: people});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPeopleFromServer();
    setInterval(this.loadPeopleFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="personBox">
        <h1>People</h1>
        <PersonList data={this.state.data} />
        <PersonForm onPersonSubmit={this.handlePersonSubmit} />
      </div>
    );
  }
});


var PersonList = React.createClass({
  render: function() {
    var personNodes = this.props.data.map(function(person) {
      return (
        <Person fname={person.fname} lname={person.lname} logId={person.logId} key={person.fname}>
          Name: {person.fname}{person.lname}
          Login ID: {person.logId}
          Start Date: {person.startDate}
          Seniority: {person.yrs}
        </Person>
      );
    });
    return (
      <div className="personList">
        {personNodes}
      </div>
    );
  }
});


var PersonForm = React.createClass({
  getInitialState: function() {
    return {fname: '', lname: '', logId: '', startDate: ''};
  },
  handleFnameChange: function(e) {
    this.setState({fname: e.target.value});
  },
  handleLnameChange: function(e) {
    this.setState({lname: e.target.value});
  },
  handleLogIdChange: function(e) {
    this.setState({logId: e.target.value});
  },
  handleStartDateChange: function(e) {
    this.setState({startDate: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var fname = this.state.fname.trim();
    var lname = this.state.lname.trim();
    var logId = this.state.logId.trim();
    var startDate = this.state.startDate.trim();
    if (!fname || !lname || !logId || !startDate) {
      return;
    }
    this.props.onPersonSubmit({fname: fname, lname: lname, logId: logId, startDate: startDate});
    this.setState({fname: '', lname: '', logId: '', startDate: ''});
  },
  render: function() {
    return (
      <form className="personForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="First name"
          value={this.state.fname}
          onChange={this.handleFnameChange}
        />
        <input
          type="text"
          placeholder="Last name"
          value={this.state.lname}
          onChange={this.handleLnameChange}
        />
        <input
          type="text"
          placeholder="Login ID"
          value={this.state.logId}
          onChange={this.handleLogIdChange}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={this.state.startDate}
          onChange={this.handleStartDateChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});


var Person = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="person">
        <h2 className="personName">
          {this.props.fname} {this.props.lname}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});


//keep this at the bottom of the script
ReactDOM.render(
  <PersonBox url="/api/people" pollInterval={2000} />,
  document.getElementById('content')
);


