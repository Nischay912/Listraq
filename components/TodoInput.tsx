// step208: now lets write "rnfe" and get the boilerplate first for the TodoInput component here below.
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme';
import { createHomeStyles } from '@/assets/styles/home.styles';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const TodoInput = () => {

    // step209: lets get the colors from useTheme hook and then pass it to use the homeStyles function here below.
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);

    // step210: now lets have a state to keep track of the input value here below.
    const [newTodo, setNewTodo] = useState('');

    // step211: now lets get the mutation and assign it to a function variable named "addTodo" here below.
    const addTodo = useMutation(api.todos.addTodo);

    // step212: now lets create a function to handle the input change here below.
    const handleAddTodo = async() => {
        // step225: now if there is some data in the input tag ; we first trim it to remove trailing and leading spaces ; and then run then try-catch block here below.
        if(newTodo.trim()) {
            try {
                // step226: lets call the mutation of adding todo with the text passed in it after trimming it to remove trailing and leading spaces here below.
                await addTodo({ text: newTodo.trim() });

                // step227: reset the form as we want the form to be empty again once the todo is added here below.
                setNewTodo('');
            } 
            catch (error) {
                console.log("Error adding todo", error);

                // step228: now we can send an aleart using the "Alert" method of react native here below ; we pass the "title" and "description" for the alert popup here below.

                // step229: now we can test the ADD button there : it will add the todo which we can see on the COnvex dashboard > data > todos there ; and its updating the UI immediately without refreshing the app because : the header.tsx file will update the "const todos" immediately there using the "useQuery" hook there and by rule of react , whenever a state changes, the component will re-render automatically there.

                // step230: see the next steps in index.tsx file now there.
                Alert.alert('Error', 'Failed to add todo');
            }
        }
    }

  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        {/* step213: now lets create a text input field here below. */}
        <TextInput
          style={homeStyles.input}
          placeholder='Enter your task here'

          // step214: now the value of the input tag will be the value of the state variable "newTodo" here below.
          value={newTodo}

          // step215: now everytime the value of the input tag changes , we will update the state variable "newTodo" here below using the "setNewTodo" function as by rule the text written inside the input tag should be equal to the value of the state variable "newTodo" here below.
          onChangeText={setNewTodo}

          // step216: now onSubmitediting means when the user presses the enter key , we will call the "handleAddTodo" function here below.
          onSubmitEditing={handleAddTodo}
          
          // step217: now we can have multiline input tag using the "multiline" prop here below.
          // multiline
          placeholderTextColor={colors.textMuted}
        />

        {/* step218: now lets have a button to submit here below. */}
        <TouchableOpacity 
            // step219: we will call the "handleAddTodo" function on press here below.
            onPress={handleAddTodo} 

            // step220: now we will set the opacity to 0.8 when the user presses and makes the button active here below.
            activeOpacity={0.8}

            // step221: the button will be disabled , when user does not enter any text in the input tag here below ; we use trim() to remove all spaces and all and then after that if still its empty means user has not entered any text in the input tag, hence then the button will be disabled.
            disabled={!newTodo.trim()}
        >
            {/* step222: now lets put a linear gradient here below with an icon for the button here below now. */}
            <LinearGradient

                // step223: if there is nothing in input and if there is something in input ; put colors accordingly there.
                colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}

                // step224: now addButton class will always be there for it ; but if there is nothing in it , then we will also apply the addButtonDisabled class here below ; and so when multiple classes to be applied we use [ ] thus here below.
                style={[homeStyles.addButton, !newTodo.trim() && homeStyles.addButtonDisabled]}
            >
                <Ionicons name='add' size={24} color="#fff" />
            </LinearGradient>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default TodoInput