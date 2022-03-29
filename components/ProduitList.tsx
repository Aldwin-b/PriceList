import React, { Component } from "react";
import { StyleSheet, FlatList } from "react-native";
import ProduitItem from "./ProduitItem";
import { Produit } from "../services/produit.service";

interface ProduitListProps {
  produits: Array<Produit>;
  onDelete: (task: string) => void;
}

export default class ProduitList extends Component<ProduitListProps, {}> {
  render() {
    return (
      <FlatList<Produit>
        style={styles.container}
        data={this.props.produits}
        keyExtractor={(produit) => produit.nom}
        renderItem={({ item }: { item: Produit }) => (
          <ProduitItem produit={item} onDelete={this.props.onDelete} />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
});
