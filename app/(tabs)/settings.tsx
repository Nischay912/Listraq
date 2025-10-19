import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProgressStats from '@/components/ProgressStats';
import Preferences from '@/components/Preferences';
import DangerZone from '@/components/DangerZone';

const SettingsScreen = () => {
  // step318: lets create two states for the auto-sync and notification button which is there just for UI and not any other functionality ; keep it "ON" i.e. "true" by default here below.

  // COMMENTED THIS LATER AS WE NO LONGER NEED IT ; WILL USE IT IN Preferences.tsx there now.
  // const [isAutoSync, setIsAutoSync] = useState(true);
  // const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  // step319: now lets get the following from useTheme hook here below.
  const { colors } = useTheme();

  // step320: lets get the styles for the settings screen from the hook we created earlier, here below.
  const settingsStyles = createSettingsStyles(colors);

  return (
    <LinearGradient
    colors={colors.gradients.background}
    style={settingsStyles.container}
    >
      {/* step321: lets put a safe area view component like done in index.tsx so that the text and content remians inside the safe view area thereand not overflows here below. */}
      <SafeAreaView
        style={settingsStyles.safeArea}
      >
        {/* step322: now lets make a header component containg the logo and the title here below. */}
        <View style={settingsStyles.header}>
          <View style={settingsStyles.titleContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingsStyles.iconContainer}
            >
              <Ionicons name='settings' size={28} color="#fff" />
            </LinearGradient>
            <Text style={settingsStyles.title}>Settings</Text>
          </View>
        </View>

        {/* step323: now lets have a ScrollViewComponent here below which is used to scroll on the screen if content exceeds the size of screen ; if this is not used, then it may happen that the content may just feel overflowing there , but you won't be able to scroll to see it there ; hence so thus here below. */}
        <ScrollView
          style={settingsStyles.scrollView}
          contentContainerStyle={settingsStyles.content}

          // step324: now lets make it here below to hide the scroll bar to be visible there , as it was not lookign good to be ; however you will still be able to scroll, but not visible the scroll bar there, hence so thus now here below.
          showsVerticalScrollIndicator={false}
        >
          {/* step325: now lets have a component here below which will be used to show the progress stats there, hence so now thus here below. */}

          {/* step326: see the next steps in ProgressStats.jsx file now there. */}
          <ProgressStats />

          {/* step337: Now lets have the "prefernces section" here below. */}

          {/* step338: see the next steps in Preferences.tsx file now there. */}
          <Preferences />

          {/* step349: now lets have the danger zone component here below. */}

          {/* step350: see the next steps in DangerZOne.tsx file now there. */}
          <DangerZone />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}
318
export default SettingsScreen