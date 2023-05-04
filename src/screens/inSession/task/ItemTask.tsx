import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Task } from "../../../interfaces";
// import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
//import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";

export default function ItemTask({ ...task }: Task) {
  // const translateX = useSharedValue(0);
  // const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
  //   onActive: (event) => {
  //     translateX.value = event.translationX
  //   },
  //   onEnd: () => {}
  // });

  // const rStyle = useAnimatedStyle(() => ({
  //   transform: [{
  //     translateX: translateX.value
  //   }]
  // }))

  return (
    <View style={styles.taskContainer}>
      {/* <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.task]}> */}
          <Text style={styles.title}>{task.title}</Text>
        {/* </Animated.View>
      </PanGestureHandler> */}
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    width: "100%",
    alignItems: "center",
  },
  task: {
    width: "90%",
    height: 70,
    marginVertical: 10,
    justifyContent: "center",
    paddingLeft: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 16,
  },
});
