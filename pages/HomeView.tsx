import {
  Image,
  Text,
  SafeAreaView,
  View,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

export default function HomeView() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{height: '100%'}}>
      <Text
        style={{
          fontSize: 35,
          marginLeft: 10,
          marginTop: 11,
          fontWeight: 'bold',
        }}>
        Your Bureau
      </Text>
      <TouchableOpacity
        style={{position: 'absolute', right: 40, bottom: 40}}
        onPress={() => {
          navigation.navigate('AddOutfit');
        }}>
        <Icon name="pluscircle" size={85} color="black" />
      </TouchableOpacity>
      <View style={{width: '100%', alignItems: 'center'}}>
        <View
          style={{
            width: '98%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
          }}>
          <Image
            style={{height: 240, width: 180}}
            source={{
              uri: 'https://quinnpatwardhan.com/Assets/photos/image1.webp',
            }}></Image>
          <Image
            style={{height: 240, width: 180}}
            source={{
              uri: 'https://quinnpatwardhan.com/Assets/photos/image1.webp',
            }}></Image>
          <Image
            style={{height: 240, width: 180}}
            source={{
              uri: 'https://quinnpatwardhan.com/Assets/photos/image1.webp',
            }}></Image>
          <Image
            style={{height: 240, width: 180}}
            source={{
              uri: 'https://quinnpatwardhan.com/Assets/photos/image1.webp',
            }}></Image>
          <Image
            style={{height: 240, width: 180}}
            source={{
              uri: 'https://quinnpatwardhan.com/Assets/photos/image1.webp',
            }}></Image>
          <Image
            style={{height: 240, width: 180}}
            source={{
              uri: 'https://quinnpatwardhan.com/Assets/photos/image1.webp',
            }}></Image>
        </View>
      </View>
    </SafeAreaView>
  );
}
