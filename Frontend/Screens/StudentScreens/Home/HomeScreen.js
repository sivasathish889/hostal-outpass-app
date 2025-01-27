import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import plusIcon from "../../../assets/Plus.png";
import XIcon from "../../../assets/XIcon.png";
import calendarIcon from "../../../assets/Calendar.png";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import DateTimePicker from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import env from "../../../environment";

let mainColor = "rgb(11,117,131)";
let secondaryColor = "#F5BC00";

const HomeScreen = () => {
  const [modelVisible, setModelVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isInDatePickerVisible, setInDatePickerVisible] = useState(false);
  const [isOutDatePickerVisible, setOutDatePickerVisible] = useState(false);
  const [roomNo, setRoomNo] = useState(null);
  const [destination, setDestination] = useState(null);
  const [purpose, setPurpose] = useState(null);
  const [inDateTime, setinDateTime] = useState(null);
  const [outDateTime, setoutDateTime] = useState(null);

  let navigation = useNavigation();
  let toast = useToast();

  const handleInDateTimePicker = (e) => {
    setinDateTime(e.toLocaleString());
    setInDatePickerVisible(false);
  };

  const handleOutDateTimePicker = (e) => {
    setoutDateTime(e.toLocaleString());
    setOutDatePickerVisible(false);
  };

  AsyncStorage.getItem("user").then((user) => setUserId(user));
  const handlePassSubmit = async () => {
    const payload = {
      roomNo,
      destination,
      purpose,
      inDateTime,
      outDateTime,
      userId,
    };
    await fetch(`${env.CLIENT_URL}${env.studentNewRequest}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.show(data.message, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
          // navigation.navigate("/");
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
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Go To shopping",
      no: 1,
      Intine: "22/10/2032",
      outDateTime: "23/10/2034",
      place: "Tirunelveli",
      created_at: "Today",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Go to Home",
      no: 2,
      Intine: "22/10/2032",
      outDateTime: "23/10/2034",
      place: "Tirunelveli",
      created_at: "Yester Day",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Come From Ten",
      no: 3,
      Intine: "22/10/2032",
      outDateTime: "23/10/2034",
      place: "Tirunelveli",
      created_at: "Today",
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <View>
                <View style={styles.titleContainer}>
                  <Text style={styles.rollNoStyle}>{item.no}.</Text>
                  <Text style={styles.titleStyle}>{item.title}</Text>
                </View>
                <View style={styles.times}>
                  <Text style={styles.inDateTimeStyle}>{item.Intine}</Text>
                  <Text>{item.outDateTime}</Text>
                </View>
              </View>

              <Text style={styles.placeStyle}>{item.place}</Text>
              <Text style={styles.createdStyle}>{item.created_at} </Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.plusIconStyle}
        onPress={() => setModelVisible(!modelVisible)}
      >
        <Image source={plusIcon} />
      </TouchableOpacity>

      <View style={styles.modelContainer}>
        <Modal animationType="slide" transparent={true} visible={modelVisible}>
          <View style={styles.modelContainer}>
            <StatusBar backgroundColor={"rgba(0,0,0,0.5)"} />
            <View style={styles.ModelContent}>
              <TouchableOpacity
                onPress={() => setModelVisible(!modelVisible)}
                style={styles.closeBtn}
              >
                <Image source={XIcon} />
              </TouchableOpacity>

              <Text style={styles.modelHeading}>New Out Pass</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Room No :</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Room No"
                  placeholderTextColor={"#AFAFAF"}
                  onChangeText={(text) => setRoomNo(text)}
                  value={roomNo}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Destination :</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Destination"
                  placeholderTextColor={"#AFAFAF"}
                  onChangeText={(text) => setDestination(text)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Purpoes :</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Purpose"
                  placeholderTextColor={"#AFAFAF"}
                  onChangeText={(text) => setPurpose(text)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>In Date & Time :</Text>
                <TextInput
                  style={styles.input}
                  placeholder=" In Time and Date"
                  placeholderTextColor={"#AFAFAF"}
                  defaultValue={inDateTime}
                  editable={false}
                />
                <DateTimePicker
                  onCancel={() => setInDatePickerVisible(false)}
                  onConfirm={(e) => handleInDateTimePicker(e)}
                  isVisible={isInDatePickerVisible}
                />
                <TouchableOpacity
                  style={styles.calendarIconStyle}
                  onPress={() => setInDatePickerVisible(!isInDatePickerVisible)}
                >
                  <Image source={calendarIcon} />
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Out Date & Time:</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={"#AFAFAF"}
                  placeholder=" Out Time &  Date"
                  defaultValue={outDateTime}
                  editable={false}
                />
                <DateTimePicker
                  onCancel={() => setOutDatePickerVisible(false)}
                  onConfirm={(e) => handleOutDateTimePicker(e)}
                  isVisible={isOutDatePickerVisible}
                />
                <TouchableOpacity
                  style={styles.calendarIconStyle}
                  onPress={() =>
                    setOutDatePickerVisible(!isInDatePickerVisible)
                  }
                >
                  <Image source={calendarIcon} />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.buttonOutline}
                  onPress={() => handlePassSubmit()}
                >
                  <Text style={styles.btn}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: secondaryColor,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    boxShadow: "2 2 5 1",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  times: {
    display: "flex",
    flexDirection: "row",
    columnGap: 10,
    marginTop: 5,
    marginStart: 20,
  },
  inDateTimeStyle: {
    width: 100,
  },
  placeStyle: {
    marginStart: 30,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
  },
  titleStyle: {
    marginStart: 10,
    fontSize: 20,
    marginTop: -5,
  },
  rollNoStyle: {
    fontSize: 16,
  },
  createdStyle: {
    position: "absolute",
    right: 3,
    top: 3,
    fontSize: 8,
    opacity: 0.5,
  },
  plusIconStyle: {
    position: "absolute",
    bottom: 50,
    right: 50,
    backgroundColor: "#AFAFAF",
    padding: 12,
    borderRadius: 25,
  },
  closeBtn: {
    alignSelf: "flex-end",
  },
  modelContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  ModelContent: {
    padding: 20,
    margin: "10%",
    marginVertical: "50%",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
  },
  modelHeading: {
    textAlign: "center",
    fontSize: 20,
    color: mainColor,
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
  },
  inputLabel: {
    fontSize: 18,
  },
  inputGroup: {
    rowGap: 10,
  },
  buttonOutline: {
    backgroundColor: mainColor,
    borderRadius: 5,
    padding: 10,
    borderBlockColor: "black",
    marginVertical: 20,
    paddingHorizontal: 40,
  },
  btn: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  calendarIconStyle: {
    position: "absolute",
    right: 10,
    top: 38,
  },
});
