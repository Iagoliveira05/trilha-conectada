import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BoxInformation = ({ title, data }) => {
  return (
    <View style={styles.background}>
      <Text style={styles.topicsText}>{title}</Text>
      <Text style={styles.dataText}>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#8aac94ff",
    padding: 10,
    borderRadius: 20,
    elevation: 20,
    flexDirection: "row",
    marginVertical: 5,
    paddingEnd: 55,
    alignItems: "center",
  },
  topicsText: {
    textShadowColor: "#000000ff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 9,
    color: "#FFF",
    fontSize: 20,
    fontWeight: 500,
    flex: 3,
  },
  dataText: {
    textAlign: "right",
    fontWeight: 450,
    fontSize: 20,
    flex: 2,
  },
});

export default BoxInformation;
