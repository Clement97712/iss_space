import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Time from "react-timestamp";
//import { url } from "inspector";

class App extends Component {
  state = {
    latitude: 0,
    longitude: 0,
    timestamp: 0
  };

  isUpdate = () => {
    axios
      .get("https://api.wheretheiss.at/v1/satellites/25544")
      .then(response => {
        console.log(response.data);
        this.setState({
          latitude: response.data.latitude,
          longitude: response.data.longitude,
          timestamp: response.data.timestamp
        });
      })
      .catch(response => {
        console.log("Erreur");
      });
  };

  componentWillMount() {
    this.isUpdate();
  }

  currentPosition = () => {
    this.isUpdate();
    console.log("update");
  };

  render() {
    const coordonnees = [this.state.latitude, this.state.longitude];
    const attri =
      "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.png";
    const attri2 =
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

    const styles = {
      font: "5px"
    };
    return (
      <div className="test">
        <div className="header" />
        <div className="App">
          <div className="paragraphe">
            <p className="title">Qu'est ce que l'I.S.S</p>
            <p className="sentence">
              I.S.S. (International Space Station en anglais et Station spatiale
              internationale en francais) est une station spatiale placée en
              orbite terrestre basse, occupée en permanence par un équipage
              international qui se consacre à la recherche scientifique dans
              l'environnement spatial. Ce programme, lancé et piloté par la
              NASA, est développé conjointement avec l'agence spatiale fédérale
              russe (FKA), avec la participation des agences spatiales
              européenne, japonaise et canadienne.
              <a
                className="link"
                href="https://fr.wikipedia.org/wiki/Station_spatiale_internationale"
              >
                Pour plus d'infos
              </a>
            </p>
          </div>
          <hr className="sep" />
          <div className="paragraphe">
            <p>
              Les coordonnees de la station I.S.S.(International Space Station):
            </p>
            <p className="sentence">latitude: {this.state.latitude}</p>
            <p className="sentence">longitude: {this.state.longitude}</p>
            <p className="sentence">
              heure:{" "}
              <Time time={this.state.timestamp} utc="true" format="full" />
            </p>
            <button className="bouton" onClick={this.currentPosition}>
              Actualiser
            </button>
          </div>
          <Map center={coordonnees} zoom={2.5} className="container">
            <TileLayer attribution={attri2} url={attri} style={styles} />
            <Marker position={coordonnees}>
              <Popup>
                <span>Position Actuelle</span>
              </Popup>
            </Marker>
          </Map>
        </div>
      </div>
    );
  }
}

export default App;
