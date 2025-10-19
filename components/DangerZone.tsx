import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const DangerZone = () => {
    // step351: first lets get the variables and functions from various hooks here below.
    const { colors } = useTheme();
    const settingsStyles = createSettingsStyles(colors);

    // step352: now lets make a POST request to the backend server here below.
    const clearAllTodos = useMutation(api.todos.clearAllTodos)

    // step353: now lets define the function to be called when reset button clicked there, here below.
    const handleResetApp = async() => {

        // step354: now lets have a alert pop-up to be shown here below when the delete button clicked here below.
        Alert.alert(

            // step355: lets first have the "title" here below.
            "Reset the App",

            // step356: then we have the "description" here below.
            "⚠️ This will delete all your tasks permanently and reset the app. This action cannot be undone!",

            // step357: now lets have the array of buttons here below ; where each button is an array of object here below.
            [
                // step358: style kept cancel which makes it look like a normal button there here below with some properties like : It highlights this button as a cancel/dismiss option — on iOS, it’s bold and separated; on Android, it just behaves normally.
                { text: "Cancel", style: "cancel" },
                {
                    // step359: the style "destructive" makes it Red text (used for actions like Delete).
                    text: "Reset",
                    style: "destructive",

                    // step360: then we call the function of POST request to the backend on pressing it here below.
                    onPress: async() => {
                        try{
                            const result = await clearAllTodos();

                            // step361: after successful deletion, show this popup again here below.
                            Alert.alert(
                                "App Reset Done",
                                // step362: in description of alert pop-up : we also use the "deletedCount" variable whch was there in the object returned by the POST request to the backend we made earlier i.e. the "clearAllTodos" function here below.

                                // step363: if only 1 todo was deleted , use singular text ; else put "s" at end too to show the plurality here below.
                                `Successfully deleted ${result.deletedCount} tasks${result.deletedCount === 1 ? "" : "s"}. Your App has been reset successfully. `
                            );
                        }
                        catch(error){
                            console.log("Error resetting the app", error)

                            // step364: on failure , show the below alert-popup here below.
                            Alert.alert("Error", "Failed to reset the app")
                        }
                    }
                }
            ]
        )
    }

    return (
        // step365: now lets make the UI of the component here below.
        <LinearGradient
            colors={colors.gradients.surface}
            style={settingsStyles.section}
        >
            <Text style={settingsStyles.sectionTitleDanger}>Danger Zone</Text>
            <TouchableOpacity
                // step366: now lets have the styles as an array here below ; when we pass styles as an array ; it applies all those styles one by one starting from left to right there, here below.

                // step367: so it will apply the actionButton style first here below and then the width of the bottom-border , here below.
                style={[settingsStyles.actionButton, {borderBottomWidth: 0 }]}

                // step368: now lets call this below function on pressing the button here below.
                onPress={handleResetApp}
                activeOpacity={0.7}
            >
                <View style={settingsStyles.actionLeft}>
                    <LinearGradient
                        colors={colors.gradients.danger} style={settingsStyles.actionIcon}>
                            <Ionicons name='trash' size={18} color='#fff' />
                        </LinearGradient>
                        <Text style={settingsStyles.actionTextDanger}>Reset App</Text>
                </View>
                {/* step369: this will add the forward arraow button, thus here below. */}

                {/* step370: FINAL STEP : PROJECT COMPLETED ! */}
                <Ionicons name='chevron-forward' size={18} color={colors.textMuted} />
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default DangerZone