import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Switch } from "react-native";
import { Produit } from "../services/produit.service";

interface ProduitItemProps {
  produit: Produit;
  onDelete: (nom: string, prix: number, quantite: number) => void;
}

export default class ProduitItem extends Component<ProduitItemProps, {}> {
  removeItem = () => {
    const { onDelete } = this.props;
    onDelete(
      this.props.produit.nom,
      this.props.produit.prix,
      this.props.produit.quantite
    );
  };

  render() {
    const text = this.props.produit.nom;
    const prix = this.props.produit.prix;
    const quantite = this.props.produit.quantite;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.text}> {prix}</Text>
        <Text style={styles.text}>{quantite}</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={this.removeItem}>
            <Text style={styles.removeIcon}> &times; </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    marginBottom: 10,
  },
  text: {
    flex: 9,
    color: "white",
    fontSize: 14,
  },
  actionsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "orange",
  },
  removeIcon: {
    color: "red",
    fontSize: 26,
  },
});
