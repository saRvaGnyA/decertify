import { Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function HomeScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <StyledView className="flex-1 items-center justify-center ">
      <StyledText className="font-extrabold text-3xl "> Welcome to </StyledText>
      <StyledText className="animate-bounce font-extrabold text-3xl">
        DeCertify
      </StyledText>
      <StyledText className="font-extrabold text-xl py-2">
        {" "}
        I am a...
      </StyledText>
      <View>
        <Button
          className="bg-gray-300 px-4 rounded-full"
          onPress={() => navigation.navigate("StudentWallet")}
        >
          <View className="flex-row items-center">
            <Ionicons
              name="person-circle-outline"
              className="px-12"
              size={48}
            />
            <StyledText className="font-extrabold text-xl px-4">
              Student
            </StyledText>
          </View>
        </Button>
        <Button
          className="bg-gray-300 px-4 rounded-full"
          onPress={() => navigation.navigate("VerifierWallet")}
        >
          <View className="flex-row  items-center">
            <Ionicons name="briefcase-outline" className="px-12" size={48} />
            <StyledText className="font-extrabold text-xl px-4">
              Verifier
            </StyledText>
          </View>
        </Button>
      </View>
    </StyledView>
  );
}
