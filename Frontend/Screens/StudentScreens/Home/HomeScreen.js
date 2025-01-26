import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

const HomeScreen = () => {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Go To shopping",
      no: 1,
      Intine: '22/10/2032',
      outTime: '23/10/2034',
      place: "Tirunelveli",
      created_at: "today",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Go to Home",
      no: 1,
      Intine: '22/10/2032',
      outTime: '23/10/2034',
      place: "Tirunelveli",
      created_at: "yesterDay",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Come From Ten",
      no: 1,
      Intine: '22/10/2032',
      outTime: '23/10/2034',
      place: "Tirunelveli",
      created_at: "today",
    },
  ];
  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <Text>{item.no}</Text>
              <View style={styles.times}>
                <Text>{item.Intine}</Text>
                <Text>{item.outTime}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container : {
    backgroundColor : "red",
    margin : 10,
    paddingHorizontal : 10,
    paddingVertical : 10
  },
  times :{
    display :"flex",
    flexDirection : "row",
    columnGap : 10
  }
});
