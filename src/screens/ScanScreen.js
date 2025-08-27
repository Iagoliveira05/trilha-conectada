import React, { useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useFocusEffect } from "@react-navigation/native";

const ScanScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isActive, setIsActive] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsActive(true);
      return () => setIsActive(false); // desativa quando sair da tela
    }, [])
  );

  if (!permission) return <View />;

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <Text style={styles.title}>Escanear QR Code</Text>
      {isActive && (
        <CameraView ref={cameraRef} facing="back" style={styles.camera} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#508165ff",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "900",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    width: 300,
    height: 300,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "#30503eff",
    alignSelf: "center",
    marginTop: 50,
  },
});

export default ScanScreen;
