import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

// step170: same as home.styles.ts : here also we have the function "createSettingsStyles" here below which takes the "colors" object that comes dynamically from the useTheme hook here below based on the value of "isDarkMode" from the useTheme hook here below.

// step171: see the next steps in index.tsx file now there.

export const createSettingsStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    
    container: { flex: 1 }, // main wrapper takes full height of the screen

    safeArea: { flex: 1 }, // ensures content stays within safe area (notch/status bar)

    header: { 
      paddingHorizontal: 24, // padding left/right inside header
      paddingVertical: 32,   // padding top/bottom inside header
      paddingBottom: 24,     // overwrite bottom padding for spacing
    },

    titleContainer: { 
      flexDirection: "row", // children arranged horizontally
      alignItems: "center", // vertically center items
    },

    iconContainer: { 
      width: 56,            // width of icon container
      height: 56,           // height of icon container
      borderRadius: 16,     // rounded corners
      justifyContent: "center", // center icon horizontally
      alignItems: "center",     // center icon vertically
      marginRight: 16,      // space between icon and title
    },

    title: { 
      fontSize: 32,         // big title text
      fontWeight: "700",    // bold
      letterSpacing: -1,    // tighter letters
      color: colors.text,   // dynamic color from theme
    },

    scrollView: { flex: 1 }, // scrollable area takes full height

    content: { 
      paddingHorizontal: 20, // padding left/right
      gap: 20,               // spacing between children vertically
      paddingBottom: 120,    // space at bottom for scrollable content
    },

    section: { 
      borderRadius: 20,      // rounded corners
      padding: 24,           // internal padding
      shadowColor: "#000",   // shadow color for iOS
      shadowOffset: { width: 0, height: 4 }, // shadow offset
      shadowOpacity: 0.1,    // shadow transparency
      shadowRadius: 8,       // shadow blur
      elevation: 8,          // shadow depth on Android ; elevation is used to create a shadow on the section, in android
    },

    sectionTitle: { 
      fontSize: 20,          
      fontWeight: "700",     
      marginBottom: 20,      
      letterSpacing: -0.5,   
      color: colors.text,    // theme-based color
    },

    sectionTitleDanger: { 
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 20,
      letterSpacing: -0.5,
      color: colors.danger,  // red color for dangerous actions
    },

    statsContainer: { gap: 16 }, // spacing between stat cards

    statCard: { 
      flexDirection: "row",   // layout children in a row
      alignItems: "center",   // vertically center children
      padding: 20,            // internal padding
      borderRadius: 16,       // rounded corners
      borderLeftWidth: 4,     // left border line (color applied separately)
    },

    statIconContainer: { marginRight: 16 }, // spacing between icon and text

    statIcon: { 
      width: 40, 
      height: 40, 
      borderRadius: 20, 
      justifyContent: "center", 
      alignItems: "center", 
    },

    statNumber: { 
      fontSize: 28, 
      fontWeight: "800", 
      letterSpacing: -1, 
      color: colors.text, 
    },

    statLabel: { 
      fontSize: 14, 
      fontWeight: "600", 
      marginTop: 2, 
      color: colors.textMuted, // lighter text color for labels
    },

    settingItem: { 
      flexDirection: "row", 
      justifyContent: "space-between", // space between label and toggle
      alignItems: "center", 
      paddingVertical: 20, 
      borderBottomWidth: 1, 
      borderBottomColor: colors.border, // separator line color
    },

    settingLeft: { 
      flexDirection: "row", 
      alignItems: "center", 
      flex: 1,               // takes remaining horizontal space
    },

    settingIcon: { 
      width: 36, 
      height: 36, 
      borderRadius: 8, 
      justifyContent: "center", 
      alignItems: "center", 
      marginRight: 16,       // spacing between icon and text
    },

    settingText: { 
      fontSize: 17, 
      fontWeight: "600", 
      color: colors.text,    // theme-aware text color
    },

    actionButton: { 
      flexDirection: "row", 
      alignItems: "center", 
      justifyContent: "space-between", 
      paddingVertical: 20, 
      borderBottomWidth: 1, 
      borderBottomColor: colors.border, 
    },

    actionLeft: { flexDirection: "row", alignItems: "center", flex: 1 },

    actionIcon: { 
      width: 36, 
      height: 36, 
      borderRadius: 8, 
      justifyContent: "center", 
      alignItems: "center", 
      marginRight: 16, 
    },

    actionText: { fontSize: 17, fontWeight: "600", color: colors.text },

    actionTextDanger: { fontSize: 17, fontWeight: "600", color: colors.danger },

  });

  return styles; // returns the generated StyleSheet object
};
