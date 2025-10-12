// step49: type rnfe to get boilerplate here below.
import { View, Text } from 'react-native'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// step50: lets write the typescript "interface" here below which tells that Any color scheme object must have these properties.
export interface ColorScheme {
  bg: string;
  surface: string; // surface means color for cards, panels, or areas that sit on top of the background.
  text: string;
  textMuted: string; // textMuted means a lighter or faded text color (used for subtitles, labels, etc.).
  border: string;
  primary: string; // primary is the main theme color — for buttons, highlights, etc. (often blue).
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  gradients: {
    background: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
  };
  backgrounds: {
    input: string; // background color for normal input fields
    editInput: string; // background color when editing
  };
  statusBarStyle: "light-content" | "dark-content"; // | in typescript means "or" : so it tells that statusBarStyle can be either "light-content" or "dark-content".
}

// step51: now lets create two objects named "lightColors" and "darkColors" that follows the ColorScheme interface here below.
const lightColors: ColorScheme = {
  bg: "#f8fafc",
  surface: "#ffffff",
  text: "#1e293b",
  textMuted: "#64748b",
  border: "#e2e8f0",
  primary: "#3b82f6",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  shadow: "#000000",
  gradients: {
    background: ["#f8fafc", "#e2e8f0"],
    surface: ["#ffffff", "#f8fafc"],
    primary: ["#3b82f6", "#1d4ed8"],
    success: ["#10b981", "#059669"],
    warning: ["#f59e0b", "#d97706"],
    danger: ["#ef4444", "#dc2626"],
    muted: ["#9ca3af", "#6b7280"],
    empty: ["#f3f4f6", "#e5e7eb"],
  },
  backgrounds: {
    input: "#ffffff",
    editInput: "#ffffff",
  },

//   step52: "as const" just locks the value so TypeScript treats it as fixed text, not a generic string ; it means like if its just a string , then it can take up any value of string but making it "as const" ensures that it can only take a fixed value i.e. "dark-content" here below.

// step53: so we use dark content for status bar in light mode so that we can see the content below the status bar in light mode ; as if both status bar and content are white , it will not be visible , hence so thus now here below.
  statusBarStyle: "dark-content" as const, 
};

const darkColors: ColorScheme = {
  bg: "#0f172a",
  surface: "#1e293b",
  text: "#f1f5f9",
  textMuted: "#94a3b8",
  border: "#334155",
  primary: "#60a5fa",
  success: "#34d399",
  warning: "#fbbf24",
  danger: "#f87171",
  shadow: "#000000",
  gradients: {
    background: ["#0f172a", "#1e293b"],
    surface: ["#1e293b", "#334155"],
    primary: ["#3b82f6", "#1d4ed8"],
    success: ["#10b981", "#059669"],
    warning: ["#f59e0b", "#d97706"],
    danger: ["#ef4444", "#dc2626"],
    muted: ["#374151", "#4b5563"],
    empty: ["#374151", "#4b5563"],
  },
  backgrounds: {
    input: "#1e293b",
    editInput: "#0f172a",
  },
  statusBarStyle: "light-content" as const,
};

// step54: now lets create another interface for theme context type here below ; it tells that : Any object that claims to be a ThemeContextType must have the below properties.
interface ThemeContextType {
    isDarkMode: boolean,
    toggleDarkMode: () => void // means it not returns anything, just performs some action
    colors: ColorScheme // must follow the ColorScheme interface
}

// step55: now lets create a context called "ThemeContext" here below.

// step56: A context allows you to share values (like theme, language, user info) with the whole app — without passing them through every single component manually ; like without passing darkMode value through every single component manually , we can use the context here below.

// step57: we use <> to tell that : This context can either be undefined (before initialization) or an object following the ThemeContextType structure ; | means OR in typescript.

// step58: now see the next steps in step59.txt file now there.
const ThemeContext = createContext<undefined | ThemeContextType>(undefined)

// step60: now lets create a function called "ThemeProvider" here below.

// step61: now it accepts a prop called "children" ; the special prop that represents whatever elements/components are inside <ThemeProvider> ... </ThemeProvider>.

// step62: ReactNode is a TypeScript type that means anything that can be rendered using React.

// step63: so the function below : accepts a prop object that has a property named children, and its type should be ReactNode.”
export const ThemeProvider = ({ children }: { children: ReactNode }) => {

  // step64: lets create a state variable called "isDarkMode" here below with initial value of false.
  const [isDarkMode, setIsDarkMode] = useState(false);

  // step65: now we use this useEffect to run once when the page refreshes because we have [] i.e. empty array ; so it will run only once i.e. when the page refreshes.
  useEffect(() => {

    // step66: we use AsyncStorage.getItem to get the value of darkMode from local storage ; if it exists , we set it to isDarkMode using setIsDarkMode, else we set it to false. ; So if the user had dark mode on last time, it stays on when reopening the app.
    AsyncStorage.getItem("darkMode").then((value) => {
      if(value){ 
        setIsDarkMode(JSON.parse(value)); // JSON.parse(value) converts it back to a boolean.
      }
    });
  }, []);

  // step67: now we have a function that switches between light and dark mode here below.
  const toggleDarkMode = async () => {
    const newMode = !isDarkMode; // to make it true if it was false and vice versa

    // step68: we update the state value and also use "AsyncStorage.setItem" to save the value of darkMode in local storage to the vice-versa of what it was earlier.
    setIsDarkMode(newMode);

    // step69: use stringify to convert boolean to string as like local storage , async storage also stores strings only.
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  // step70: now we use "isDarkMode" to determine which colors to use here below ; if it is true , we use "darkColors" , else "lightColors" : these were the colorScheme objects that we created above earlier there.
  const colors = isDarkMode ? darkColors : lightColors;

  // step71: now we earlier created a context using "createContext" : so now Every context object has a Provider component built into it ; this Provider lets us to share data (like theme colors, dark mode state, etc.) with any components inside it — without having to pass props manually through every layer.

  // step72: so basically : A Provider makes its data available to all its child components.
  return (

    // step73: now : this "value" below is the data you are giving (providing) to all components that are wrapped inside this ThemeProvider ; so it provides all these values to all the components that are inside this ThemeProvider.
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>

      {/* step74: children is a special React prop that represents whatever you wrap inside your component ; thus whatever will be wrapped inside this ThemeContext.provider component , will get access to the values of isDarkMode, toggleDarkMode and colors that we passed in "values" above there. */}

      {/* step75: so : Any component inside can use React’s useContext(ThemeContext) to read these values. */}
      {children}

      {/* step76: note that : instead of exporting the variables to all the components where these has to be used ; we instead wrap them in Provider ; so that : React re-renders the components when the values change , if we had exported the variables , then the components would not re-render when the values change ; thats why this : updates the UI instantly when you toggle the theme. */}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
    // step77: now lets create the hook below to use the Provider component that we created above.

    // step78: useContext is a React hook that reads the current value of a context ; so it reads : { isDarkMode, toggleDarkMode, colors } which was the value of the ThemeContext.Provider component that we created above.
    const context = useContext(ThemeContext);

    // step78: if the context is undefined , throw an error ; else return the context.
    if (context === undefined) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }

    // step79: else we return the context i.e. the object with the values of isDarkMode, toggleDarkMode and colors.

    // step80: thus now any component can use const { isDarkMode, toggleDarkMode, colors } = useTheme(); to access the values of isDarkMode, toggleDarkMode and colors.

    // step81: now see the next steps in _layout.tsx of the root layout there.
    return context;
}

export default useTheme