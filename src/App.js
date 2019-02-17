import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
//import { url } from "inspector";

class App extends Component {
  state = {
    latitude: 0,
    longitude: 0
  };

  isUpdate = () => {
    axios
      .get("https://api.open-notify.org/iss-now.json")
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
      "http://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background{z}/{x}/{y}.png";
    const attri2 =
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

    return (
      <div className="test">
        <div className="header" />
        <div className="App">
          <div className="paragraphe">
            <p className="title">Qu'est ce que l'I.S.S</p>
            <p>
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
            <p>latitude: {this.state.latitude}</p>
            <p>longitude: {this.state.longitude}</p>

            <button className="bouton" onClick={this.currentPosition}>
              Actualiser
            </button>
          </div>
          <Map center={coordonnees} zoom={3} className="container">
            <TileLayer attribution={attri2} url={attri} />
            <Marker position={coordonnees}>
              <Popup>
                <span>position actuelle</span>
              </Popup>
            </Marker>
          </Map>
        </div>
      </div>
    );
  }
}

export default App;
