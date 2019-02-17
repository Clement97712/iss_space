import React, { Component } from "react";

export default class Coordonnee extends Component {
  state = {
    latitude: 0,
    longitude: 0
  };

  isUpdate = () => {
    axios
      .get("http://api.open-notify.org/iss-now.json")
      .then(response => {
        console.log(response.data.iss_position);
        this.setState({
          latitude: response.data.iss_position.latitude,
          longitude: response.data.iss_position.longitude
        });
      })
      .catch(response => {
        console.log("Erreur");
      });
  };

  render() {
    return (
      <div className="">
        <p>Latitude</p>
        <button onClick={() => this.isUpdate()}>Mise a jour</button>
      </div>
    );
  }
}
