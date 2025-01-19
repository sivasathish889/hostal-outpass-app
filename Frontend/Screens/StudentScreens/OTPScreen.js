import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import annaUniversity from "../../assets/annaUniversity.jpeg";
import { useNavigation } from "@react-navigation/native";

let mainColor = "rgb(11,117,131)";
let placeholderTextColor = "#AFAFAF";

const OTPScreen = () => {
    let navigation = useNavigation();
  
  return (
    <ImageBackground source={annaUniversity} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>Student</Text>
          <Text style={styles.subHead}>Forget Password</Text>

          <View style={styles.inputgroup}>
            <Text style={styles.lable}>OTP</Text>
            <TextInput
              placeholder="Enter Your OTP"
              style={styles.input}
              placeholderTextColor={placeholderTextColor}
              keyboardType="number-pad"
            />
          </View>
          <View style={{ alignItems: "center", marginVertical : 10 }}>
            <TouchableOpacity style={styles.buttonOutline}>
              <Text style={styles.btn} onPress={()=>navigation.navigate('/StudentResetPassword')}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    minWidth: "80%",
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
    fontSize: 20,
    marginBottom : 30
  },
  input: {
    backgroundColor: "#D9D9D9",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
    width : "80%",
    alignSelf : "center"
  },
  lable: {
    textAlign : "center",
    marginBottom : 10
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
});
