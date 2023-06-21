import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Platform
} from "react-native";
import HomeScreen from "./HomeScreen";

import * as LocalAuthentication from "expo-local-authentication";

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function authenticate() {
    const hasPassword = await LocalAuthentication.isEnrolledAsync();

    if (!hasPassword) return;

    const { success, error } = await LocalAuthentication.authenticateAsync();

    if (success) {
      Alert.alert("Authentication successful!", "", [
        { text: "OK", onPress: () => setIsLoggedIn(true) }
      ]);
      setIsModalVisible(false);
    } else {
      Alert.alert("Authentication failed. Enter OTP sent on Mobile!");
    }
  }

  Platform.OS === "ios" && authenticate();

  return (
    <SafeAreaView style={styles.container}>
      {isLoggedIn ? (
        <HomeScreen onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <View>
          <TextInput
            style={[styles.input, { borderColor: "#0D52BD", color: "white" }]}
            placeholder="Mobile Number"
            placeholderTextColor="#fff"
          />
          <TextInput
            style={[styles.input, { borderColor: "#0D52BD", color: "white" }]}
            placeholder="OTP"
            placeholderTextColor="#fff"
          />
          <TouchableOpacity
            style={[styles.button, { borderColor: "#0D52BD", backgroundColor: "#0D52BD" }]}
            onPress={authenticate}
          >
            <Text style={{ color: "#fff" }}>Log In</Text>
          </TouchableOpacity>
        </View>
      )}

      {Platform.OS === "android" && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onShow={authenticate}
        >
          <View style={styles.modal}>
            <Text style={[styles.authText, { color: "white" }]}>
              Authenticate using your fingerprint
            </Text>
            <TouchableOpacity
              onPress={() => {
                LocalAuthentication.cancelAuthenticate();
                setIsModalVisible(false);
              }}
            >
              <Text style={[styles.cancelText, { color: "red" }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#19181f",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: "#0D52BD",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    color: "white"
  },
  button: {
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: "#0D52BD",
    backgroundColor: "#0D52BD",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    backgroundColor: "#333",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    height: "40%"
  },
  cancelText: {
    color: "red",
    fontSize: 16
  },
  authText: {
    color: "white",
    fontSize: 16
  }
});
