import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function InfoOurApp() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/login.jpg")} style={styles.image} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          ¿Te imaginas tener todo tu día organizado en una sola aplicación
          móvil? ¡Ahora es posible! Con nuestra aplicación para manejar tu
          itinerario diario, puedes tener todo lo que necesitas en un solo
          lugar.
        </Text>
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
  descriptionContainer: {
    position: "absolute",
    width: "80%",
    height: "auto",
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  description: {
    color: "#fff",
  },
});
