import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const visits = [
  { lat: -23.55052, lng: -46.633308, name: 'Cliente A', date: '2026-02-15' },
  { lat: 40.712776, lng: -74.005974, name: 'Cliente B', date: '2026-02-16' },
];

export default function MapWidget() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-2">Mapa de Visitas</h3>
      <MapContainer center={[-23.55052, -46.633308]} zoom={2} style={{ height: '300px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {visits.map((v, idx) => (
          <Marker key={idx} position={[v.lat, v.lng]}>
            <Popup>
              <strong>{v.name}</strong><br />
              Data: {v.date}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
