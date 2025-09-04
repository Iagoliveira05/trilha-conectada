import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const ScanScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [scanned, setScanned] = useState(false); // Controlar se já leu QR Code
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setIsActive(true);
      setScanned(false);
      return () => setIsActive(false); // desativa quando sair da tela
    }, [])
  );

  if (!permission) return <View />;

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <ImageBackground
        source={require("../assets/backgroundScan.png")}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.message}>É necessário a permissão da câmera</Text>
          <TouchableOpacity
            style={styles.buttonRequest}
            onPress={requestPermission}
          >
            <Text
              style={{
                fontFamily: "Nunito_700Bold",
                fontWeight: 700,
                fontSize: 22,
                color: "#FFF",
              }}
            >
              Permitir
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  const handleBarCodeScanned = ({ data }) => {
    try {
      const jsonData = JSON.parse(data);

      setIsActive(false);
      setScanned(true);
      console.log(jsonData);
      navigation.navigate("DetailScreen", {
        qrDataString: jsonData,
      });
    } catch (error) {
      console.log("Não é um JSON válido:", data);
    }

    // Alert.alert("QR Code lido", `Tipo ${type}\nValor: ${data}`);
    // console.log("QR Code:", type, data);
  };

  return (
    <ImageBackground
      source={require("../assets/backgroundScan.png")}
      style={{ flex: 1 }}
    >
      <View style={styles.background}>
        <Text style={styles.title}>Escaneie</Text>
        {isActive && (
          <CameraView
            ref={cameraRef}
            facing="back"
            style={styles.camera}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          />
        )}

        {scanned && (
          <TouchableOpacity
            style={styles.buttonRequest}
            onPress={() => {
              setScanned(false);
            }}
          >
            <Text style={{ fontSize: 18 }}>Escanear de novo</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontWeight: 900,
    textShadowColor: "#21492dff",
    textShadowOffset: { width: 1, height: 1 }, // Horizontal and vertical offset
    textShadowRadius: 7, // Blur radius
    position: "absolute",
    top: 200,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 40,
    color: "#327045ff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    width: "50%",
    alignSelf: "center",
    color: "#062e12ff",
    fontFamily: "Nunito_700Bold",
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: 700,
  },
  camera: {
    width: 300,
    height: 300,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "#F9E9D2",
    alignSelf: "center",
    marginTop: 50,
  },
  buttonRequest: {
    backgroundColor: "#327045ff",
    marginTop: 15,
    width: "40%",
    alignSelf: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 14,
  },
});

export default ScanScreen;
