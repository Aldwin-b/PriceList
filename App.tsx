import React, { version } from "react";
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
import { Camera, Constants } from "expo-camera";
import Input from "./components/Input";
let camera: Camera;
export default function App() {
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState<any>(null);
  var [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = React.useState("off");

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log(status);
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
    console.log(photo);
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
  const __handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };
  const __switchCamera = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  };
  const [serviceList, setServiceList] = useState([{ service: "" }]);

  const handleServiceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleServiceRemove = (index: number) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };
  return (
    <View style={styles.container}>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: "150%",
          }}
        >
          {previewVisible && capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              savePhoto={__savePhoto}
              retakePicture={__retakePicture}
            />
          ) : (
            <Camera
              type={cameraType}
              style={{ flex: 1 }}
              ref={(r) => {
                camera = r;
              }}
            >
              <View
                style={{
                  top: "7%",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity
                  onPress={__handleFlashMode}
                  style={{
                    backgroundColor: flashMode === "off" ? "#000" : "#fff",
                    alignItems: "center",
                    borderRadius: 7,
                    height: 65,
                    width: 65,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 40,
                    }}
                  >
                    ⚡️
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
                    justifyContent: "center",
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
              <View
                style={{
                  flex: 6,
                }}
              >
                <TouchableOpacity
                  onPress={__switchCamera}
                  style={{
                    backgroundColor: "#000",
                    marginTop: 20,
                    borderRadius: 5,
                    height: 65,
                    width: 65,
                    alignItems: "center",
                    left: "20%",
                    top: "5%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 40,
                    }}
                  >
                    {cameraType === Constants.Type.back ? "🤳" : "📷"}
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    flexDirection: "row",
                    flex: 1,
                    width: "100%",
                    padding: 20,
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 80,
                        height: 80,
                        bottom: 0,
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
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          <View
            style={{
              height: 100,
              width: "100%",
              backgroundColor: "green",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Text style={styles.header}>Produit</Text>
            <Text style={styles.header}>Prix</Text>
            <Text style={styles.header}>Quantité</Text>
          </View>
          <View
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: "yellow",
            }}
          >
            <ScrollView>
              <View>
                {serviceList.map((singleService, index) => (
                  <View
                    style={{
                      backgroundColor: "red",
                    }}
                  >
                    <View>
                      <Input name="produit" label="Produit" />
                      {serviceList.length - 1 === index && (
                        <TouchableOpacity onPress={handleServiceAdd}>
                          <Text>Ajouter un produit</Text>
                        </TouchableOpacity>
                      )}

                      {serviceList.length !== 1 && (
                        <TouchableOpacity
                          onPress={() => handleServiceRemove(index)}
                        >
                          <Text>Remove</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              height: 120,
              width: "100%",
              backgroundColor: "blue",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={__startCamera}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: "#000",
                justifyContent: "center",
                alignItems: "center",
                top: "10%",
              }}
            >
              <Text
                style={{
                  color: "#fff",
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "#000",
    top: "2%",
    fontSize: 20,
    fontWeight: "bold",
  },
});

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
  console.log("sdsfds", photo);
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
        style={{
          flex: 1,
        }}
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
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 70,
                backgroundColor: "black",
                marginLeft: "20%",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                Nouvelle
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                backgroundColor: "black",
                width: 70,
                height: 70,
                marginRight: "20%",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
