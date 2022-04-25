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
  total: number;
}

export default class ProduitScreen extends React.Component<{}, ProduitState> {
  state: ProduitState = {
    produits: [],
    show: false,
    n: "raté",
    p: 0,
    total: 0,
  };

  refresh = () => {
    this.loadProdPrix();
  };

  onChange = (tot: number) => {
    this.setState({ total: tot });
  };

  getTotal = () => {
    this.state.total = 0;
    this.state.produits.forEach((element) => {
      this.state.total += element.stot;
    });
  };

  loadProdPrix = () => {
    // Load all modules
    produitService.getAll().then((produits) => {
      this.setState({ produits });
      this.getTotal();
      this.onChange(this.state.total);
    });
  };

  removeProduit = (nom: string) => {
    produitService.remove(nom);
    this.loadProdPrix();
  };

  componentDidMount() {
    this.loadProdPrix();
  }

  openModal() {
    this.setState({ show: true }, () => {});
  }

  closeModal() {
    this.setState({ show: false });
    this.loadProdPrix();
  }

  setText(str: string) {
    this.setState({ n: str });
  }
  setPrice(prx: number) {
    this.setState({ p: prx });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 8 }}>
          <ProduitList
            produits={this.state.produits}
            onDelete={this.removeProduit}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.total}>
            <Text style={styles.totaltext}>
              TOTAL : {this.state.total.toFixed(2)} €{" "}
            </Text>
          </View>
          <View style={styles.refresh}>
            <TouchableOpacity onPress={() => this.refresh()}>
              <Text style={styles.rtext}> 🔄 </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.manuel}>
            <TouchableOpacity onPress={() => this.openModal()}>
              <Text style={styles.add}>Ajouter Produit</Text>
            </TouchableOpacity>
            <Modal transparent={true} visible={this.state.show}>
              <View style={{ flex: 0.5 }}></View>
              <View style={styles.modal}>
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
                    produitService.add(this.state.n, this.state.p);
                    this.closeModal();
                  }}
                >
                  <Text style={styles.submit}>Ajouter</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: "#f6c624",
                      borderColor: "white",
                      borderWidth: 1,
                      borderRadius: 50,
                      top: 5,
                      textAlignVertical: "center",
                      textAlign: "center",
                      fontSize: 30,
                      color: "red",
                    }}
                    onPress={() => {
                      this.closeModal();
                    }}
                  >
                    X
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.5 }}></View>
            </Modal>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  popup: {
    flex: 1,
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  total: {
    height: "100%",
    flex: 3,
    justifyContent: "center",
  },
  totaltext: {
    textAlignVertical: "center",
    left: "10%",
    fontSize: 20,
    fontWeight: "bold",
    bottom: 10,
  },
  refresh: {
    flex: 1.1,
    height: "100%",
    backgroundColor: "skyblue",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 50,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  rtext: {
    textAlign: "center",
    fontSize: 30,
  },
  manuel: {
    flex: 1.1,
    height: "100%",
    width: 30,
    backgroundColor: "#f69000",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 50,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  add: {
    textAlign: "center",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    margin: 50,
    borderRadius: 50,
    backgroundColor: "#1c5858",
  },
  text: {
    color: "white",
    marginTop: 10,
    fontSize: 20,
  },
  input: {
    width: 100,
    height: 50,
    backgroundColor: "#f6c624",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    top: 5,
  },
  submit: {
    color: "#1c5858",
    width: 100,
    margin: 30,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: "#f6c624",
    borderColor: "white",
    textAlign: "center",
    fontSize: 20,
  },
});
