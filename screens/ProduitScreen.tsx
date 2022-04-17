import * as React from "react";
import { StyleSheet, View } from "react-native";
import ProduitList from "../components/ProduitList";
import produitService, { Produit } from "../services/produit.service";

interface ProduitState {
  produits: Array<Produit>;
}

export default class ProduitScreen extends React.Component<{}, ProduitState> {
  state: ProduitState = {
    produits: [],
  };

  loadProduits = () => {
    // Load all modules
    produitService.getAll().then((produits) => {
      this.setState({ produits });
    });
  };

  addProduit = (nom: string, prix: number) => {
    produitService.add(nom, prix);
    this.loadProduits();
  };

  removeProduit = (nom: string) => {
    produitService.remove(nom);
    this.loadProduits();
  };

  componentDidMount() {
    this.loadProduits();
    console.log("prout");
  }

  render() {
    return (
      <View style={styles.container}>
        <ProduitList
          produits={this.state.produits}
          onDelete={this.removeProduit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
