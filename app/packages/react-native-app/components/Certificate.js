import { View, Text, Image } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image);

const Certificate = ({ name, imageURI, date, issuer }) => {
    return (
        <TouchableOpacity>
            <StyledView className='flex-row my-2'>
                <Image
                    source={{ uri: imageURI }}
                    className="w-16 p-9 ml-2 mr-2"
                />
                <StyledView className="flex-col flex-1">
                    <StyledText className="font-bold text-lg ">{name}</StyledText>
                    <StyledText className="text-xs text-gray-400">Issued by: {issuer}</StyledText>
                    <StyledText className="text-xs text-gray-400">Issued on: {date}</StyledText>
                </StyledView>
                <Ionicons className="" name="chevron-forward-outline" size={56}></Ionicons>
            </StyledView>
        </TouchableOpacity>
    )
}

export default Certificate