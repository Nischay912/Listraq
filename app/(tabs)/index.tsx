import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { Link } from "expo-router";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";

export default function Index() {

  // step91: lets get the toggle function from the useTheme hook here below.

  // step155: now as per the useTheme hook we made ; we get the "colors" from it of lightMode as well as darkMode depending on the state of isDarkMode there.
  const { toggleDarkMode, colors } = useTheme();

  // step164: now lets get the styles from the "createStyles" function here below.

  // step165: see the next steps in step166.txt file now there.

  // const styles = createStyles(colors);

  // step173: lets call the createHomeStyles function here below to use its styles now here below.
  const homeStyles = createHomeStyles(colors);

  // step143: lets call the query to get all the todos here in the home screen.

  // step144: the useQuery works similar to useState + useEffect here as : it update the component when the data changes.

  // step145: we are using "api" here ; "api" is usually an auto-generated object by Convex that contains all your backend queries and mutations ; so it sees that under the "todos" table , we have a "getTodos" query which it calls thus here below.

  // const todos = useQuery(api.todos.getTodos);

  // step146: we can do console.log(todos) here to see the data that is being fetched from the backend.

  // step147: now in terminal of vs-code where app running : press "r" to reload the app > then we can see initially "undefined" being logged as then its in loading state while fetching data from the backend , but once fetched , it logs there [] i.e. an empty array as currently there are no todos in our backend there.

  // console.log(todos);

  // step148: similarly, we can make POST requests using "useMutation" here below too.
  // const addTodo = useMutation(api.todos.addTodo);

  // step153: lets use another mutation to clear all the todos here below.
  // const clearAllTodos = useMutation(api.todos.clearAllTodos);

  return (

    // step178: lets wrap the entire app with the LinearGradient component to use the linear gradient here below.
    <LinearGradient
      // step179: lets pass the colors of gradient here below from the useTheme hook here below.

      // step181: if the new pacakage downloaded not upadting on app : click "r" in terminal while npx expo is running to rebundle and restart the app.

      // step182: we can now see the gradient of color change there ; and its coming from "gradients" in the useTheme hook here below.
      colors={colors.gradients.background}

      // step180: now lets give the styles from home.styles.ts here below.
      style={homeStyles.container}
    >

        {/* step183: we now in simulator , see that the status bar of mobile i.e. where time battery and all are there : its also white when im in light mode and its also dark when in dark mode ; making it not visible ; so to fix this we use the "StatusBar" component here below. */}
        <StatusBar

        // step184: in the useTheme we had made there that in light mode , status bar is dark ; and in dark mode , status bar is light thus here below ; so now it works dynamically based on the theme thus here below ; we can manually put values like "light-content" or "dark-content" here below too ; but betetr to keep it dynamically thus here below.
          barStyle={colors.statusBarStyle}
        />

        {/* // step174: for now the content is going outside the view : called "SAFE AREA VIEW" : so we want the content to always be visible within the view and never overflow or overlap with the "status bar" thus here below : so lets use <SafeAreaView> instead of <View> here below. */}
        <SafeAreaView
        // step6: now from the stylesheet named "styles" , lets give the container class here below to this View component.

        // step163: now this "styles" below is coming undefined , as we have made the styles to be returned from the "createStyles" function there; so lets get it from there first in the next steps now there.

        // step175: lets give it the "safeArea" class to this here below ; and now the content will be within the safeArea view there now.

        // step176: see the next steps in step177.txt file now there.
          style={homeStyles.safeArea}
        >

          {/* step8: similarly we can use the other classes from the stylesheet here below too. */}
          {/* <Text style={homeStyles.content}>Edit app/index.tsx to edit this screen.</Text> */}

          {/* step13: writing just some text below crashes the app. */}
          {/* hi */}

          {/* step14: must put any text inside text component here below. */}

          {/* step15: can see the gap now between the text components there now. */}
          {/* <Text>hi</Text> */}

          {/* step185: now lets make show a header component here below for the homepage that contains many things. */}

          {/* step186: see the next steps in "components" folder > Header.tsx file now there." */}
          <Header />

          {/* step206: now lets render the Todo Input component to see an input tag in order to add a todo there , thus here below. */}

          {/* step207: see the next steps now in TodoInput.tsx file now there. */}
          <TodoInput />

          {/* step92: lets create a button , which is "TouchableOpacity" in React Native thus here below. */}
          <TouchableOpacity onPress={toggleDarkMode}>

            {/* Toggle the theme */}

            {/* step93: we can't have the text of button too as such , but must be inside a "Text" component here below. */}

            {/* step94: now on clicking this we will see the color change stating we now are in a different mode : and after going to dark mode if we close the app there and then re-run the app, it will still be in dark mode there as we had used AsyncStorage to save the value of darkMode in local storage there earlier. */}

            {/* step95: now see the next steps in step96.txt file now there. */}
            <Text>Toggle the theme</Text>
          </TouchableOpacity>

          {/* step149: lets create a button for now to add a todo here below. */}

          {/* step150: it calls the function with "text" as argument here below; name of argument is kept same as mentioned in backend file there earlier too there. */}

          {/* step151: see the next steps in step152.txt file now there. */}

          {/* <TouchableOpacity onPress= {() => addTodo({ text: "Buy some milk" })} >
            <Text>Add a todo</Text>
          </TouchableOpacity> */}

          {/* step154: now lets make a button to clear all the todos here below, which when clicked will delete all the todos from "convex" database there and also the console log will now show [] empty as all the todos have been deleted there now thus here below. */}

          {/* <TouchableOpacity onPress={() => clearAllTodos()}>
            <Text>Clear all todos</Text>
          </TouchableOpacity> */}

          {/* step16: now lets use the Link component here below from the "expo-router" package. */}

          {/* step17: create this screen as a file "about.tsx" in the "app" folder. */}

          {/* step18: see the next steps in about.tsx file now there. */}

          {/* step22: now put the href to take us to the about screen here below. */}

          {/* step23: now when we click on that link, it will take us to the about screen ; and there we already have a back button there to go back to the home screen ; its due to the <Stack /> navigator component that we have in the _layout.tsx file there ; which helps us to give a stack like navigation i.e. new screens will be coming from the right hand side there ; and the previous screens will be coming from the left hand side there ; OR it may come from bottom and go back from top , depending on the device. */}

          {/* step24: see the next steps in _layout.tsx file now there. */}
          
          {/* <Link href={"/about"}>Visit the about screen</Link> */}
        </SafeAreaView>
    </LinearGradient>
  );
}

// step172: lets comment out the below function as it was for testing purposes only.
/*

// step157: now lets wrap the below function by another function that takes "colors" as an argument here below.

// step158: we must mention the interface of "colors" here below too , else it will throw an error.
const createStyles = (colors: ColorScheme) => {

    // step4: lets now place the styles in a function below that uses the StyleSheet of react-native and give it a name "styles" here below.
    const styles = StyleSheet.create({

      // step5: lets put the classes to be given under the "container" here below.
      container: {

        // step10: in mobile application, flex is by default as "col" and not "row" like in web application.
        flex: 1,

        // step11: we must give flex-direction as "row" here below to make it a row.
        // flexDirection: "row",

        // step12: can also give gaps between the elements here below.
        gap: 10,
        // backgroundColor: "#00fbd5ff",
        alignItems: "center",
        justifyContent: "center",

        // step156: so now here we should be able to use the "colors" from the useTheme hook here below ; but using it here below is telling "colors" as undefined : so how to use it here below now ; for that we wil wrap this with a function in the next step now there.

        backgroundColor: colors.bg,
      },

      // step9: can create many such classes here below.
      content: {
        fontSize: 20,
      },
    });

    // step159: now return the inner function from the outer function here below.

    // step160: so the problem that was coming in step156 earlier was because : Hooks can only be called inside a component or another hook, not at the top level ; So if you try to use colors directly outside a component, it will be undefined, causing an error.

    // step161: so we used it now inside a component that takes "colors" as an argument , thus here below.

    // step162: and so now : the colors.bg will be dynamic as the "colors" object value comes based on the state of isDarkMode here below.
    return styles;
  }

*/