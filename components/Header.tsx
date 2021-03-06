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
    color: "#131313",
    top: "2%",
    fontSize: 20,
    fontWeight: "bold",
    right: 16,
  },
  header: {
    height: 100,
    width: "100%",
    backgroundColor: "#53b1b1",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
