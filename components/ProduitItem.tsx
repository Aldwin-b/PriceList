import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Switch } from "react-native";
import produitService, { Produit } from "../services/produit.service";

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
  mult(num1: number, num2: number) {
    return num1 * num2;
  }
  loadProduits = () => {
    // Load all modules
    produitService.getAll().then((produits) => {
      this.setState({ produits });
    });
  };

  addQtte() {
    this.props.produit.quantite += 1;
    this.loadProduits();
  }
  subQtte() {
    this.props.produit.quantite -= 1;
    this.loadProduits();
  }

  render() {
    const text = this.props.produit.nom;
    const prix = this.props.produit.prix;
    const quantite = this.props.produit.quantite;

    return (
      <View style={styles.upcontainer}>
        <View style={styles.container}>
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.text}> {prix}</Text>
          <View style={styles.compteur}>
            <TouchableOpacity
              onPress={() => this.subQtte()}
              style={styles.container}
            >
              <Text>-</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{quantite}</Text>
            <TouchableOpacity
              style={styles.container}
              onPress={() => this.addQtte()}
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={this.removeItem}>
              <Text style={styles.removeIcon}> &times; </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.subtot}>
          Sous-Total : {this.mult(prix, quantite)}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  upcontainer: {
    flex: 1,
    backgroundColor: "pink",
    marginTop: 20,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  compteur: {
    flex: 4,
    borderColor: "yellow",
    height: 75,
    borderWidth: 2,
    margin: 5,
    flexDirection: "row",
  },
  text: {
    flex: 4,
    color: "white",
    fontSize: 14,
    borderColor: "yellow",
    textAlign: "center",
    textAlignVertical: "center",
    height: 75,
    borderWidth: 2,
    margin: 5,
  },
  actionsContainer: {
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "orange",
  },
  removeIcon: {
    color: "red",
    fontSize: 25,
  },
  subtot: {
    flex: 1,
    fontSize: 15,
    textAlign: "center",
    marginBottom: 5,
  },
});
