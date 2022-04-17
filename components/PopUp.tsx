import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import produitService from "../services/produit.service";
import ProduitScreen from "../screens/ProduitScreen";

export default class PopUp extends React.Component {
  state = { show: false, n: "raté", p: 0 };

  openModal() {
    this.setState({ show: true });
  }

  closeModal() {
    this.setState({ show: false });
  }

  setText(str: string) {
    this.setState({ n: str });
  }
  setPrice(prx: number) {
    this.setState({ p: prx });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.openModal()}>
          <Text>Ajouter manuellement</Text>
        </TouchableOpacity>
        <Modal transparent={true} visible={this.state.show}>
          <View style={{ flex: 1 }}></View>
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
                this.closeModal();
                produitService.add(this.state.n, this.state.p);
                this.componentDidMount();
              }}
            >
              <Text style={styles.submit}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
  loadProduits = () => {
    // Load all modules
    produitService.getAll().then((produits) => {
      this.setState({ produits });
    });
  };
  componentDidMount() {
    this.loadProduits();
    console.log("ici");
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "pink",
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
