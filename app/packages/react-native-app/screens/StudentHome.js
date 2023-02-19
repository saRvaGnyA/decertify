import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export default function StudentHome() {
    const navigation = useNavigation();
    const imageURI = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fperson%2F&psig=AOvVaw3yntA6JcEEGd1AqwdmqErg&ust=1676705403435000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNDtz8GEnP0CFQAAAAAdAAAAABAJ"
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <StyledView className="">
            <StyledView className="py-8 px-3">
                <TouchableOpacity>
                    <Ionicons className="align-left" name='menu-outline' size={32}></Ionicons>
                </TouchableOpacity>
            </StyledView>
            <StyledView className="flex-2 items-center justify-center">
                <StyledImage
                    source={{ uri: 'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg' }}
                    className="h-24 w-24 rounded-full border-solid border-slate-500 border-4"
                />
                <StyledText className="font-bold my-2 text-lg">
                    John Doe
                </StyledText>
            </StyledView>

            <StyledView className="flex-1 items-center justify-center space-y-8 my-8">
                <Button className="bg-green-500 rounded-full" >
                    <StyledView className='flex-row'>
                        <StyledText className='font-extrabold text-xl'>
                            Apply
                        </StyledText>
                        <Ionicons name='enter-outline' className="px-4" size={24} />
                    </StyledView>
                </Button>
            </StyledView>

        </StyledView >
    )
}