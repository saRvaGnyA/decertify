import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";

const StyledText = styled(Text);
const StyledView = styled(View);

const DocumentList = ({ orgName, orgAddress }) => {
  const navigation = useNavigation();

  const itemName = "Marksheet";

  return (
    <StyledView className="bg-gray-200 my-1 px-2 rounded">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Application", { orgAddress });
        }}
      >
        <StyledText className="text-lg font-bold">{itemName}</StyledText>
        <StyledText className="text-sm text-gray-600">{orgName}</StyledText>
      </TouchableOpacity>
    </StyledView>
  );
};

export default DocumentList;
