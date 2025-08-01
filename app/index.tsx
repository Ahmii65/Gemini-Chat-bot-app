import { myTheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const route = useRouter();
  const Scheme = myTheme();
  const colorScheme = Scheme == "dark";
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colorScheme ? "black" : "white",
        elevation: 15,
      }}
    >
      <StatusBar
        barStyle={colorScheme ? "light-content" : "dark-content"}
        backgroundColor={colorScheme ? "black" : "white"}
      />
      <View style={{ alignItems: "center", marginTop: "20%" }}>
        <Text style={{ color: "#3369FF", fontWeight: "600", fontSize: 25 }}>
          Your AI Assistant
        </Text>
        <Text
          style={{
            flexWrap: "wrap",
            width: 270,
            textAlign: "center",
            marginTop: "5%",
            fontSize: 15,
            color: "gray",
          }}
        >
          Using this Software, You can Ask any Questions And Receive Response
          Using Artificial Intelligence Assistant
        </Text>
      </View>
      <View style={{ alignItems: "center", marginTop: "20%" }}>
        <Image source={require("../assets/images/MainScreenLogo.png")} />
      </View>
      <View style={{ alignItems: "center", marginTop: "25%" }}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 25,
            padding: 15,
            backgroundColor: "#3369FF",
            borderColor: "#3369FF",
            width: "90%",
          }}
          onPress={() => route.replace("/Chat")}
        >
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
              Get Started
            </Text>
            <AntDesign name="arrowright" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default index;
