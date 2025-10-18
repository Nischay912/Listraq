import { createHomeStyles } from "@/assets/styles/home.styles"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { Text, View } from "react-native"
import useTheme from "@/hooks/useTheme"

const EmptyState = () => {
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);
    return (
        <View style={homeStyles.emptyContainer}>
            <LinearGradient
                colors={colors.gradients.empty}
                style={homeStyles.emptyIconContainer}
            >
                <Ionicons name="clipboard-outline" size={60} color={colors.textMuted} />
            </LinearGradient>

            {/* step276: so we show these texts there in case of no todos thus here below. */}

            {/* step277: see the next steps in index.tsx file now there. */}
            <Text style={homeStyles.emptyText}>No tasks added yet!</Text>
            <Text style={homeStyles.emptySubtext}>Add your first task and get started</Text>
        </View>
    )
}

export default EmptyState