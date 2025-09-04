import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const ExpandableBoxInformation = ({ title, data }) => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setExpanded(!isExpanded)}
      style={styles.background}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.topicsText}>{title}</Text>
        <Image
          style={styles.imageArrow}
          source={
            isExpanded
              ? require("../assets/up-arrow.png")
              : require("../assets/down-arrow.png")
          }
        />
      </View>

      {isExpanded ? <Text style={styles.dataText}>{data}</Text> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#8aac94ff",
    padding: 10,
    borderRadius: 20,
    elevation: 20,
    marginVertical: 5,
  },
  topicsText: {
    textShadowColor: "#000000ff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 9,
    color: "#FFF",
    fontSize: 20,
    fontWeight: 700,
    flex: 3,
  },
  imageArrow: {
    width: 20,
    height: 20,
    marginEnd: 20,
    tintColor: "#3d4b40ff",
  },
  dataText: {
    paddingStart: 7,
    fontWeight: 450,
    marginTop: 10,
    fontSize: 20,
    flex: 2,
  },
});

export default ExpandableBoxInformation;
