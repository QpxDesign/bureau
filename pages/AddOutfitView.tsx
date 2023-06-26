import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CameraView from './CameraView';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AddOutfitView() {
  const [showClothesDropdown, setShowClothesDropdown] = useState(false);
  const [clothingItemIDsChecked, setClothingItemIDsChecked] = useState([]);
  const [stars, setStars] = useState(1);
  return (
    <SafeAreaView
      style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 30,
          marginLeft: 10,
          marginVertical: 11,
          fontWeight: 'bold',
        }}>
        Add an Outfit
      </Text>
      <View style={{flexDirection: 'row', width: '90%'}}>
        <CameraView width={300} height={500} />
        <View style={{gap: 15}}>
          <TextInput
            placeholder="outfit name"
            placeholderTextColor={'gray'}
            style={styles.outfitInput}
            maxLength={40}
          />
          <View>
            <TouchableOpacity
              onPress={() => {
                setShowClothesDropdown(true);
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flexDirection: 'column'}}>
                <TextInput
                  placeholder="add clothes"
                  placeholderTextColor={'gray'}
                  style={styles.outfitInput}
                  maxLength={40}
                />
              </View>
              <Icon
                name="search"
                size={24}
                color="black"
                style={{position: 'absolute', right: 15}}
              />
            </TouchableOpacity>
            <View
              style={{
                marginLeft: 15,
                display: showClothesDropdown ? 'flex' : 'none',
              }}>
              <Text style={styles.dropdownItem}>a</Text>
              <Text>a</Text>
            </View>
          </View>
          <View style={{marginLeft: 15, flexDirection: 'row', gap: 5}}>
            <Icon
              name={'star'}
              size={40}
              color={'black'}
              onPress={() => {
                setStars(1);
              }}
            />
            <Icon
              name={stars > 1 ? 'star' : 'star-o'}
              size={40}
              color={'black'}
              onPress={() => {
                setStars(2);
              }}
            />
            <Icon
              name={stars > 2 ? 'star' : 'star-o'}
              size={40}
              color={'black'}
              onPress={() => {
                setStars(3);
              }}
            />
            <Icon
              name={stars > 3 ? 'star' : 'star-o'}
              size={40}
              color={'black'}
              onPress={() => {
                setStars(4);
              }}
            />
            <Icon
              name={stars > 4 ? 'star' : 'star-o'}
              size={40}
              color={'black'}
              onPress={() => {
                setStars(5);
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outfitInput: {
    borderRadius: 10,
    borderWidth: 3,
    padding: 15,
    fontSize: 24,
    width: 300,
    height: 30,
    marginVertical: 0,
    marginLeft: 15,
  },
  dropdownItem: {
    backgroundColor: 'lightgray',
    fontSize: 25,
  },
});
