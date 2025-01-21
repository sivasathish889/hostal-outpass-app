import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import annaUniversity from "../../../assets/annaUniversity.jpeg";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

let mainColor = "rgb(11,117,131)";
let placeholderTextColor = "#AFAFAF";

const ResetPasswordScreen = () => {
    let navigation = useNavigation();
  return (
    <ImageBackground source={annaUniversity} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>Student</Text>
          <Text style={styles.subHead}>Reset Password</Text>

          <View style={styles.inputgroup}>
            <Text style={styles.lable}>New Password :</Text>
            <TextInput
              placeholder="Enter Your New Password"
              style={styles.input}
              placeholderTextColor={placeholderTextColor}
            />
            <Text style={styles.lable}>Password :</Text>
            <TextInput
              placeholder="Enter Confirm Password"
              style={styles.input}
              placeholderTextColor={placeholderTextColor}
              secureTextEntry
              />
    
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.buttonOutline}>
              <Text style={styles.btn}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default ResetPasswordScreen

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
    fontSize: 20,
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
  lable: {
    fontWeight: "400",
    fontSize : 16
  },
  inputgroup: {
    marginTop: 25,
    rowGap: 15,
  },
  input: {
    backgroundColor: "#D9D9D9",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
  },
})