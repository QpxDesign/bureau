import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CameraView from './CameraView';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFS from 'react-native-fs'; // https://blog.logrocket.com/how-to-access-file-systems-react-native/
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';

export default function AddOutfitView() {
  const navigation = useNavigation();

  const [showClothesDropdown, setShowClothesDropdown] = useState(false);
  const [clothingItemIDsChecked, setClothingItemIDsChecked] = useState([]);
  const [stars, setStars] = useState(5);
  const [outfitName, setOutfitName]: any = useState('');
  const [photoPath, setPhotoPath]: any = useState('');

  const [d, setD] = useState('');
  useEffect(() => {
    setD(RNFS.DocumentDirectoryPath);
  }, []);
  function handlePhotoHandoff(p: any) {
    setPhotoPath(p.path);
  }
  function resetOutfits() {
    var path = RNFS.DocumentDirectoryPath + '/outfits.json';

    RNFS.exists(path).then(fileExists => {
      if (fileExists) {
        RNFS.writeFile(path, '');
      }
    });
  }
  async function handleSubmit() {
    var outfitID = String(uuid.v4());
    var path = RNFS.DocumentDirectoryPath + '/outfits.json';
    var assetsPath = RNFS.DocumentDirectoryPath + '/assets/';

    try {
      RNFS.exists(path).then(fileExists => {
        if (fileExists) {
          RNFS.readFile(path).then(oldFile => {
            RNFS.mkdir(assetsPath);
            RNFS.moveFile(photoPath, assetsPath + outfitID + '.jpeg');
            if (oldFile.length < 5) {
              var c = JSON.stringify([
                {
                  id: outfitID,
                  name: outfitName,
                },
              ]);

              RNFS.writeFile(path, c);
            } else {
              var c1 = JSON.parse(oldFile);
              console.log('c1 ' + c1);
              c1.push({
                id: outfitID,
                name: outfitName,
              });

              RNFS.writeFile(path, JSON.stringify(c1));
              console.log('written');
            }
          });
        } else {
          RNFS.writeFile(path, '[]');
        }
      });
      //create a file at filePath. Write the content data to it
    } catch (error) {
      //if the function throws an error, log it out.
      console.log(error);
    }
  }
  function readOutfits() {
    var path = RNFS.DocumentDirectoryPath + '/outfits.json';

    RNFS.exists(path).then(fileExists => {
      if (fileExists) {
        RNFS.readFile(path).then(oldFile => {
          console.log(JSON.parse(oldFile));
        });
      }
    });
  }
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
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',

          zIndex: 0,
        }}
        onPress={() => {
          setShowClothesDropdown(false);
        }}></TouchableOpacity>
      <ScrollView style={{width: '100%'}}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              width: '95%',
              flexWrap: 'wrap',
              gap: 10,
              justifyContent: 'center',
              paddingBottom: 100,
            }}>
            <CameraView
              width={300}
              height={500}
              handoffPhoto={handlePhotoHandoff}
            />
            <View
              style={{
                gap: 15,
              }}>
              <TextInput
                value={outfitName}
                onChangeText={s => {
                  setOutfitName(s);
                }}
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
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    width: 300,
                  }}>
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
                    position: 'absolute',
                    top: '100%',
                    backgroundColor: 'red',
                    width: '100%',
                    zIndex: 9999,
                    display: showClothesDropdown ? 'flex' : 'none',
                  }}>
                  <Text style={styles.dropdownItem}>a</Text>
                  <Text style={styles.dropdownItem}>a</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,

                  zIndex: -1,
                }}>
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
              <View
                style={{
                  alignItems: 'flex-end',
                  width: 300,
                  position: 'absolute',
                  bottom: 0,
                  zIndex: 999,
                  flex: 1,
                  backgroundColor: 'red',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    handleSubmit().then(() => {
                      navigation.navigate('Home');
                    });
                  }}
                  style={{
                    backgroundColor: '#6d28d9',
                    paddingVertical: 5,
                    borderRadius: 10,
                    paddingHorizontal: 25,
                    shadowOffset: {width: -3, height: 3},
                    shadowRadius: 10,
                    shadowColor: '#6d28d9',
                    shadowOpacity: 1,
                    overflow: 'visible',
                    position: 'absolute',
                  }}>
                  <Text
                    style={{fontSize: 22, color: 'white', fontWeight: '900'}}>
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outfitInput: {
    borderRadius: 10,
    borderWidth: 3,
    paddingLeft: 5,
    paddingVertical: 5,
    fontSize: 24,
    width: 300,
    marginVertical: 0,
  },
  dropdownItem: {
    backgroundColor: 'lightgray',
    fontSize: 25,
    zIndex: 9999,
  },
});

/* DEBUG BUTTONS
 <TouchableOpacity
              onPress={() => {
                readOutfits();
              }}
              style={{
                marginLeft: 'auto',
                backgroundColor: '#6d28d9',
                paddingVertical: 5,
                borderRadius: 10,
                paddingHorizontal: 25,
                shadowOffset: {width: -3, height: 3},
                shadowRadius: 10,
                shadowColor: '#6d28d9',
                shadowOpacity: 1,
                overflow: 'visible',
                marginRight: 15,
              }}>
              <Text style={{fontSize: 22, color: 'white', fontWeight: '900'}}>
                Read
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                resetOutfits();
              }}
              style={{
                marginLeft: 'auto',
                backgroundColor: '#6d28d9',
                paddingVertical: 5,
                borderRadius: 10,
                paddingHorizontal: 25,
                shadowOffset: {width: -3, height: 3},
                shadowRadius: 10,
                shadowColor: '#6d28d9',
                shadowOpacity: 1,
                overflow: 'visible',
                marginRight: 15,
              }}>
              <Text style={{fontSize: 22, color: 'white', fontWeight: '900'}}>
                Reset
              </Text>
            </TouchableOpacity>
*/
