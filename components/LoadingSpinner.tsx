import { createHomeStyles } from "@/assets/styles/home.styles"
import useTheme from "@/hooks/useTheme"
import { LinearGradient } from "expo-linear-gradient"
import { ActivityIndicator, Text, View } from "react-native"

const LoadingSpinner = () => {
    // step239: getting the colors and themes from our custom hook we created here below.
  const { colors } = useTheme()
  const homeStyles = createHomeStyles(colors)

  return (
    <LinearGradient colors = {colors.gradients.background} style={homeStyles.container} >
        <View style={homeStyles.loadingContainer}>

            {/* step240: the ActivityIndicator: shows a spinning loader ; which comes from react-native */}

            {/* step241: see the next steps in index.tsx file now there. */}
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={homeStyles.loadingText}>Loading...</Text>
        </View>
    </LinearGradient>
  )
}

export default LoadingSpinner