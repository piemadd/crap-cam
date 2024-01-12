import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, Image } from 'react-native';
import { LightSensor } from 'expo-sensors';
import { Camera, CameraType } from 'expo-camera';

export default function App() {
  const [{ illuminance }, setData] = useState({ illuminance: 0 });
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    requestPermission();
  }

  useEffect(() => {
    console.log(Camera)
  }, [])

  useEffect(() => {
    toggleSensor();

    return () => {
      unsubscribeFromSensor();
    };
  }, []);

  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const toggleSensor = () => {
    if (this._subscription) {
      unsubscribeFromSensor();
    } else {
      subscribeToSensor();
    }
  };

  const subscribeToSensor = () => {
    this._subscription = LightSensor.addListener((data) => {
      //just in case i wanna play around with the data more
      setData(data);
    })
    //this._subscription = LightSensor.addListener(setData);
  };

  const unsubscribeFromSensor = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  return (
    <>
      <View style={styles.sensor}>
        <Text style={{
          fontSize: 32
        }}>CRAP CAM :trol:</Text>
        <Text>Light Sensor:</Text>
        <Text>
          Illuminance: {Platform.OS === 'android' ? `${illuminance.toFixed(2)} lx - rgba(255, 255, 255, ${(illuminance / 50).toFixed(2)})` : `Only available on Android`}
        </Text>
        <View style={{ backgroundColor: `rgba(255, 255, 255, ${(illuminance / 50).toFixed(2)})`, width: 100, height: 100 }} />
        <Camera style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <Image
              style={styles.unregHyper}
              source={require('./assets/unreghyper.png')}
            />
          </View>
        </Camera>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  sensor: {
    marginTop: 45,
    paddingHorizontal: 10,
    backgroundColor: '#666',
    width: '100%',
    height: '100%',
  },
  camera: {
    width: 400,
    height: 100,
  },
  buttonContainer: {
    width: 400,
    height: 400
  }
});
