import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import annaUniversity from "../../assets/annaUniversity.jpeg";
import { useNavigation } from "@react-navigation/native";

let mainColor = "rgb(11,117,131)";
let placeholderTextColor = "#AFAFAF";

const RegisterScreen = () => {
  let navigation = useNavigation();
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
              />
            </View>

            <View style={styles.inputGroups}>
              <Text style={styles.label}>Register Number :</Text>
              <TextInput
                placeholder="Enter Your Regsiter Number"
                style={styles.input}
                placeholderTextColor={placeholderTextColor}
                keyboardType="numeric"
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
              />
            </View>

            <View style={styles.inputGroups}>
              <Text style={styles.label}>Year :</Text>
              <TextInput
                placeholder="Enter Your Year "
                style={styles.input}
                placeholderTextColor={placeholderTextColor}
                keyboardType="numeric"
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
              />
            </View>

            <View style={styles.inputGroups}>
              <Text style={styles.label}>Parent Number :</Text>
              <TextInput
                placeholder="Enter Your Parent Number "
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor={placeholderTextColor}
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
              />
            </View>

            <View style={styles.inputGroups}>
              <Text style={styles.label}>District :</Text>
              <TextInput
                placeholder="Enter Your District "
                style={styles.input}
                placeholderTextColor={placeholderTextColor}
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
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroups}>
              <Text style={styles.label}>Confirm Password :</Text>
              <TextInput
                placeholder="Enter Confirm Password"
                style={styles.input}
                placeholderTextColor={placeholderTextColor}
                secureTextEntry
              />
            </View>
          </View>
          <Text style={{ marginStart: 15 }}>
            If You Already Regsiter...
            <Text
              style={{ color: mainColor, textDecorationLine: "underline",fontSize:18 }}
              onPress={() => navigation.navigate("/StudentLogin")}
            >
              Login
            </Text>
          </Text>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.buttonOutline}>
              <Text style={styles.btn}>Register</Text>
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
    paddingHorizontal : 14
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
});
