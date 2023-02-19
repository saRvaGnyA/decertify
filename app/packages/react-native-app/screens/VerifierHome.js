import { View, Text } from 'react-native'
import React from 'react'
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
const StyledView = styled(View);
const StyledText = styled(Text);

export default function VerifierHome() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

  return (
    <View>
      <Text>VerifierHome</Text>
    </View>
  )
}