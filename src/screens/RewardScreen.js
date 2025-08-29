import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getCoins, setCoins } from "../coin_data/coinService";
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
    <View>
      <Text>RewardScreen</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#a52e2eff",
          width: "40%",
          alignSelf: "center",
        }}
      >
        <Text>Botão treste</Text>
      </TouchableOpacity>
      <Text style={{ alignSelf: "center", fontSize: 30 }}>{coins}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RewardScreen;
