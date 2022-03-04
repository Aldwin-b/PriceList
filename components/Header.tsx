import * as React from "react";
import { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Header extends Component<{}, Header> {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>Produit</Text>
        <Text style={styles.text}>Prix</Text>
        <Text style={styles.text}>Quantité</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: "#000",
    top: "2%",
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    height: 100,
    width: "100%",
    backgroundColor: "green",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
