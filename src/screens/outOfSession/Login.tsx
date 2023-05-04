import React from "react";
import { query, collection, onSnapshot, where } from "@firebase/firestore";
import { BlurView } from "expo-blur";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet, View, Image, Text, Button, Pressable } from "react-native";
import { firestore } from "../../firebase_setup/firebase";
import Svg, { SvgUri } from "react-native-svg";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { changeAuthStatus, getDataUser } from "../../redux/features/user";
import { Colors } from "../../common/Variables";

export default function Login(props: any) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { dataUser }: any = useAppSelector((state) => state.userdata);
  const [avatarUrl, setAvatarurl] = React.useState("");
  const [userExist, setUserExist] = React.useState(false);
  const [userData, setDataUser] = React.useState({
    email: "",
    password: "",
  });

  const goToRegister = () => {
    navigation.navigate("register");
  };

  const login = () => {
    if (dataUser?.email) dispatch(changeAuthStatus(true));
  };

  const valButtonSession = () => {
    if (userData.email.length < 5) {
      return true;
    } else {
      return false;
    }
  };

  const validateEmailUser = async () => {
    const ref = collection(firestore, "users");
    const q = query(ref, where("email", "==", userData.email));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray: Array<any> = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      if (todosArray.length > 0) {
        setUserExist(true);
        setAvatarurl(todosArray[0]?.urlAvatar);
        const { id, email, urlAvatar } = todosArray[0];
        dispatch(getDataUser({ id, email, urlAvatar }));
      } else {
        setUserExist(false);
        setAvatarurl("");
      }
    });
    return () => unsub();
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/login.jpg")} style={styles.image} />
      <View style={styles.form}>
        <BlurView intensity={100}>
          <View style={styles.login}>
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
            <View>
              <Text style={styles.labelText}>E-mail</Text>
              <TextInput
                style={styles.inputText}
                placeholder="E-mail"
                onBlur={validateEmailUser}
                onChangeText={(e) =>
                  setDataUser({ ...userData, email: e.toLowerCase() })
                }
              />
            </View>
            <View>
              <Text style={styles.labelText}>Password</Text>
              <TextInput
                style={styles.inputText}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={(e) =>
                  setDataUser({ ...userData, password: e.toLowerCase() })
                }
              />
            </View>
            <View style={styles.containerButtons}>
              <Pressable
                style={styles.buttons}
                onPress={() => (valButtonSession() ? () => {} : login())}
              >
                <Text style={styles.buttonsText}>Iniciar sesión</Text>
              </Pressable>
              <Pressable style={styles.buttons} onPress={goToRegister}>
                <Text style={styles.buttonsText}>Registrarse en la app</Text>
              </Pressable>
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
    height: 400,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 1,
    marginVertical: 3,
  },
  labelText: {
    fontSize: 17,
    fontWeight: "400",
    color: "#fff",
  },
  inputText: {
    width: 270,
    height: 40,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ffffff90",
    marginBottom: 20,
  },
  containerButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttons: {
    width: "auto",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.mainColor,
  },
  buttonsText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#fff",
  },
});
