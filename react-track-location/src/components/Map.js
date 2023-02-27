import { MapContainer, TileLayer, useMapEvent, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';

export default function Map() {

  const [positions, setPositions] = useState([]);
  const onLocationFound = e => {
    const latlng = e.latlng;
    setPositions([...positions, latlng]);
  };
  
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100vh' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationControl onLocationFound={onLocationFound} />
      <Polyline positions={positions} pathOptions={{ color: 'red' }} />
    </MapContainer>
  );
}

function LocationControl({ onLocationFound }) {
  const map = useMapEvent('locationfound', onLocationFound);
  useEffect(() => {
    map.locate();
  }, [map]);
  return null;
}
