import React, { Component } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import ProduitItem from "./ProduitItem";
import { Produit } from "../services/produit.service";

interface ProduitListProps {
  produits: Array<Produit>;
  onDelete: (nom: string) => void;
}

export default class ProduitList extends Component<ProduitListProps, {}> {
  render() {
    return (
      <View style={styles.upcontainer}>
        <View style={styles.container}>
          <FlatList<Produit>
            data={this.props.produits}
            keyExtractor={(produit) => produit.nom}
            renderItem={({ item }: { item: Produit }) => (
              <ProduitItem produit={item} onDelete={this.props.onDelete} />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upcontainer: {
    flex: 1,
  },
});
