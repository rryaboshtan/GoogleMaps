import React, { useState, useCallback, useRef } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import Apartments from './components/Apartments';
// import Search from './components/Search';
import './App.css';
// import '@reach/combobox/styles.css';
// import data from './skateboard-parks.js'
// import mapStyles from './mapStyles';

const markerImage = '/blueCircle.png';
const options = {
   // styles: mapStyles,
   disableDefaultUI: true,
   zoomControl: true,
};

const center = {
   lat: 50.4293321294912,
   lng: 30.452419950074063,
}

const data = [
   {
      lat: 50.42711686105861,
      lng: 30.453401587110793,
      time: new Date(),
      icon: markerImage,
      apartmentInfo: {
         image: '/flat1.jpg',
         description: 'Квартира подобово в Києві, центр vip',
         cost: '1500 грн / доба',
         areaOfCity: 'Киев, Печерский район, Украина',
      },
   },
   {
      lat: 50.42677371631405,
      lng: 30.454774731468667,
      time: new Date(),
      icon: markerImage,
      apartmentInfo: {
         image: '/flat2.jpg',
         description: '1-комнатная ул.Мельникова',
         cost: 'від 550 грн/доба',
         areaOfCity: 'Киев, Шевченковский район, Украина',
      },
   },
   {
      lat: 50.42852807809127,
      lng: 30.451891886960425,
      time: new Date(),
      icon: markerImage,
      apartmentInfo: {
         image: '/flat3.jpg',
         description: 'Двухместный номер с двуспальной кроватью и кондиционером Саксаганского',
         cost: '650 грн/доба',
         areaOfCity: 'Саксаганского улица, Киев, Печерский район, Украина',
      },
   },
   {
      lat: 50.42852807809127,
      lng: 30.451891886960425,
      time: new Date(),
      icon: markerImage,
      apartmentInfo: {
         image: '/flat3.jpg',
         description: 'Двухместный номер с двуспальной кроватью и кондиционером Саксаганского',
         cost: '650 грн/доба',
         areaOfCity: 'Саксаганского улица, Киев, Печерский район, Украина',
      },
   },
];

function App() {
   const [markers, setMarkers] = useState([]);
   const [selected, setSelected] = useState(null);

   const onMapClick = useCallback(event => {
      setMarkers(current => [
         ...current,
         {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
            icon: markerImage,
         },
      ]);
   }, []);

   // const mapRef = useRef();
   // const onMapLoad = useCallback(map => {
   //    mapRef.current = map;
   // }, []);

   // const panTo = useCallback(({ lat, lng }) => {
   //    mapRef.current.panTo({ lat, lng });
   //    mapRef.current.setZoom(14);
   // }, []);

   const MyMapComponent = withScriptjs(
      withGoogleMap(() => (
         <GoogleMap
            defaultZoom={17}
            
            defaultCenter={center}
            options={options}
            onClick={onMapClick}
            // onLoad={onMapLoad}
         >
            {markers.map((marker, outerIndex) => (
               <Marker
                  key={marker.time.toISOString()}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  icon={{
                     url: marker.icon,
                  }}
                  onClick={() => {
                     setSelected({
                        marker,
                        apartmentInfo: {
                           image: '/flat1.jpg',
                           description: 'Квартира подобово в Києві, центр vip',
                           cost: '1500 грн / доба',
                           areaOfCity: 'Киев, Печерский район, Украина',
                        }
                     });
                     console.log( selected );
                     setMarkers(current =>
                        current.map((marker, index) =>
                           index === outerIndex
                              ? { ...marker, icon: '/orangeCircle1.png' }
                              : { ...marker, icon: markerImage }
                        )
                     );
                  }}
               ></Marker>
            ))}

            {
               (
                  <Apartments data={data} selected={selected}></Apartments>
               )
            }
         </GoogleMap>
      ))
   );

   return (
      <div className='map-container'>
         <h1>
            <span>Bears🎪</span>
         </h1>

         {/* <Search panTo={panTo} /> */}
         <MyMapComponent
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=places,geometry,drawing`}
            loadingElement={<div className='full-size' />}
            containerElement={<div className='full-size' />}
            mapElement={<div className='full-size' />}
            // onLoad={onMapLoad}
         />
      </div>
   );
}

export default App;