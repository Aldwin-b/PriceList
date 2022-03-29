import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";

interface InputProps {
  placeholder: string;
  onSubmitEditing: (task: string) => void;
}

interface InputState {
  text: string;
  prix: number;
}

export default class Input extends Component<InputProps, InputState> {
  state: InputState = {
    text: "",
    prix: 0,
  };

  onChangeText = (text: string) => {
    this.setState({ text });
  };

  onChangeValue = (prix: number) => {
    this.setState({ prix });
  };

  onSubmitEditing = () => {
    const { text } = this.state;

    if (!text) return; // Don't submit if empty

    this.props.onSubmitEditing(text);

    // Reset text after submission
    this.setState({ text: "" });
  };

  render() {
    const { placeholder } = this.props;
    const { text } = this.state;

    return (
      <TextInput
        style={styles.input}
        value={text}
        placeholder={placeholder}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmitEditing}
      />
    );
  }
}

const colors = {
  background: "whitesmoke",
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: colors.background,
    padding: 10,
    marginBottom: 10,
  },
});
