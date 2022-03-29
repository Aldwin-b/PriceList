import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Switch } from "react-native";
import { Produit } from "../services/produit.service";

interface ProduitItemProps {
  produit: Produit;
  onDelete: (nom: string) => void;
  onToggle: (nom: string) => void;
}

export default class ProduitItem extends Component<ProduitItemProps, {}> {
  toggleprix = () => {
    const { onToggle } = this.props;
    onToggle(this.props.produit.nom);
  };

  removeItem = () => {
    const { onDelete } = this.props;
    onDelete(this.props.produit.nom);
  };

  render() {
    const text = this.props.produit.nom;
    const prix = this.props.produit.prix;
    const quantite = this.props.produit.quantite;

    return (
      <View style={styles.container}>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={this.removeItem}>
            <Text style={styles.removeIcon}> &times; </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const colors = {
  removeIcon: "red",
  completedTask: "lightgrey",
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    flex: 1,
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  removeIcon: {
    color: colors.removeIcon,
    fontSize: 26,
  },
});
