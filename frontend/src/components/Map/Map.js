import React, { useState, useEffect } from 'react'
import { GoogleMap, OverlayView, Marker, useLoadScript, } from '@react-google-maps/api'
import mapStyles from '../../shared/mapStyles.json'
import banner from '../../assets/info_banner.png'
import marker from '../../assets/marker.svg'
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import { useLocationContext } from '../../context/useCurrentLocation';


const locations = [
  {
    text: "Manfred's Bakery",
    labelOrigin: { x: 85, y: 14 },
    location: { lat: 47.673862, lng: 9.179261 }
  },
  {
    text: "Jenny's Shop",
    labelOrigin: { x: 70, y: 14 },
    location: { lat: 47.671899, lng: 9.179291 }
  }
]

const Map = () => {
  const [t] = useTranslation();
  const [showInfo, setShowInfo] = useState(false)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCHTt_h9Drz0TcymU_qmYQWI2zvnsQkkQc"
  })

  const { setCurrentLocation, coordinates: [lng, lat] } = useLocationContext()

  const mountOnce = () => {
    setCurrentLocation();
    const unmount = () => console.log('unmounted');
    return unmount
  }

  useEffect(mountOnce, []);

  if (loadError) {
    return <div>{t('cantLoadMap')}</div>
  }

  const mapJsx = <GoogleMap
    mapContainerClassName="Map"
    zoom={16}
    center={{lng, lat}}
    options={{ styles: mapStyles }}
  >
    {locations.map( loc =>
      <Marker
        key={loc.text}
        position={loc.location}
        icon={{
          url: marker,
          labelOrigin: loc.labelOrigin,
        }}
        label={{
          text: loc.text,
          fontWeight: 'bold',
          fontSize: '12px',
        }}
        onClick={() => setShowInfo(!showInfo)}
      />
    )}

    <OverlayView
      position={{lng, lat}}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div className={`Map-infoWrapper ${showInfo && 'Map-infoWrapper--visible'}`}>
        <img className="Map-infoImg" src={banner} alt="banner"/>
        <div className="Map-info">
          <h2>Manfred's Bakery</h2>
          <p>Only the finest, hand sorted ingredients</p>
          <Button to="/stores/1" label={t('goToStoreButton')}/>
        </div>
      </div>
    </OverlayView>
  </GoogleMap>;


  return isLoaded && mapJsx;
};

export default Map
