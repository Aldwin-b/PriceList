import * as React from "react";
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import ProduitList from "./ProduitList";
import produitService, { Produit } from "../services/produit.service";

interface ProduitState {
  produits: Array<Produit>;
  show: boolean;
  n: string;
  p: number;
}

export default class ProduitScreen extends React.Component<{}, ProduitState> {
  state: ProduitState = {
    produits: [],
    show: false,
    n: "raté",
    p: 0,
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
  }
  openModal() {
    this.setState({ show: true });
  }

  closeModal() {
    this.setState({ show: false });
    this.loadProduits();
  }

  setText(str: string) {
    this.setState({ n: str });
  }
  setPrice(prx: number) {
    this.setState({ p: prx });
  }
  render() {
    return (
      <View style={styles.upcontainer}>
        <View style={styles.produit}>
          <ProduitList
            produits={this.state.produits}
            onDelete={this.removeProduit}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.total}>
            <Text style={styles.totaltext}>TOTAL : </Text>
          </View>
          <View style={styles.manuel}>
            <TouchableOpacity onPress={() => this.openModal()}>
              <Text style={styles.add}>Ajouter Produit</Text>
            </TouchableOpacity>
            <Modal transparent={true} visible={this.state.show}>
              <View style={{ flex: 1 }}></View>
              <View style={styles.modal}>
                <TouchableOpacity>
                  <Text
                    style={styles.input}
                    onPress={() => {
                      this.closeModal();
                    }}
                  >
                    X
                  </Text>
                </TouchableOpacity>
                <Text style={styles.text}>Nom</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(e) => this.setText(e)}
                />
                <Text style={styles.text}>Prix</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={(e) => this.setPrice(parseFloat(e))}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.closeModal();
                    produitService.add(this.state.n, this.state.p);
                    this.loadProduits();
                  }}
                >
                  <Text style={styles.submit}>Ajouter</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  upcontainer: {
    flex: 1,
  },
  produit: {
    flex: 8,
  },
  popup: {
    flex: 1,
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "red",
    alignItems: "flex-end",
  },
  total: {
    height: "100%",
    flex: 5,
    justifyContent: "center",
  },
  totaltext: {
    color: "white",
    textAlignVertical: "center",
    left: "10%",
  },
  manuel: {
    flex: 1,
    height: "100%",
    width: 75,
    backgroundColor: "gold",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 50,
  },
  add: {
    textAlign: "center",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    margin: 50,
    borderRadius: 50,
    backgroundColor: "#000000",
  },
  text: {
    color: "white",
    marginTop: 10,
    fontSize: 20,
  },
  input: {
    width: 100,
    height: 50,
    backgroundColor: "red",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
  },
  submit: {
    color: "white",
    width: 100,
    margin: 30,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "yellow",
    textAlign: "center",
    fontSize: 20,
  },
});
