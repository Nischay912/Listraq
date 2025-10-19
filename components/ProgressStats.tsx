import { View, Text } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ProgressStats = () => {
    // step327: lets get the variables and functions from the hooks we created earlier here below.
    const {colors} = useTheme();
    const settingsStyles = createSettingsStyles(colors);


    // step328: lets now get the todos here from the database here below ; we can use "useQuery" to make a GET request to get all the todos from the database and then we can use the "todos" variable to display the progress stats here below.
    const todos = useQuery(api.todos.getTodos);
    
    // step329: now lets get the length of todos array to show total number of todos here below ; if it not exists then show 0 else not here below.
    const totalTodos = todos ? todos.length : 0;

    // step330: for the completed tasks, lets get the todos having isCompleted field as "true" and get the filtered array here below ; .filter() creates a new array containing only the todos that match the given condition ; and then we get its length to get the number of completedTasks here below.
    const completedTodos = todos ? todos.filter((todo) => todo.isCompleted).length : 0;

    // step331: and then get the active OR uncompleted todos here below.
    const activeTodos = totalTodos - completedTodos;

    return (
        <LinearGradient
            colors={colors.gradients.surface}
            style={settingsStyles.section}
        >
            <Text style={settingsStyles.sectionTitle}>User Panel</Text>

            <View style={settingsStyles.statsContainer}>

                {/* step332: first lets have the "total todos" here below. */}
                <LinearGradient
                    colors={colors.gradients.background}
                    // step333: we use [ ] array of styles to apply the statCard style first always there & on top of it also applu the borderLeft style here below.
                    style={[settingsStyles.statCard, {borderLeftColor: colors.primary}]}
                >
                    <View
                        style={settingsStyles.statIconContainer}>
                            <LinearGradient
                                colors={colors.gradients.primary}
                                style={settingsStyles.statIcon}
                            >
                                <Ionicons name='list' size={20} color="#fff" />
                            </LinearGradient>
                        </View>
                        <View>
                            <Text style={settingsStyles.statNumber}>{totalTodos}</Text>
                            <Text style={settingsStyles.statLabel}>Total Tasks</Text>
                        </View>
                </LinearGradient>

                {/* step334: now lets have the completed todos here below. */}
                <LinearGradient
                    colors={colors.gradients.background}
                    style={[settingsStyles.statCard, {borderLeftColor: colors.success}]}
                >
                    <View
                        style={settingsStyles.statIconContainer}>
                            <LinearGradient
                                colors={colors.gradients.success}
                                style={settingsStyles.statIcon}
                            >
                                <Ionicons name='checkmark-circle' size={20} color="#fff" />
                            </LinearGradient>
                        </View>
                        <View>
                            <Text style={settingsStyles.statNumber}>{completedTodos}</Text>
                            <Text style={settingsStyles.statLabel}>Completed Tasks</Text>
                        </View>
                </LinearGradient>

                {/* step335: now lets have the active todos here below. */}

                {/* step336: see the next steps in settings.tsx file now there. */}
                <LinearGradient
                    colors={colors.gradients.background}
                    style={[settingsStyles.statCard, {borderLeftColor: colors.warning}]}
                >
                    <View
                        style={settingsStyles.statIconContainer}>
                            <LinearGradient
                                colors={colors.gradients.warning}
                                style={settingsStyles.statIcon}
                            >
                                <Ionicons name='time' size={20} color="#fff" />
                            </LinearGradient>
                        </View>
                        <View>
                            <Text style={settingsStyles.statNumber}>{activeTodos}</Text>
                            <Text style={settingsStyles.statLabel}>Active Tasks</Text>
                        </View>
                </LinearGradient>
            </View>
        </LinearGradient>
    )
}

export default ProgressStats