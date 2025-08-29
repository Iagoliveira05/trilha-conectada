import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getCoins } from "../coin_data/coinService";
import { useFocusEffect } from "@react-navigation/native";

const RewardScreen = () => {
  const [coins, setCoinsState] = useState(0);

  // Carrega moedas sempre que a tela ficar em foco
  useFocusEffect(
    useCallback(() => {
      const loadCoins = async () => {
        setCoinsState(await getCoins());
      };
      loadCoins();
    }, [])
  );

  return (
    <View
      style={{
        backgroundColor: "#F9E9D2",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Text style={styles.title}>Recompensas</Text>
      <Image
        style={styles.imageStyle}
        source={require("../assets/img-reward.png")}
      />
      <View style={styles.backgroundCoinsText}>
        <Text style={styles.coinsText}>{getCoins()}</Text>
        <Image
          style={styles.coinsImage}
          source={require("../assets/coin-colorida.png")}
        />
      </View>

      <Text style={styles.informacaoText}>
        Escaneie QR Code para ganhar mais moedas
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Nunito_700Bold",
    marginTop: 70,
    marginBottom: 60,
    textAlign: "center",
    fontSize: 40,
    color: "#264C36",
  },
  imageStyle: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginBottom: 40,
  },
  backgroundCoinsText: {
    flexDirection: "row",
    backgroundColor: "#264C36",
    width: 130,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: "center",
  },
  coinsText: {
    fontSize: 50,
    color: "#e7e7e7ff",
    width: "100%",
    textAlign: "center",
    fontFamily: "Nunito_700Bold",
  },
  coinsImage: {
    width: 35,
    height: 35,
    alignSelf: "flex-end",
  },
  informacaoText: {
    fontSize: 16,
    marginTop: 30,
  },
});

export default RewardScreen;
