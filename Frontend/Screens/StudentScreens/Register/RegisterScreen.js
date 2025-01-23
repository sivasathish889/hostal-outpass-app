import {
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
import env from "../../../environment";
import { Dropdown } from "react-native-element-dropdown";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from '@react-native-async-storage/async-storage';

let mainColor = "rgb(11,117,131)";
let placeholderTextColor = "#AFAFAF";

const RegisterScreen = () => {

  const [isFocus, setIsFocus] = useState(false);

  let [name, setName] = useState(null);
  let [registerNumber, setRegisterNumber] = useState(null);
  let [department, setDepartment] = useState(null);
  let [year, setYear] = useState(null);
  let [phoneNumber, setPhoneNumber] = useState(null);
  let [parentNumber, setParentNumber] = useState(null);
  let [eMail, setEMail] = useState(null);
  let [district, setDistrict] = useState(null);
  let [password, setPassword] = useState(null);
  let [confirmPassword, setConfirmPassword] = useState(null);

  const toast = useToast();

  let navigation = useNavigation();

  const handleSubmit = async () => {
    let payload = {
      name,
      registerNumber,
      department,
      year,
      phoneNumber,
      parentNumber,
      eMail,
      district,
      password,
      confirmPassword,
    };
    fetch(`${env.CLIENT_URL}${env.studentRegister}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) =>{
        if(data.success){
          toast.show(data.message, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
          navigation.navigate("/StudentRegsiterOTP", {
            token : data.Token
          })

        }
        else {
          toast.show(data.message, {
            type: "danger",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <ImageBackground source={annaUniversity} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.mainHead}>Student</Text>
          <Text style={styles.subHead}>Register</Text>

          <View style={styles.inputRows}>
            <View style={styles.inputGroups}>
              <Text style={styles.label}>Name :</Text>
              <TextInput
                placeholder="Enter Your Name"
                style={styles.input}
                placeholderTextColor={placeholderTextColor}
                onChangeText={(text) => setName(text)}
              />
            </View>

            <View style={styles.inputGroups}>
              <Text style={styles.label}>Register Number :</Text>
              <TextInput
                placeholder="Enter Your Regsiter Number"
                style={styles.input}
                placeholderTextColor={placeholderTextColor}
                keyboardType="numeric"
                onChangeText={(text) => setRegisterNumber(text)}
              />
            </View>
          </View>
          <View style={styles.inputRows}>
            <View style={styles.inputGroups}>
              <Text style={styles.label}>Department :</Text>
              <TextInput
                placeholder="Enter Your Department"
                style={styles.input}
                placeholderTextColor={placeholderTextColor}
                onChangeText={(text) => setDepartment(text)}
              />
            </View>

            <View style={styles.inputGroups}>
              <Text style={styles.label}>Year :</Text>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                data={[
                  { label: "I ", value: "1" },
                  { label: "II ", value: "2" },
                  { label: "III ", value: "3" },
                  { label: "IV ", value: "4" },
                ]}
                placeholder="Select Year"
                maxHeight={100}
                labelField="label"
                valueField="value"
                value={year}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setYear(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
          </View>

          <View style={styles.inputRows}>
            <View style={styles.inputGroups}>
              <Text style={styles.label}>Phone Number :</Text>
              <TextInput
                placeholder="Enter Your Phone Number"
                style={styles.input}
                placeholderTextColor={placeholderTextColor}
                keyboardType="numeric"
                onChangeText={(text) => setPhoneNumber(text)}
              />
            </View>

            <View style={styles.inputGroups}>
              <Text style={styles.label}>Parent Number :</Text>
              <TextInput
                placeholder="Enter Your Parent Number "
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor={placeholderTextColor}
                onChangeText={(text) => setParentNumber(text)}
              />
            </View>
          </View>

          <View style={styles.inputRows}>
            <View style={styles.inputGroups}>
              <Text style={styles.label}>E-mail :</Text>
              <TextInput
                placeholder="Enter Your E-mail"
                style={styles.input}
                placeholderTextColor={placeholderTextColor}
                onChangeText={(text) => setEMail(text)}
              />
            </View>

            <View style={styles.inputGroups}>
              <Text style={styles.label}>District :</Text>
              <TextInput
                placeholder="Enter Your District "
                style={styles.input}
                placeholderTextColor={placeholderTextColor}
                onChangeText={(text) => setDistrict(text)}
              />
            </View>
          </View>

          <View style={styles.inputRows}>
            <View style={styles.inputGroups}>
              <Text style={styles.label}>Password :</Text>
              <TextInput
                placeholder="Enter Your Password"
                style={styles.input}
                placeholderTextColor={placeholderTextColor}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroups}>
              <Text style={styles.label}>Confirm Password :</Text>
              <TextInput
                placeholder="Enter Confirm Password"
                style={styles.input}
                placeholderTextColor={placeholderTextColor}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry
              />
            </View>
          </View>
          <Text style={{ marginStart: 15 }}>
            If You Already Regsiter...
            <Text
              style={{
                color: mainColor,
                textDecorationLine: "underline",
                fontSize: 18,
              }}
              onPress={() => navigation.navigate("/StudentLogin")}
            >
              Login
            </Text>
          </Text>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={handleSubmit}
            >
              <Text style={styles.btn}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterScreen;

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
    backgroundColor: "rgb(171,171,171)",
    borderRadius: 20,
    width: "85%",
  },
  mainHead: {
    textAlign: "center",
    fontSize: 35,
    color: mainColor,
    marginTop: 15,
    fontWeight: "700",
  },
  subHead: {
    textAlign: "center",
    fontSize: 25,
    marginBottom: 15,
  },
  inputRows: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputGroups: {
    width: "50%",
    marginBottom: 20,
    paddingHorizontal: 14,
  },
  input: {
    backgroundColor: "#D9D9D9",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
    width: "100%",
    color: "black",
    fontSize: 12,
  },
  label: {
    fontSize: 16,
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
  dropdown: {
    backgroundColor: "#D9D9D9",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
    width: "100%",
    color: "black",
    fontSize: 10,
    height: 38,
  },
});
