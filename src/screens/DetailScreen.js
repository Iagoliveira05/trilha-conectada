import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

function Header() {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#222222ff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalhes</Text>
      </View>
      <View style={styles.bottomShadow} />
    </View>
  );
}

function ShowInfos({ data }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.titleText}>{data.especie}</Text>
      <Text style={styles.subtitleText}>{data.nomeCientifico}</Text>

      <Text style={styles.topicsText}>Curiosidade</Text>
      <Text style={styles.dataText}>{data.curiosidade}</Text>

      <Text style={styles.topicsText}>Comportamento</Text>
      <Text style={styles.dataText}>{data.comportamento}</Text>

      <Image source={{ uri: data.imagem }} style={styles.imageStyle} />
    </View>
  );
}

const DetailScreen = ({ route }) => {
  const { qrDataString } = route.params || {};
  const data = JSON.parse(qrDataString);
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ padding: 20, flex: 1 }}>
        {data ? (
          <>
            <ShowInfos data={data} />
          </>
        ) : (
          <Text>QR Code vazio ou inválido</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    height: 70,
  },
  bottomShadow: {
    height: 4, // altura da sombra
    backgroundColor: "#000", // cor da sombra
    opacity: 0.07, // intensidade
    elevation: 5, // sombra no Android
    shadowColor: "#000", // iOS fallback
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 3.84,
  },
  headerText: {
    marginLeft: 20,
    fontSize: 20,
  },
  titleText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: 700,
  },
  subtitleText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 500,
    fontStyle: "italic",
    marginBottom: 20,
  },
  topicsText: {
    fontSize: 20,
    fontWeight: 500,
  },
  dataText: {
    fontSize: 15,
    marginStart: 5,
    marginBottom: 20,
  },
  imageStyle: {
    width: 300,
    height: 300,
    alignSelf: "center",
    borderRadius: 30,
    marginTop: 30,
  },
});

export default DetailScreen;
