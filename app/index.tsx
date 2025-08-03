import { myTheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const route = useRouter();
  const Scheme = myTheme();
  const colorScheme = Scheme == "dark";
  return (
    <SafeAreaView
      style={{
        backgroundColor: colorScheme ? "black" : "white",
        height: hp(100),
        flex: 1,
      }}
    >
      <StatusBar
        barStyle={colorScheme ? "light-content" : "dark-content"}
        backgroundColor={colorScheme ? "black" : "white"}
      />
      <View
        style={{
          alignItems: "center",
          marginTop: hp(10),
          justifyContent: "center",
          height: hp(15),
        }}
      >
        <Text style={{ color: "#3369FF", fontWeight: "600", fontSize: hp(3) }}>
          Your AI Assistant
        </Text>
        <Text
          style={{
            flexWrap: "wrap",
            width: 270,
            textAlign: "center",
            marginTop: hp(2),
            fontSize: hp(2),
            color: "gray",
          }}
        >
          Using this Software, You can Ask any Questions And Receive Response
          Using Artificial Intelligence Assistant
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: hp(5),
          height: hp(45),
        }}
      >
        <Image
          source={require("../assets/images/MainScreenLogo.png")}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          alignItems: "center",
          height: hp(15),
          flex: 1,
          marginTop: hp(5),
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 25,
            padding: 15,
            backgroundColor: "#3369FF",
            borderColor: "#3369FF",
            width: wp(90),
          }}
          onPress={() => route.push("/Chat")}
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
