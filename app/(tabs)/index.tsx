import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

export default function Index() {

  // step91: lets get the toggle function from the useTheme hook here below.
  const { toggleDarkMode } = useTheme();

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
    <View
    // step6: now from the stylesheet named "styles" , lets give the container class here below to this View component.
      style={styles.container}
    >

      {/* step8: similarly we can use the other classes from the stylesheet here below too. */}
      <Text style={styles.content}>Edit app/index.tsx to edit this screen.</Text>

      {/* step13: writing just some text below crashes the app. */}
      {/* hi */}

      {/* step14: must put any text inside text component here below. */}

      {/* step15: can see the gap now between the text components there now. */}
      <Text>hi</Text>

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

      {/* step155: see the next steps now in index.tsx file now there. */}
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
    </View>
  );
}

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
  },

  // step9: can create many such classes here below.
  content: {
    fontSize: 20,
  },
});
