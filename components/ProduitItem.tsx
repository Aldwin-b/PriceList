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

  loadProdPrix = () => {
    // Load all modules
    produitService.getAll().then((produits) => {
      this.setState({ produits });
    });
  };

  onUpdateQtte = () => {};

  addQtte() {
    this.props.produit.quantite += 1;
    this.props.produit.stot =
      this.props.produit.prix * this.props.produit.quantite;
    this.loadProdPrix();
  }
  subQtte() {
    if (this.props.produit.quantite !== 1) {
      this.props.produit.quantite -= 1;
      this.props.produit.stot =
        this.props.produit.prix * this.props.produit.quantite;
    }
    this.loadProdPrix();
  }

  render() {
    const text = this.props.produit.nom;
    const prix = this.props.produit.prix;
    const quantite = this.props.produit.quantite;
    const stot = this.props.produit.stot;

    return (
      <View style={styles.upcontainer}>
        <View style={styles.container}>
          <Text style={styles.item}>{text}</Text>
          <Text style={styles.item}> {prix} €</Text>
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => this.subQtte()}
              style={styles.container}
            >
              <Text style={styles.pm}>-</Text>
            </TouchableOpacity>
            <Text style={styles.compteur}>{quantite}</Text>
            <TouchableOpacity
              style={styles.container}
              onPress={() => this.addQtte()}
            >
              <Text style={styles.pm}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={this.removeItem}>
              <Text style={styles.removeIcon}> &times; </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.subtot}>Sous-Total : {stot.toFixed(2)} €</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  upcontainer: {
    flex: 1,
    backgroundColor: "#f69000",
    marginTop: 20,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  item: {
    flex: 3,
    color: "#11222c",
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
    flexDirection: "row",
    height: 75,
    margin: 5,
  },
  compteur: {
    flex: 0.75,
    top: "10%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
  },
  actionsContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  removeIcon: {
    color: "#11222c",
    fontSize: 40,
    textAlign: "center",
    bottom: 5,
  },
  subtot: {
    flex: 1,
    fontSize: 20,
    color: "#11222c",
    textAlign: "center",
    marginBottom: 5,
    textDecorationLine: "underline",
  },
  pm: {
    flex: 1,
    height: 38,
    fontSize: 25,
    backgroundColor: "#f6c624",
    borderRadius: 50,
    borderWidth: 2,
    textAlign: "center",
  },
});
