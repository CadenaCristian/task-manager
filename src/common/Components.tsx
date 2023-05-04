import { Text, View, StyleSheet, Modal } from "react-native";
import * as Progress from "react-native-progress";
import Icon from "react-native-vector-icons/MaterialIcons";
import { GlobalModal, LoaderStyle } from "../interfaces";

export const LoaderButton = (props: LoaderStyle) => {
  return (
    <View style={[styles.loaderContainer, props]}>
      <Progress.CircleSnail color={"white"} size={25} />
      <Text style={{ color: props.fontColor }}>{props.text}</Text>
    </View>
  );
};

export const GlobalModalMessage = (props: GlobalModal) => {
  return (
    <Modal visible={props.show} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalInformation}>
          <Icon name={props.iconName} style={[styles.iconStyle, { backgroundColor: props.backgroundColor }]} size={30} />
          <Text style={{paddingTop: 10, alignSelf: "center"}}>{props.title}</Text>
          <Text style={{alignSelf: "center"}}>{props.message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    width: "100%",
    height: "auto",
    padding: 8,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    zIndex: 30,
    width: "100%",
    height: "100%",
    backgroundColor: "#2d8cff",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
  },
  modalInformation: {
    width: "70%",
    minHeight: 150,
    maxHeight: "auto",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  iconStyle: {
    color: "#fff",
    borderRadius: 50,
    padding: 10,
  },
});
