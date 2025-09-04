import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { addCoins } from "../coin_data/coinService";
import BoxInformation from "../components/BoxInformation";
import ExpandableBoxInformation from "../components/ExpandableBoxInformation";

const handleAdd = async () => {
  await addCoins(1);
};

function Header({ navigation }) {
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={34} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalhes</Text>
      </View>
      <View style={styles.bottomShadow} />
    </View>
  );
}

function InfoFauna({ data }) {
  return (
    <View>
      <Text style={styles.titleText}>{data.nome}</Text>
      <Text style={styles.subtitleText}>{data.nomeCientifico}</Text>
      <Image source={{ uri: data.imagem }} style={styles.imageStyle} />

      <BoxInformation title="Classificação" data={data.classificacao} />

      <ExpandableBoxInformation title="Alimentação" data={data.alimentacao} />
      <ExpandableBoxInformation
        title="Comportamento"
        data={data.comportamento}
      />
      <ExpandableBoxInformation
        title="Ciclo Ecológico"
        data={data.cicloEcologico}
      />
      <ExpandableBoxInformation
        title="Status De Conservação"
        data={data.statusConservacao}
      />
      <ExpandableBoxInformation title="Curiosidade" data={data.curiosidade} />
      <ExpandableBoxInformation
        title="Tamanho Médio"
        data={data.tamanhoMedio}
      />
      <ExpandableBoxInformation title="Peso Médio" data={data.pesoMedio} />
    </View>
  );
}

function InfoFlora({ data }) {}

function InfoDesconhecida({ data }) {}

function ShowInfos({ data }) {
  if (data.tipo == "Fauna") {
    return InfoFauna({ data });
  } else if (data.tipo == "Flora") {
    return InfoFlora({ data });
  } else {
    return InfoDesconhecida();
  }
}

const DetailScreen = ({ route }) => {
  const { qrDataString } = route.params || {};
  const data = JSON.parse(qrDataString);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          backgroundColor: "#5c7463ff",
          padding: 20,
          paddingBottom: 40,
        }}
      >
        {data ? (
          <>
            <ShowInfos data={data} />
            <TouchableOpacity
              style={styles.recompensaButton}
              onPress={() => {
                handleAdd();
                navigation.goBack();
              }}
            >
              <Text style={styles.recompensaText}>Resgatar Recompensa</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text>QR Code vazio ou inválido</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#264C36",
    paddingLeft: 15,
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
    marginLeft: 10,
    fontSize: 28,
    fontFamily: "Nunito_700Bold",
    fontWeight: 700,
    color: "#FFF",
  },
  titleText: {
    textShadowColor: "#000000ff",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    textAlign: "center",
    fontSize: 25,
    fontWeight: 900,
    color: "#FFF",
  },
  subtitleText: {
    textShadowColor: "#000000ff",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 500,
    fontStyle: "italic",
    color: "#ffffffc4",
  },
  imageStyle: {
    width: 350,
    height: 300,
    alignSelf: "center",
    borderRadius: 30,
    marginVertical: 10,
    elevation: 10,
  },
  recompensaButton: {
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
    width: "70%",
    backgroundColor: "#b4c781ff",
    borderRadius: 10,
  },
  recompensaText: {
    color: "#313131ff",
    fontFamily: "Nunito_700Bold",
    fontSize: 20,
    fontWeight: 900,
    textAlign: "center",
    padding: 10,
  },
});

export default DetailScreen;
