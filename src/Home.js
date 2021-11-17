import React from "react";
import "./css/Home.css";
import { Navigate } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", redirect: null };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.content = this.props.content;
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    let content = this.tryParseJSONObject(this.state.value);

    if (this.state.value === "" || !content) {
      alert("JSON invalide!");
    } else {
      this.setState({ redirect: "/tiktok" });
      this.props.content_handler(content);
    }

    event.preventDefault();
  }

  //https://stackoverflow.com/a/20392392
  tryParseJSONObject(jsonString) {
    try {
      var o = JSON.parse(jsonString);
      if (o && typeof o === "object") {
        return o;
      }
    } catch (e) {}

    return false;
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/tiktok" />;
    }

    return (
      <div id="content">
        <form onSubmit={this.handleSubmit}>
          <label>
            Collez le JSON généré : <br />
            <br />
            <textarea type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <br />
          <input type="submit" value="Générer" />
        </form>
      </div>
    );
  }
}
