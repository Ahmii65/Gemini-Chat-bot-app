import { GeminiResponse, Message } from "@/types/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRef, useState } from "react";
import { heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myTheme } from "../hooks/useColorScheme";

export default function ChatScreen() {
  const flatListRef = useRef<FlatList>(null);
  const Scheme = myTheme();
  const colorScheme = Scheme === "dark";
  const [input, setInput] = useState<string>("");
  const [Messages, setMessages] = useState<Message[]>([]);

  // when user press Send Button
  const sendButton = async () => {
    if (input.trim() === "") return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };
    setMessages((prev) => {
      const updated = [...prev, newMessage];
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
      return updated;
    });
    const userInput = input;
    setInput("");

    const aiReply = await apicall(userInput);

    if (aiReply) {
      const botMessages: Message = {
        id: Date.now().toString(),
        text: aiReply,
        sender: "bot",
      };
      setMessages((prev) => {
        const updated = [...prev, botMessages];
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
        return updated;
      });
    }
  };
  //  Calling Gemini Api
  const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  const apicall = async (input: string) => {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

      const result = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: input }],
            },
          ],
          generationConfig: {
            thinkingConfig: {
              thinkingBudget: 100,
            },
          },
        }),
      });
      const data: GeminiResponse = await result.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return reply || null;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colorScheme ? "black" : "white",
        marginTop:-30
      }}
    >
      <StatusBar
        barStyle={colorScheme ? "light-content" : "dark-content"}
        backgroundColor={colorScheme ? "black" : "white"}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == "android" ? undefined : "padding"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 60 : 0}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, }}>
            <FlatList<Message>
              data={Messages}
              ref={flatListRef}
              style={{ flex: 1 }}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="always"
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "flex-end",
                padding: 2,
                
              }}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => {}}>
                  <View
                    style={{
                      borderWidth: 1,
                      
                      borderRadius: 20,
                      padding: 15,
                      maxWidth: "80%",
                      margin: 2,
                      backgroundColor: colorScheme ? "#333333" : "lightgray",
                      borderColor: colorScheme ? "#333333" : "lightgray",
                      alignSelf:
                        item.sender === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        color: colorScheme ? "white" : "black",
                        alignSelf:
                          item.sender === "user" ? "flex-end" : "flex-start",
                      }}
                    >
                      {item.text}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            flexDirection: "row",
            padding: 5,
          }}
        >
          <TextInput
            placeholder="Type your Message.."
            placeholderTextColor={colorScheme ? "white" : "black"}
            style={{
              borderWidth: 1,
              borderRadius: 30,
              padding: 10,
              paddingLeft: 20,
              width: "85%",
              height: 50,
              backgroundColor: colorScheme ? "#333333" : "lightgray",
              borderColor: colorScheme ? "#333333" : "lightgray",
              color: colorScheme ? "white" : "black",
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
    </SafeAreaView>
  );
}
