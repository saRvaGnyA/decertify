import { Text, View, TextInput } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import Button from '../components/Button';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function StudentRegister() {
  return (
    <StyledView className="flex-1 items-center justify-center ">
        <StyledText className="text-3xl font-extrabold"> User Registration </StyledText>
        <StyledView className="p-4 rounded shadow-md">
            <StyledText className="text-lg m-1">Name:</StyledText>
            <TextInput placeholder='John Doe' className="bg-gray-400 rounded w-64 pt-2 p-2 text-lg"></TextInput>
            <StyledText className="text-lg m-1">Registration ID:</StyledText>
            <TextInput placeholder='Enter your Reg ID' className="bg-gray-400 rounded w-64 pt-2 p-2 text-lg"></TextInput>
            <StyledText className="text-lg m-1">Email ID:</StyledText>
            <TextInput placeholder='email@example.com' className="bg-gray-400 rounded w-64 pt-2 p-2 text-lg"></TextInput>
            <StyledText className="text-lg m-1">Mobile No:</StyledText>
            <TextInput placeholder='912319210932' className="bg-gray-400 rounded w-64 pt-2 p-2 text-lg"></TextInput>
        </StyledView>
        <StyledView className='flex-row'>
        <Button className="bg-blue-400 mx-2 ">
            <StyledText className='font-bold text-lg'> Submit </StyledText>
        </Button>
        <Button className="bg-blue-400 mx-2">
            <StyledText className='font-bold text-lg'> Clear </StyledText>
        </Button>
        </StyledView>
    </StyledView>
  )
}