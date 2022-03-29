import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  Button,
  ScrollView,
} from "react-native";
import Input from "../components/Input";
import ProduitList from "../components/ProduitList";
import produitService, { Produit } from "../services/produit.service";

interface ProduitState {
  produits: Array<Produit>;
}
let [count, setCount] = useState(1);

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

  addProduit = (task: string) => {
    produitService.add(task);
    this.loadProduits();
  };

  removeProduit = (task: string) => {
    produitService.remove(task);
    this.loadProduits();
  };

  componentDidMount() {
    this.loadProduits();
  }

  render() {
    //Compteur quantité
    function incrementCount() {
      count = count + 1;
      setCount(count);
    }
    function decrementCount() {
      count = count - 1;
      setCount(count);
    }
    return (
      <ScrollView>
        <View>
          <View style={{ flex: 1 }}>
            <View style={styles.red}>
              <View style={styles.pink}>
                <Input name="produit" placeholder="Nom" />
              </View>
              <View style={styles.pink}>
                <Input name="prix" placeholder="Prix" />
              </View>
              <View style={styles.pink}>
                <TouchableOpacity onPress={decrementCount}>
                  <Text style={styles.purple}>-</Text>
                </TouchableOpacity>
                <View>
                  <Text
                    style={{
                      fontSize: 30,
                      borderWidth: 2,
                      padding: 5,
                      textAlign: "center",
                      textAlignVertical: "center",
                    }}
                  >
                    {count}
                  </Text>
                </View>
                <TouchableOpacity onPress={incrementCount}>
                  <Text style={styles.purple}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.white}>
              <TouchableOpacity>
                <Text>Remove</Text>
              </TouchableOpacity>

              <View>
                <TouchableOpacity>
                  <Text>Ajouter un produit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <Input
            placeholder="Ajoutez un produit"
            onSubmitEditing={this.addProduit}
          />
          <ProduitList
            produits={this.state.produits}
            onDelete={this.removeProduit}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  red: {
    flex: 1,
    height: 120,
    width: "100%",
    backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  pink: {
    flex: 4,
    backgroundColor: "pink",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  purple: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "purple",
    textAlign: "center",
    textAlignVertical: "center",
  },
  white: {
    height: 30,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
