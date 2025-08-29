import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
            }}
          >
            Permitir
          </Text>
        </TouchableOpacity>
      </View>
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
    <View style={styles.background}>
      <Text style={styles.title}>Escanear QR Code</Text>
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
  );
};

const styles = StyleSheet.create({
  background: {
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontFamily: "Nunito_700Bold",
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 40,
    color: "#F9E9D2",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    color: "#FFF",
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
    backgroundColor: "#F9E9D2",
    marginTop: 15,
    width: "40%",
    alignSelf: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 14,
  },
});

export default ScanScreen;
