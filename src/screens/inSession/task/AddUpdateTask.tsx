import React from "react";
import { Animated } from "react-native";
import DatePicker from "react-native-modern-datepicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { GlobalModalMessage, LoaderButton } from "../../../common/Components";
import { ICONS, TASK_STATUS } from "../../../enums";
import { Task } from "../../../interfaces";
import { useAppSelector } from "../../../redux/hooks";
import * as functions from "../../../common/Functions";
import { Colors } from "../../../common/Variables";

export default function AddUpdateTask(props: any) {
  const { navigation, route } = props;
  const { dataUser }: any = useAppSelector((state) => state.userdata);
  const [modal, setModal] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [animationModal, setAnimationModal] = React.useState(
    new Animated.Value(0)
  );
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toISOString().slice(0, 10)
  );
  const [task, setTask] = React.useState({
    title: "",
    description: "",
  });
  const [modalOption, setModalOptions] = React.useState({
    iconName: ICONS.TASK_ALT,
    title: "",
    message: "",
    show: false,
    backgroundColor: "",
  });
  const [steps, setSteps] = React.useState([]) as [
    Array<string>,
    CallableFunction
  ];

  const openModal = () => {
    Animated.timing(animationModal, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    setModal(!modal);
  };

  const closeModal = () => {
    Animated.timing(animationModal, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    setModal(!modal);
  };

  const animatedStyle = {
    height: animationModal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 380],
    }),
  };

  const addInput = () => {
    setSteps([...steps, ""]);
  };

  const editStep = (text: string, index: number) => {
    const array = steps.map((item, indexObj) => {
      if (index === indexObj) {
        return text;
      }
      return item;
    });
    setSteps(array);
  };

  const deleteInput = (index: number) => {
    setSteps(steps.filter((pos: any, eveIndex: number) => eveIndex !== index));
  };

  const clearModalOption = () => {
    setModalOptions({
      iconName: ICONS.TASK_ALT,
      title: "",
      message: "",
      show: false,
      backgroundColor: "",
    });
  };

  const clearForm = () => {
    setTask({ title: "", description: ""});
    setSteps([]);
  }

  const valInsert = () => {
    if (task.title.length < 1) {
      setModalOptions({
        iconName: ICONS.WARNING,
        title: "Valida los campos",
        message: "El campo de titulo no puede ir vacio",
        show: true,
        backgroundColor: Colors.warning,
      });
      setTimeout(() => {
        clearModalOption();
      }, 3000);
    } else if (
      steps.length > 0 &&
      steps.filter((pos) => pos === "").length > 0
    ) {
      setModalOptions({
        iconName: ICONS.WARNING,
        title: "Valida los campos",
        message: "Los pasos no pueden ir vacios",
        show: true,
        backgroundColor: Colors.warning,
      });
      setTimeout(() => {
        clearModalOption();
      }, 3000);
    } else {
      insertTask();
    }
  };

  const insertTask = async () => {
    setLoader(true);

    const objTask: Task = {
      idUser: dataUser?.id,
      date: selectedDate,
      title: task.title,
      status: TASK_STATUS.TO_BE_COMPLETED,
      description: task.description,
      stepByTask: steps,
    };
    const filteredTask: any = functions.deleteEmptyParams(objTask);
    console.log(filteredTask);
    const { status } = await functions.addItemToTable("task", filteredTask);
    if (status === 200) {
      setModalOptions({
        iconName: ICONS.TASK_ALT,
        title: task.title,
        message: "Tarea creada",
        show: true,
        backgroundColor: Colors.save,
      });
      setTimeout(() => {
        setModalOptions({ ...modalOption, show: false });
      }, 3000);
    } else {
      setModalOptions({
        iconName: ICONS.ERROR,
        title: task.title,
        message: "Error al crear la tarea",
        show: true,
        backgroundColor: Colors.delete,
      });
      setTimeout(() => {
        setModalOptions({ ...modalOption, show: false });
      }, 3000);
    }
    clearForm();
    setLoader(false);
  };

  React.useEffect(() => {
    console.log("dataUser add: ", dataUser);
  }, []);

  return (
    <View>
      <ScrollView style={styles.containerForm}>
        <View>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ paddingLeft: 10 }}
          >
            <Icon name="arrow-back" color={Colors.mainColor} size={35} />
          </Pressable>
          <Text style={[styles.labelText, { alignSelf: "center" }]}>
            Selecciona una fecha para la tarea
          </Text>
          <View style={styles.dateContainer}>
            <Pressable
              style={styles.buttonCalendar}
              onPress={modal ? openModal : closeModal}
            >
              <Icon name="event" color="#fff" size={25} />
            </Pressable>
            <Text style={styles.inputDate}>{selectedDate}</Text>
          </View>
          <View style={styles.calendarContainer}>
            <Animated.View style={[styles.calendarContainer, animatedStyle]}>
              <View style={styles.calendar}>
                <DatePicker
                  options={{
                    backgroundColor: Colors.mainColor,
                    textHeaderColor: "#D7D7B9",
                    textDefaultColor: "#fff",
                    selectedTextColor: "black",
                    mainColor: "#D7D7B9",
                    textSecondaryColor: "#fff",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                  mode="calendar"
                  selected={selectedDate}
                  minuteInterval={30}
                  style={{ width: "100%", borderRadius: 10 }}
                  onSelectedChange={(date) => setSelectedDate(date)}
                />
              </View>
            </Animated.View>
          </View>
        </View>
        <View style={{ backgroundColor: "#fff" }}>
          <Text style={[styles.labelText, { alignSelf: "center" }]}>
            Titulo de la tarea
          </Text>
          <TextInput
            placeholder="Titulo de la tarea"
            value={task.title}
            style={[styles.inputText, { width: "90%" }]}
            onChangeText={(e) => setTask({ ...task, title: e })}
            placeholderTextColor="#AAAAAA"
          />
          <Text style={[styles.labelText, { alignSelf: "center" }]}>
            Descripción de la tarea
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            value={task.description}
            style={[styles.inputText, { width: "90%" }]}
            placeholder="Descripción de la tarea"
            onChangeText={(e) => setTask({ ...task, description: e })}
          />
          <Text style={[styles.labelText, { alignSelf: "center" }]}>
            Pasos para completar la tarea
          </Text>
          {steps &&
            steps.map((pos, index) => {
              return (
                <View key={index} style={styles.containerStep}>
                  <TextInput
                    value={steps[index]}
                    placeholder={`Paso ${index + 1}:`}
                    style={[styles.inputText, { width: "85%" }]}
                    onChangeText={(e) => editStep(e, index)}
                    placeholderTextColor="#AAAAAA"
                  />
                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => deleteInput(index)}
                  >
                    <Icon name="delete" color="#fff" size={25} />
                  </Pressable>
                </View>
              );
            })}
          <Pressable
            style={[styles.buttonCalendar, { backgroundColor: "#2d8cff" }]}
            onPress={addInput}
          >
            <Icon name="add-circle" color="#fff" size={25} />
          </Pressable>
          <View style={styles.addTaskContainer}>
            {loader ? (
              <LoaderButton
                text="Guardando..."
                fontColor="#fff"
                backgroundColor="#2d8cff"
              />
            ) : (
              <Pressable style={styles.buttonAdd} onPress={valInsert}>
                <Text style={{ alignSelf: "center", color: "#fff" }}>
                  Guardar tarea
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
      <GlobalModalMessage
        title={modalOption.title}
        message={modalOption.message}
        iconName={modalOption.iconName}
        show={modalOption.show}
        backgroundColor={modalOption.backgroundColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerForm: {
    width: "100%",
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 10,
  },
  labelText: {
    fontSize: 15,
    paddingVertical: 8,
  },
  dateContainer: {
    width: "auto",
    height: "auto",
    paddingTop: 10,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
  },
  inputDate: {
    width: "60%",
    marginLeft: 10,
    borderRadius: 10,
    textAlign: "center",
    color: "#fff",
    backgroundColor: Colors.mainColor,
    textAlignVertical: "center",
  },
  calendarContainer: {
    width: "100%",
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  calendar: {
    width: "100%",
    height: "100%",
  },
  buttonCalendar: {
    width: "auto",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.mainColor,
  },
  deleteButton: {
    width: "auto",
    alignSelf: "center",
    padding: 5,
    borderRadius: 10,
    backgroundColor: Colors.delete,
  },
  inputText: {
    height: "auto",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#D6DCD6",
  },
  containerStep: {
    display: "flex",
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemStep: {
    width: "80%",
    height: "auto",
  },
  addTaskContainer: {
    width: "50%",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 140,
  },
  buttonAdd: {
    width: "100%",
    height: "auto",
    backgroundColor: Colors.save,
    padding: 10,
    borderRadius: 10,
  },
});
