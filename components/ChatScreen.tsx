import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
type Message = {
  id: string;
  text: string;
};

export default function ChatScreen() {
  const [input, setInput] = useState<string>("");
  const [Messages, setMessages] = useState<Message[]>([]);
  const sendButton = () => {
    if (input.trim() === "") return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };
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
            <View
              style={{
                flex: 1,
              }}
            >
              {Messages.length > 0 ? (
                <FlatList<Message>
                  data={Messages}
                  keyExtractor={(item) => item.id}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "flex-end",
                    padding: 5,
                  }}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 20,
                        padding: 15,
                        maxWidth: "80%",
                        margin: 5,
                        backgroundColor: "lightgray",
                        borderColor: "lightgray",
                        alignSelf: "flex-end",
                      }}
                    >
                      <Text style={{ alignSelf: "flex-end", }}>
                        {item.text}
                      </Text>
                    </View>
                  )}
                />
              ) : (
                null
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
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
              height: 50,
              backgroundColor: "lightgray",
              borderColor: "lightgray",
            }}
            onChangeText={(text) => setInput(text)}
            value={input}
          />
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
            }}
            onPress={sendButton}
          >
            <FontAwesome name="send" size={28} color="gray" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
