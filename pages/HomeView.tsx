import {
  Image,
  Text,
  SafeAreaView,
  View,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import RNFS, {read} from 'react-native-fs'; // https://blog.logrocket.com/how-to-access-file-systems-react-native/
import {useFocusEffect} from '@react-navigation/native';

export default function HomeView() {
  const navigation = useNavigation();
  const [outfits, setOutfits] = useState([]);
  useEffect(() => {
    readOutfits();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      readOutfits();
      return () => {};
    }, []),
  );
  function readOutfits() {
    var path = RNFS.DocumentDirectoryPath + '/outfits.json';

    RNFS.exists(path).then(fileExists => {
      if (fileExists) {
        RNFS.readFile(path).then(oldFile => {
          setOutfits(JSON.parse(oldFile));
        });
      }
    });
  }
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Text
        style={{
          fontSize: 30,
          marginLeft: 10,
          marginTop: 11,
          fontWeight: 'bold',
        }}>
        Your Bureau
      </Text>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 40,
          bottom: 40,
          zIndex: 9999,
          backgroundColor: 'white',
          borderRadius: 100,
        }}
        onPress={() => {
          navigation.navigate('AddOutfit');
        }}>
        <Icon
          name="pluscircle"
          size={85}
          color="black"
          style={{zIndex: 9999}}
        />
      </TouchableOpacity>
      <View style={{width: '100%', alignItems: 'center'}}>
        <View
          style={{
            width: '98%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
          }}>
          {outfits.map((item: any) => {
            return (
              <Image
                style={{height: 200, width: 150}}
                source={{
                  uri:
                    'file://' +
                    RNFS.DocumentDirectoryPath +
                    '/assets/' +
                    item?.id +
                    '.jpeg',
                }}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
