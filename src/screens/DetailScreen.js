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
  Alert,
} from "react-native";
import {
  addCoins,
  addIdList,
  clearAll,
  existsInList,
} from "../coin_data/coinService";
import BoxInformation from "../components/BoxInformation";
import ExpandableBoxInformation from "../components/ExpandableBoxInformation";
import FlashMessage, { showMessage } from "react-native-flash-message";

const images = {
  1: require("../assets/fauna/1.jpg"),
  2: require("../assets/fauna/2.jpg"),
  3: require("../assets/fauna/3.jpg"),
  4: require("../assets/fauna/4.jpg"),
  5: require("../assets/fauna/5.jpg"),
  6: require("../assets/fauna/6.jpg"),
  7: require("../assets/fauna/7.jpg"),
  15: require("../assets/fauna/15.jpg"),

  8: require("../assets/flora/8.jpg"),
  9: require("../assets/flora/9.jpg"),
  10: require("../assets/flora/10.jpg"),
  11: require("../assets/flora/11.jpg"),
  12: require("../assets/flora/12.jpg"),
  14: require("../assets/flora/14.jpg"),
  13: require("../assets/flora/13.jpg"),
};

const handleAdd = async (id) => {
  showMessage({
    // Recompensa já resgatada
    message: "Resgatada com sucesso!",
    type: "success",
    icon: "auto",
  });
  await addCoins(1);
  await addIdList(id);
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
      <Image source={images[data.id]} style={styles.imageStyle} />

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

function InfoFlora({ data }) {
  return (
    <View>
      <Text style={styles.titleText}>{data.nome}</Text>
      <Text style={styles.subtitleText}>{data.nomeCientifico}</Text>
      <Image source={images[data.id]} style={styles.imageStyle} />

      <BoxInformation title="Classificação" data={data.classificacao} />

      <ExpandableBoxInformation
        title="Ciclo Ecológico"
        data={data.cicloEcologico}
      />
      <ExpandableBoxInformation
        title="Condições Ambientais"
        data={data.condicoesAmbientais}
      />
      <ExpandableBoxInformation
        title="Localização"
        data={data.informacoesLocal}
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
    </View>
  );
}

function ShowInfos({ data }) {
  if (data.tipo == "Fauna") {
    return InfoFauna({ data });
  }
  if (data.tipo == "Flora") {
    return InfoFlora({ data });
  }
}

const DetailScreen = ({ route }) => {
  const { qrDataString } = route.params || {};
  const data = JSON.parse(qrDataString);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <FlashMessage position="bottom" />
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
              onPress={async () => {
                {
                  (await existsInList(data.id))
                    ? showMessage({
                        // Recompensa já resgatada
                        message: "Recompensa já resgatada!",
                        type: "danger",
                        icon: "auto",
                      })
                    : handleAdd(data.id); // Resgatar recomepensa
                }
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
  recompensaResgatadaButton: {
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
    width: "70%",
    backgroundColor: "#5e6845ff",
    borderRadius: 10,
  },
  recompensaResgatadaText: {
    color: "#dadadaff",
    fontFamily: "Nunito_700Bold",
    fontSize: 20,
    fontWeight: 900,
    textAlign: "center",
    padding: 10,
  },
});

export default DetailScreen;
