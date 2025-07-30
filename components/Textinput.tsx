import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

const inputcomponent = () => {
  return (
    <View
      style={{
        marginLeft: 5,
        flexDirection: "row",
        padding: 5,
      }}
    >
      <TextInput
        placeholder="Type your Message.."
        placeholderTextColor="gray"
        style={{
          borderWidth: 1,
          borderRadius: 30,
          padding: 10,
          paddingLeft: 20,
          width: "85%",
          height: 60,
          backgroundColor: "lightgray",
          borderColor: "lightgray",
        }}
      />
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 10,
        }}
      >
        <FontAwesome name="send" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default inputcomponent;
