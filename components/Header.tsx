// step187: type "rnfe" to get the boilerplate first here below.
import { View, Text } from 'react-native'
import React from 'react'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { createHomeStyles } from '@/assets/styles/home.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {

    // step189: now lets also get the colors from useTheme hook and then pass it to use the homeStyles function here below.
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);

    // step188: lets get the number of todos in database using the useQuery hook here below.
    const todos = useQuery(api.todos.getTodos);

    // step191: lets get the number of completed todos here below.

    // step192: if "todos" exists , then we : loop through all todos and returns a new array containing only those todos where isCompleted is true ; so since we want a number we return its length here below ; else we return 0 if no todos exist.
    const completedCount = todos ? todos.filter((todo) => todo.isCompleted).length : 0;

    // step193: now lets get the total count of todos here below.
    const totalCount = todos ? todos.length : 0;

    // step194: to get the percentage of completed todos, we use the following basic math formula here below.
    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0; // ensure totalCount is not 0, else divide by 0 will result in NaN ; so we use ? : and calculate only if totalCount is not 0.

  return (
    // step190: can give the header style here below.
    <View style={homeStyles.header}>

      {/* step195: now lets build the UI here below. */}
      <View style={homeStyles.titleContainer}>

        {/* step196: now lets use the LinearGradient component here below. */}
        <LinearGradient colors={colors.gradients.primary} style={homeStyles.iconContainer}>

            {/* step197: now lets use the icons from the "ionicons" package here below. */}
            <Ionicons name='flash-outline' size={28} color="#ffffff" />
        </LinearGradient>

        {/* step198: now lets have another view component here below with some texts in it here below. */}
        <View style={homeStyles.titleTextContainer}>
            <Text style={homeStyles.title}>Today&apos;s Tasks</Text>
            <Text style={homeStyles.subtitle}>

                {/* step199: show the completed and total count here below. */}
                {completedCount} of {totalCount} completed
            </Text>
        </View>
      </View>

      {/* step200: now we will be showing the progress bar here below ; but only if the totalCOunt is > 0 here below. */}
      {totalCount > 0 && (
          <View style={homeStyles.progressContainer}>
            <View style={homeStyles.progressBarContainer}>
                <View style={homeStyles.progressBar}>

                    {/* step201: lets use a gradient to fill the progress bar here below , that shows the completed portion of the progress bar here below. */}
                    <LinearGradient
                        colors={colors.gradients.success}

                        // step202: the bar will always have progressFill class but the width will be set according to the progressPercentage here below dynamically.

                        // step203: so when we want to pass multiple styles, we pass it as an array : When you pass an array, React Native merges all the styles from left to right.
                        style={[homeStyles.progressFill, {width: `${progressPercentage}%`}]}
                    />
                </View>

                {/* step204: lets also show the percentage as a text here below ; Math.round used as it : rounds the percentage to the nearest whole number. */}

                {/* step205: see the next steps in index.tsx file now there. */}
                <Text style={homeStyles.progressText}>{Math.round(progressPercentage)}%</Text>
            </View>
          </View>
      )}
    </View>
  )
}

export default Header