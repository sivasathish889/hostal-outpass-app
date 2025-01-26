import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import annaUniversity from "../../../assets/annaUniversity.jpeg";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import env from "../../../environment";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

let mainColor = "rgb(11,117,131)";
let placeholderTextColor = "#AFAFAF";

const LoginScreen = () => {
  let navigation = useNavigation();
  let toast = useToast()
  const [showPassword, setShowPassword] = useState(false);
  const [registerNumber, setRegisterNumber] = useState(null);
  const [password, setPassword] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    let payload = {
      registerNumber,
      password,
    };
    fetch(`${env.CLIENT_URL}${env.studentLogin}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.show(data.message, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
          AsyncStorage.setItem('user', data.user)
          navigation.navigate("/");
        } else {
          toast.show(data.message, {
            type: "danger",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <ImageBackground source={annaUniversity} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>Student</Text>
          <Text style={styles.subHead}>Login</Text>

          <View style={styles.inputgroup}>
            <Text style={styles.lable}>Register Number :</Text>
            <TextInput
              placeholder="Enter Your Regsiter Number"
              style={styles.input}
              placeholderTextColor={placeholderTextColor}
              onChangeText={(text) => setRegisterNumber(text)}
              keyboardType="number-pad"
            />
            <Text style={styles.lable}>Password :</Text>
            <TextInput
              placeholder="Enter Your Password"
              style={styles.input}
              placeholderTextColor={placeholderTextColor}
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
            />
            <MaterialCommunityIcons
              name={showPassword ? "eye" : "eye-off"}
              size={18}
              color="black"
              style={styles.icon}
              onPress={toggleShowPassword}
            />
            <Text
              style={styles.forgetPass}
              onPress={() => navigation.navigate("/StudentLoginForget")}
            >
              Forget/Change Password
            </Text>
          </View>
          <Text style={{ marginTop: 10 }}>
            If you dont have account..
            <Text
              onPress={() => navigation.navigate("/StudentRegister")}
              style={{
                color: mainColor,
                textDecorationLine: "underline",
                fontSize: 16,
              }}
            >
              Please Register
            </Text>
          </Text>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={handleSubmit}
            >
              <Text style={styles.btn}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
  },
  form: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 30,
    width: "80%",
    backgroundColor: "rgb(171,171,171)",
  },
  heading: {
    textAlign: "center",
    fontSize: 35,
    color: mainColor,
    marginTop: 15,
    fontWeight: "700",
  },
  subHead: {
    textAlign: "center",
    fontSize: 25,
  },
  buttonOutline: {
    backgroundColor: mainColor,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 40,
    borderBlockColor: "black",
    marginVertical: 20,
  },
  btn: {
    color: "white",
    fontSize: 15,
  },
  inputgroup: {
    marginTop: 25,
    rowGap: 10,
  },
  lable: {
    fontWeight: "400",
  },
  input: {
    backgroundColor: "#D9D9D9",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
  },
  forgetPass: {
    textAlign: "right",
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  icon: {
    position: "absolute",
    bottom: 57,
    right: 10,
  },
});
