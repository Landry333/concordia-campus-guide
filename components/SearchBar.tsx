import React, { Component } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Dimensions, StyleSheet, ScrollView} from "react-native";
import Colors from "../constants/Colors";
import Location from '../classes/location';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

const styles = StyleSheet.create({

    container:{
        width: Dimensions.get('window').width - 50,
        position: 'absolute',
        zIndex: 3,
        top: 50,
    },
    
    row:{
        backgroundColor: Colors.white,
    },
    textinput:{
     height:"100%",
    },
    textInputContainer:{
        backgroundColor:Colors.white,
        borderTopWidth: 0,
        borderBottomWidth:0,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.84,
        elevation: 2,
    },
    description: {
        fontWeight: 'bold',
    },
    predefinedPlacesDescription: {
        color: Colors.searchBarPlaces,
    },
    listView: {
        color: Colors.black, //To see where exactly the list is
        position: 'absolute',
        top:40,
    },
});

type searchBarProps = {
    displaySearchLocation(lat, lng): void;
};

type searchBarState = {
    latitude:number;
    longitude:number;
}

class SearchBar extends Component<searchBarProps, searchBarState> {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
        };
    }

    displaySearchLocation = (lat, lng) => {
        const { displaySearchLocation } = this.props;
        displaySearchLocation(lat, lng);
    };
   render(){
       return (
          
               <GooglePlacesAutocomplete
                   placeholder='Search'
                   minLength={2} // minimum length of text to search
                   autoFocus={false}
                   returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                   keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                   listViewDisplayed='true'    // true/false/undefined
                   fetchDetails={true}
                   renderDescription={row => row.description} // custom description render
                   onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                       // Alert.alert("data", JSON.stringify(data));
                       // Alert.alert("details", JSON.stringify(details));
                       this.displaySearchLocation(details.geometry.location.lat, details.geometry.location.lng);
                       console.log(data, details);
                   }}
                   onBlur={() => console.log(this.refs.textInput._lastNativeText)}
                   getDefaultValue={() => ''}

                   query={{
                       // available options: https://developers.google.com/places/web-service/autocomplete
                       key: 'AIzaSyD2zBl0yHV6qzUTUkMZe0gBRBoSpqmlSxU',
                       language: 'en', // language of the results
                       location: '45.496628, -73.578804', //Centered around hall building
                       radius: '80000'
                   }}

                   styles={styles}

                   currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                   currentLocationLabel="Current Location"
                   nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                   GoogleReverseGeocodingQuery={{
                       // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                   }}
                   GooglePlacesSearchQuery={{
                       /* Will be useful for Issue #37 */
                       // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                       rankby: 'distance',
                       type: 'cafe'
                   }}
                   
                   GooglePlacesDetailsQuery={{
                       // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                       //fields: 'formatted_address',
                   }}

                   filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                  // predefinedPlaces={[homePlace, workPlace]}
                   clearButtonMode="always"
                   debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    //renderLeftButton={()  => <Image source={require('../assets/search.png')} />}
                   // renderRightButton={() => <Text>Custom text after the input</Text>} 
               />
      
       );
   }
}
export default SearchBar;