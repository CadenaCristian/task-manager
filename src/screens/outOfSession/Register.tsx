import React from "react";
import {
  query,
  collection,
  onSnapshot,
  addDoc,
  where,
} from "@firebase/firestore";
import { BlurView } from "expo-blur";
import { TextInput } from "react-native-gesture-handler";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
  Button,
} from "react-native";
import { firestore } from "../../firebase_setup/firebase";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Progress from "react-native-progress";
import { characters } from "../../utils/avatars";
import Svg, { SvgUri } from "react-native-svg";

export default function Register(props: any) {
  const { navigation } = props;
  const [avatarUrl, setAvatarurl] = React.useState("");
  const [charactersList, setCharactersList] = React.useState(characters) as [
    any,
    CallableFunction
  ];
  const [gender, setGender] = React.useState(null) as [any, CallableFunction];
  const collectionRef = collection(firestore, "users");
  const [valLoader, setValLoader] = React.useState(false);
  const [emailExist, setEmailExist] = React.useState(false);
  const [userData, setDataUser] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  const valEmail = () => {
    setValLoader(true);
    const q = query(collectionRef, where("email", "==", userData.email));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray: Array<any> = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      if (todosArray.length > 0) {
        setEmailExist(true);
        setValLoader(false);
      } else {
        setEmailExist(false);
        setValLoader(false);
      }
      setValLoader(false);
    });
    return () => unsub();
  };

  const valData = () => {
    if (userData.email.length < 1) {
      return true;
    } else if (userData.name.length < 1) {
      return true;
    } else if (userData.password.length < 1) {
      return true;
    } else if (emailExist) {
      return true;
    } else if (gender === null) {
      return true;
    } else {
      return false;
    }
  };

  const getAvatar = async () => {
    let numeroAleatorio = Math.floor(
      Math.random() * charactersList[gender]?.length
    );
    if (charactersList[gender][numeroAleatorio] !== undefined) {
      let url = `https://api.dicebear.com/6.x/avataaars/svg?seed=${charactersList[gender][numeroAleatorio]}`;
      setAvatarurl(url);
    }
  };

  const addUser = async () => {
    try {
      await addDoc(collection(firestore, "users"), {...userData, urlAvatar: avatarUrl});
      navigation.goBack();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => null,
      headerLeft: () => (
        <Icon
          name="arrow-back"
          color="#fff"
          size={30}
          style={{ marginLeft: 2 }}
          onPress={navigation.goBack}
        />
      ),
    });
  }, []);

  React.useEffect(() => {
    getAvatar();
  }, [gender]);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/login.jpg")} style={styles.image} />
      <View style={styles.form}>
        <BlurView intensity={100}>
          <View style={styles.login}>
            <Text style={styles.titleForm}>Registro</Text>
            {avatarUrl !== "" ? (
              <View>
                <SvgUri width="100" height="100" uri={`${avatarUrl}`}>
                  <Svg width="100%" height="100%" viewBox="0 0 200 200" />
                </SvgUri>
              </View>
            ) : (
              <Image
                source={require("../../assets/default-user.png")}
                style={styles.profilePicture}
              />
            )}
            <View style={styles.gender}>
              <TouchableOpacity
                style={styles.checkContainer}
                onPress={() => setGender("male")}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      borderColor: gender === "male" ? "#007AFF" : "#fff",
                    },
                  ]}
                >
                  {gender === "male" && <View style={styles.checkStatus} />}
                </View>
                <Text style={styles.textCheck}>Hombre</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkContainer}
                onPress={() => setGender("female")}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      borderColor: gender === "female" ? "#007AFF" : "#fff",
                    },
                  ]}
                >
                  {gender === "female" && <View style={styles.checkStatus} />}
                </View>
                <Text style={styles.textCheck}>Mujer</Text>
              </TouchableOpacity>
            </View>
            <Icon name="refresh" color="#fff" size={30} style={{display: gender ? "flex" : "none"}} onPress={getAvatar} />
            <View>
              <Text style={styles.labelText}>Nombre completo</Text>
              <TextInput
                style={styles.inputText}
                placeholder="Nombre"
                onChangeText={(e) =>
                  setDataUser({ ...userData, name: e.toLowerCase() })
                }
              />
            </View>
            <View>
              <Text style={styles.labelText}>E-mail</Text>
              <TextInput
                style={styles.inputText}
                placeholder="E-mail"
                onBlur={valEmail}
                onChangeText={(e) =>
                  setDataUser({ ...userData, email: e.toLowerCase() })
                }
              />
            </View>
            <View style={{ display: valLoader ? "flex" : "none" }}>
              <Progress.CircleSnail color={"white"} />
            </View>
            <View
              style={{
                ...styles.alertContent,
                display: `${emailExist ? "flex" : "none"}`,
              }}
            >
              <Text style={styles.alert}>¡Este correo ya esta en uso!</Text>
            </View>
            <View>
              <Text style={styles.labelText}>Password</Text>
              <TextInput
                style={styles.inputText}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={(e) => setDataUser({ ...userData, password: e })}
              />
            </View>
            <View style={{ display: valData() ? "none" : "flex" }}>
              <Button title="Enviar" onPress={addUser} />
            </View>
          </View>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  form: {
    position: "absolute",
  },
  login: {
    width: 300,
    height: 500,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titleForm: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "400",
    textAlign: "center",
    paddingVertical: 5,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 1,
    marginVertical: 3,
  },
  gender: {
    width: "80%",
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkStatus: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  textCheck: {
    color: "#fff",
    marginLeft: 5,
  },
  labelText: {
    fontSize: 17,
    fontWeight: "400",
    color: "#fff",
  },
  alertContent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "red",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#fff",
  },
  alert: {
    textAlign: "center",
    color: "#fff",
  },
  inputText: {
    width: 250,
    height: 40,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginTop: 3,
    backgroundColor: "#ffffff90",
    marginBottom: 10,
  },
});
