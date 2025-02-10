import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import env from "../../../constants/urls";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";

let mainColor = "rgb(11,117,131)";
let secondaryColor = "#F5BC00";
const HomeScreen = () => {
  let navigation = useNavigation();
  let toast = useToast();
  let now = new Date();

  const [fetchPassData, setFetchPassData] = useState({});
  const [dataRefresh, setDataRefresh] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [dataRefresh, refreshing]);

  const fetchData = async () => {
      axios
        .get(`${env.CLIENT_URL}${env.wardenPendingPass}`)
        .then((data) => {
          setFetchPassData(data.data.data);
          setRefreshing(false);
        });
  };

  const AlertingAction = (action, id) => {
    Alert.alert(`${action} Outpass`, `Are you ${action} this Outpass`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sure",
        onPress: () => actionHandle(action, id),
        style: "default",
      },
    ]);
  };

  const actionHandle = (action, id) => {
    if (action === "Accept") {
      axios
        .put(`${env.CLIENT_URL}${env.wardenPassAccept}/${id}`)
        .then((data) => {
          if (data.data.success) {
            toast.show(data.data.message, {
              type: "success",
              placement: "bottom",
              duration: 4000,
              offset: 30,
              animationType: "slide-in",
            });
            setDataRefresh(!dataRefresh);
          } else {
            toast.show(data.data.message, {
              type: "danger",
              placement: "bottom",
              duration: 4000,
              offset: 30,
              animationType: "slide-in",
            });
          }
        })
        .catch((error)=>console.log(error))
        
    }
    else if(action === "Reject"){
      axios
      .put(`${env.CLIENT_URL}${env.wardenPassReject}/${id}`)
      .then((data) => {
        if (data.data.success) {
          toast.show(data.data.message, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
          setDataRefresh(!dataRefresh);
        } else {
          toast.show(data.data.message, {
            type: "danger",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
        }
      })
      .catch((error)=>console.log(error))
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={fetchPassData}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <Text style={styles.roomNoStyle}>
                  {item.RoomNo.toUpperCase()}.
                </Text>
              </View>

              <View style={{ display: "flex", paddingVertical: 10 }}>
                <Text style={styles.titleStyle}>{item.Purpose}</Text>
                <View style={styles.times}>
                  <Text style={styles.outDateTimeStyle}>
                    {item.OutDateTime}
                  </Text>
                  <Text style={{ marginEnd: 10 }}>-</Text>
                  <Text style={styles.inDateTimeStyle}>{item.InDateTime}</Text>
                </View>
              </View>
              <Text style={styles.placeStyle}>{item.Distination}</Text>
              <View style={styles.btnGroup}>
                <TouchableOpacity
                  style={styles.editBtnOutline}
                  onPress={() => AlertingAction("Accept", item._id)}
                >
                  <Text style={styles.editBtn}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteBtnOutline}
                  onPress={() => AlertingAction("Reject", item._id)}
                >
                  <Text style={styles.deleteBtn}>Reject</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.createdStyle}>
                {new Date(item.createdAt).getDate() == String(now.getDate())
                  ? "Today"
                  : new Date(item.createdAt).getDate() + 1 ==
                    String(now.getDate())
                  ? "YesterDay"
                  : new Date(item.createdAt)
                      .toLocaleString(undefined, "Asia/Kolkata")
                      .split(",")[0]}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: secondaryColor,
    margin: 10,
    boxShadow: "2 2 5 1",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  roomNoStyle: {
    fontSize: 16,
    backgroundColor: "#D9D9D9",
    width: 60,
    height: 78,
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 25,
  },
  titleStyle: {
    marginStart: 10,
    fontSize: 20,
    marginTop: -5,
  },
  times: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    marginStart: 10,
  },
  inDateTimeStyle: {
    width: 80,
    marginStart: 5,
  },
  outDateTimeStyle: {
    width: 80,
  },
  placeStyle: {
    paddingHorizontal: 20,
  },
  createdStyle: {
    position: "absolute",
    right: 3,
    top: 3,
    fontSize: 8,
    opacity: 0.5,
  },
  btnGroup: {
    position: "absolute",
    right: 5,
    rowGap: 5,
  },
  editBtnOutline: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: mainColor,
    borderRadius: 5,
  },
  editBtn: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
  deleteBtnOutline: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "red",
    borderRadius: 5,
  },
  deleteBtn: {
    color: "white",
    fontSize: 10,
  },
});
