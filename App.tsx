import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { Camera, Constants } from "expo-camera";
import Header from "./components/Header";
import ProduitScreen from "./components/ProduitScreen";

let camera: Camera;
export default function App() {
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  var [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  const __stopCamera = async () => {
    setStartCamera(false);
  };

  const __takePicture = async () => {
    const photo: any = await camera.takePictureAsync();
    setPreviewVisible(true);
    //setStartCamera(false)
    setCapturedImage(photo);
  };
  const __savePhoto = () => {};

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  const __switchCamera = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  };

  return (
    <View style={styles.container}>
      {startCamera ? (
        <View style={styles.preview}>
          {previewVisible && capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              savePhoto={__savePhoto}
              retakePicture={__retakePicture}
            />
          ) : (
            <Camera
              type={cameraType}
              style={styles.justflex}
              ref={(r) => {
                camera = r;
              }}
            >
              <View
                style={{
                  top: "10%",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity
                  onPress={__switchCamera}
                  style={{
                    backgroundColor: "#000",
                    alignItems: "center",
                    borderRadius: 7,
                    height: 65,
                    width: 65,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 40,
                      color: "white",
                    }}
                  >
                    {cameraType === Constants.Type.back ? "🤳" : "📷"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={__stopCamera}
                  style={{
                    backgroundColor: "#000",
                    borderRadius: 7,
                    height: 65,
                    width: 65,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 45,
                      color: "red",
                    }}
                  >
                    X
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 6,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      width: 200,
                      maxHeight: 100,
                      top: "8%",
                      borderColor: "gold",
                      borderRadius: 5,
                      borderWidth: 3,
                    }}
                  ></View>
                </View>
                <View
                  style={{
                    bottom: 0,
                    flex: 1,
                    padding: 20,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        backgroundColor: "#fff",
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View style={styles.justflex}>
          <View>
            <Header />
          </View>
          <View style={styles.justflex}>
            <ProduitScreen />
          </View>

          <View // FOOTER
            style={styles.footer}
          >
            <TouchableOpacity onPress={__startCamera} style={styles.startcam}>
              <Text
                style={{
                  color: "white",
                  fontSize: 50,
                }}
              >
                📷
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

// Photo Prise

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={styles.justflex}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            padding: 15,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={retakePicture} style={styles.newP}>
              <Text style={styles.textP}>Nouvelle</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={savePhoto} style={styles.saveP}>
              <Text style={styles.textP}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    flex: 1,
    width: "150%",
  },
  startcam: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f69000",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    height: "15%",
    width: "100%",
    backgroundColor: "#53b1b1",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  justflex: {
    flex: 1,
    width: "100%",
  },
  textP: {
    color: "#fff",
    fontSize: 20,
  },
  saveP: {
    backgroundColor: "black",
    width: 70,
    height: 70,
    marginRight: "20%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  newP: {
    width: 130,
    height: 70,
    backgroundColor: "black",
    marginLeft: "20%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
});
