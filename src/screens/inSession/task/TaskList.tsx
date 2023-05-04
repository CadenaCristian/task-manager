import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import * as Progress from "react-native-progress";
import { useAppSelector } from "../../../redux/hooks";
import { query, collection, onSnapshot, where } from "@firebase/firestore";
import { firestore } from "../../../firebase_setup/firebase";
import { Colors } from "../../../common/Variables";
import { Task } from "../../../interfaces";
import ItemTask from "./ItemTask";

export default function TaskList(props: any) {
  const { navigation } = props;
  const [loadData, setLoadData] = React.useState(true);
  const { dataUser }: any = useAppSelector((state) => state.userdata);
  const [listTask, setListTask] = React.useState([]) as [
    Task[],
    CallableFunction
  ];

  const getAllTask = async () => {
    const ref = collection(firestore, "task");
    const q = query(ref, where("idUser", "==", dataUser.id));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const todosArray: Array<any> = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      if (todosArray.length > 0) setListTask(todosArray);
      setLoadData(false);
    });
    return () => unsub();
  };

  React.useEffect(() => {
    (async () => {
      await getAllTask();
    })();
  }, []);
  console.log("listTask: ", listTask);

  return (
    <SafeAreaView style={styles.container}>
      <View style={listTask.length < 1 ? styles.withoutData : styles.withData}>
        {loadData ? (
          <Progress.CircleSnail color={"white"} />
        ) : listTask.length > 0 ? (
          <ScrollView style={{minHeight: "100%", maxHeight: "auto" }}>
            {listTask.map((task: Task, index: number) => {
              return (
                <ItemTask key={index} {...task} />
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.addTaskMessage}>
            <Text style={[styles.textSize, { color: Colors.mainColor }]}>
              Opps, aun no has creado ninguna tarea!
            </Text>
            <Pressable
              style={styles.addTask}
              onPress={() => navigation.navigate("manageTask")}
            >
              <Text style={[styles.textSize, { color: "#fff" }]}>
                Agregar tarea
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  withData: {
    paddingTop: 30,
  },
  withoutData: {
    width: "100%",
    height: "100%",
    paddingTop: 30,
    display: "flex",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    alignSelf: "center",
  },
  addTaskMessage: {
    width: "90%",
    height: 100,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.mainColor,
    alignItems: "center",
    justifyContent: "center",
  },
  textSize: {
    fontSize: 15,
  },
  addTask: {
    width: "40%",
    height: 35,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: Colors.mainColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
