import React, {useRef, useState} from 'react';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';

interface CameraViewProps {
  width: number;
  height: number;
  handoffPhoto: Function;
}

export default function CameraView(props: CameraViewProps) {
  const [photo, setPhoto]: any = useState();

  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.front;
  async function photoTaker() {
    if (camera !== null && camera.current !== null) {
      await camera.current
        .takePhoto({
          flash: 'off',
        })
        .then(p => {
          setPhoto(p);
          props.handoffPhoto(p);
          console.log(p);
        });
    }
  }
  if (camera === null || device?.id === undefined) {
    return (
      <View
        style={{
          height: props.height,
          width: props.width,
          backgroundColor: 'black',
          borderRadius: 25,
        }}></View>
    );
  }
  if (photo === undefined || photo === null) {
    return (
      <View>
        <View
          style={{
            position: 'absolute',
            zIndex: 99,
            flex: 1,
            width: props.width,
            height: props.height,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              photoTaker();
            }}
            style={{
              borderColor: 'white',
              borderWidth: 10,
              width: 100,
              height: 100,
              marginBottom: 20,
              borderRadius: 100,
            }}></TouchableOpacity>
        </View>
        <Camera
          style={{
            borderRadius: 25,
            height: props.height,
            width: props.width,
          }}
          device={device}
          isActive={true}
          ref={camera}
          photo={true}
          orientation="landscapeLeft"
        />
      </View>
    );
  } else {
    return (
      <SafeAreaView>
        <Image
          source={{uri: photo.path}}
          style={{
            borderRadius: 25,
            height: props.height,
            width: props.width,
          }}
        />
      </SafeAreaView>
    );
  }
}
