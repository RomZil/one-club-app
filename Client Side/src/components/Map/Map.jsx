import "./Map.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = new L.Icon({
  iconUrl: require("../../images/spot.png"),
  iconSize: new L.Point(40, 25),
});

function Map({ lat, lng }) {
  return (
    <div className="MapComponent">
      <MapContainer
        style={{
          zIndex: 10,
          height: "80vh",
          width: "80vw",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={icon}>
          <Popup></Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
