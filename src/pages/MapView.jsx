import React from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { icon } from "leaflet";
import { setPath } from "../app/slices/flightSlice";

const MapView = ({ openDetail, setShowDetail }) => {
  const dispatch = useDispatch();
  const { flights, path } = useSelector((store) => store);

  const planeIcon = icon({
    iconUrl: "/plane-icon.png",
    iconSize: [30, 30],
  });
  return (
    <>
      {/* harita alanı */}
      <MapContainer
        center={[39.146078, 34.159499]}
        zoom={6}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Her bir uçuş için uçağın komumuna göe denk gelen marker basma */}
        {flights?.map((fly) => (
          <Marker icon={planeIcon} key={fly.id} position={[fly.lat, fly.lan]}>
            <Popup>
              <div className="d-flex gap-2 px-2 flex-column justify-content-center align-items-center">
                <span className="fw-bold">Code: {fly.code}</span>

                <button
                  onClick={() => openDetail(fly.id)}
                  className="btn  btn-sm bg-dark text-light w-100"
                >
                  Detail
                </button>
                <button
                  onClick={() => dispatch(setPath([]))}
                  className="btn  btn-sm bg-dark text-light w-100"
                >
                  Clear Route
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        <Polyline positions={path} />
      </MapContainer>
    </>
  );
};

export default MapView;
