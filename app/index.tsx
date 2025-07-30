import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Textinput from "../components/textinput";

export default function Index() {
  return (
    <View style={{ flex: 1, paddingVertical: 40 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        style={{
          flex: 1,
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 15,
                padding: 10,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Chat With Gemini
            </Text>
            <View style={{}}></View>
          </View>
        </TouchableWithoutFeedback>
        <Textinput />
      </KeyboardAvoidingView>
    </View>
  );
}
