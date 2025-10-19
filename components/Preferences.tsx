import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Preferences = () => {
    // step339: lets create two states for the auto-sync and notification button which is there just for UI and not any other functionality ; keep it "ON" i.e. "true" by default here below.
    const [isAutoSync, setIsAutoSync] = useState(true);
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

    // step340: now lets get the needed colors and styles here below.
    const { colors, isDarkMode, toggleDarkMode } = useTheme();
    const settingsSyles = createSettingsStyles(colors);

    return (
        <LinearGradient
            colors={colors.gradients.surface}
            style={settingsSyles.section}
        >
            <Text style={settingsSyles.sectionTitle}>App Controls</Text>

            {/* step341: now lets get the dark mdoe enable/disbale button here below. */}
            <View style={settingsSyles.settingItem}>
                <View style={settingsSyles.settingLeft}>
                    <LinearGradient
                        colors={colors.gradients.primary}
                        style={settingsSyles.settingIcon}
                    >
                        <Ionicons name='moon' size={18} color="#fff" />
                    </LinearGradient>
                    <Text style={settingsSyles.settingText}>Dark Mode</Text>
                </View>

                {/* step342: now lets have the switch component here below. */}
                <Switch
                    // WE HAVE THE VALUE OF IT DEPENEDENT ON THE STATE VALUE AND ALSO RUNS THE TOGGLE-DARK-MODE METHOD ON CLICKING IT HERE BELOW.
                    value={isDarkMode}
                    onValueChange={toggleDarkMode}
                    thumbColor={"#fff"}

                    // step343: the track color is used to tell the color of the track in background of switch there ; if false we will have different color and different when its true here below.
                    trackColor={{false : colors.border, true : colors.primary}}

                    // step344: now lets have the ios_backgroundColor here below which helps to have a customized background color for disabled case for "ios" users here below.
                    ios_backgroundColor={colors.border}
                />

            </View>

            {/* step345: now similarly lets have the notifications thing here below. */}
            <View style={settingsSyles.settingItem}>
                <View style={settingsSyles.settingLeft}>
                    <LinearGradient
                        colors={colors.gradients.warning}
                        style={settingsSyles.settingIcon}
                    >
                        <Ionicons name='notifications' size={18} color="#fff" />
                    </LinearGradient>
                    <Text style={settingsSyles.settingText}>Notifications</Text>
                </View>
                <Switch
                    // step346: we will have its value equal to isNotificationEnabled state here below ; and on change of its value we also update the state to its negation i.e. true to false and vice-versa here below.
                    value={isNotificationEnabled}
                    onValueChange={() => setIsNotificationEnabled(!isNotificationEnabled)}
                    thumbColor={"#fff"}
                    trackColor={{false : colors.border, true : colors.warning}}
                    ios_backgroundColor={colors.border}
                />

            </View>

            {/* step347: now lets have similarly the auto-sync thing here below. */}

            {/* step348: see the next steps in settings.tsx file now there. */}
            <View style={settingsSyles.settingItem}>
                <View style={settingsSyles.settingLeft}>
                    <LinearGradient
                        colors={colors.gradients.success}
                        style={settingsSyles.settingIcon}
                    >
                        <Ionicons name='moon' size={18} color="#fff" />
                    </LinearGradient>
                    <Text style={settingsSyles.settingText}>Auto Sync</Text>
                </View>
                <Switch
                    value={isAutoSync}
                    onValueChange={() => setIsAutoSync(!isAutoSync)}
                    thumbColor={"#fff"}
                    trackColor={{false : colors.border, true : colors.success}}
                    ios_backgroundColor={colors.border}
                />

            </View>
        </LinearGradient> 
    )
}

export default Preferences