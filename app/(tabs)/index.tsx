import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { Link } from "expo-router";
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "@/components/EmptyState";
import { use, useState } from "react";

// step252: lets get the type of each item in todos array using the Convex function "Doc" which takes the table "todos" as input and returns the type of each item as per the table's Schema here below ; if we hover on Todo : we can see the type its having here below.
type Todo = Doc<"todos">

export default function Index() {

  // step288: now on clicking EDIT button , we want a new state to be rendered there with input tag and save or cancel button ; so lets create the two states needed here below.

  // step289: we have a state to "store the ID of the todo item currently being edited" ; and as per Typescript , we need to mention its type too along with initial values or the values it can be : here below its that : it can either be : an ID (of type Id<"todos"> — i.e., an identifier from Convex’s "todos" table), or null i.e. "no todo being editted / no todo selected for editting for now".
  const [edittingId , setEdittingId] = useState<Id<"todos"> | null>(null)

  // step290: now lets lets have a state to : store the current text entered while editing a todo item ; intially "null" i.e. nothing typed there for editting it there, hence so now thus here below.
  const [editText, setEditText] = useState("")

  // step91: lets get the toggle function from the useTheme hook here below.

  // step155: now as per the useTheme hook we made ; we get the "colors" from it of lightMode as well as darkMode depending on the state of isDarkMode there.
  const { toggleDarkMode, colors } = useTheme();

  // step164: now lets get the styles from the "createStyles" function here below.

  // step165: see the next steps in step166.txt file now there.

  // const styles = createStyles(colors);

  // step173: lets call the createHomeStyles function here below to use its styles now here below.
  const homeStyles = createHomeStyles(colors);

  // step231: lets now call the function of CONVEX to get all the todos using the useQuery hook here below.
  const todos = useQuery(api.todos.getTodos);

  // step236: lets now make a variable to show that if the data has not been fetched yet ; i.e. when we hover on "todos" variable above ; we see | undefined there ; i.e. if todos were not fetched then its undefined ; so lets make isLoading to be true if its undefined and false if its not undefined here below.
  const isLoading = todos === undefined

    // step264: lets create a function that calls the convex database to call the toggleTodo method here below using useMutation to make a POST request to the database and make the changes thus here below.

    // step265: put this above the if consition as this "hook" has to be always be called there ; else it will call error as early return may occur there if the "if" statement is above this hook here below.
  const toggleTodo = useMutation(api.todos.toggleTodo);

  // step281: now lets make another POST request using useMutation to make a call to the backedn for delete thus now here below.
  const deleteTodo = useMutation(api.todos.deleteTodo)

  // step296:now lets make a POST request to backend via "useMutation" method here below which makes call to the mutation to update Todo here below.
  const updateTodo = useMutation(api.todos.updateTodo)

  // step237: lets render the LoadingSpinner component here below when isLoading is true.

  // step238: see the next steps in LoadingSpinner.tsx file now there.

  // step242: can now see the loading spinner there ; if we make the condition "true" inside the "if" here below just for testig purpose thus here below.
  // if(true) return <LoadingSpinner />
  
  if(isLoading) return <LoadingSpinner />

  // step262: now lets create the function for toggling here below.

  // step263: now here since in TypeScript we always must mention the type of prop , which is Id of item of todos table ; so we can't say its string ; rather get Id from "convex" and pass it as a prop here below ; so now it will treat it as Id of "todos" table type here below ; this thus : Helps prevent mistakes by checking that you don’t pass some random string or number. Id<"todos"> is a special type from Convex that ensures the id is a valid ID from the "todos" table.
  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      // step266: now lets call the function to toggleTodo here below ; with the "id" of todo to be toggled as { } object as the toggleTodo metod there also was asking an object as input there too , hence so now thus here below.
      await toggleTodo({id});
    } 
    catch (error) {
      console.error("Error toggling todo:", error);

      // step267: this alert is like "alert" coming on phone where we write first the "title" of alert pop-up and then its description , thus here below.
      Alert.alert("Error", "Failed to toggle todo");
    }
  }

  // step280: now lets create the function to delete the todos, thus here below ; with the parameters and type fetched similarly to the toggle function defined above, thus here below.
  const handleDeleteTodo = async(id: Id<"todos">) => {
    // step282: first lets get the alert popup before deleting here below, using "Alert" function of react-native thus here below.

    // step283: in Alert syntax is to first pass "Title" , then "Description" and then array of buttons , where each button is an object passed inside { } each there.
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [

      // step284: the "text" tells what that button will show ; we have no "onPress" for this cancel button as if no onPress is written ; it means clicking it won't do anything , just remove the popup and thats what we want ; we can console log onPress , else leave it like this also, hence so now thus here below.

      // step285: now keep the style for cancel as "cancel" itself ; not destructive as we don't want it to look red on IOS ; "cancel" style : Bold text (on iOS) or positioned first & Used for safe or neutral options ; WE COULD HAVE ALSO USED : style : "normal" for Regular text ; Normal button (default if you omit style here below).
      {text: "Cancel", style: "cancel"},

      // step286: we now make the below button "destructive" style to make it look : Red text (on iOS) or red highlight ; Used for dangerous actions like delete.

      // step287: and then on pressing it call the function to actually delete the todos there, hence so now thus here below.
      {text: "Delete", style: "destructive", onPress: async() => {
        deleteTodo({id})
      }}
    ])
  }

  // step291: now lets define the function to handle the editting here below ; which takes the "todo" as input in it , which is of the type "Todo" defined earlier above there i..e its a item of the "todos" table of the convex table , hence so now thus here below.
  const handleEditTodo = (todo:Todo) => {

    // step292: when this function runs , we want to have the current text of todo in the input tag that appears on clicking the EDIT button, hence so there now below.
    setEditText(todo.text)

    // step293: also set the editting id to the todo being ediited here below.
    setEdittingId(todo._id)
    
  }

  // step297: now lets create a function to handle how to save the new task when clicked on the "Save" button , hence so now thus here below.

  const handleSaveEdit = async () => {
    // step302: lets put an if statement to check if its not null and then only proceed to prevent any crash or error to happen here below.
    if(edittingId){
      try{
        // step298: now lets make call to the updateTodo function here below.

        // step299: we pass in it the "id" we want to delete the todo of ; and the text we want to replace the current text of task with ; used "trim" to remove trailing and following extra spaces entered by user if there.

        // step300: we pass this as object { } because the function "updateTodo" we created in backend wanted object with id and text there , thats why hence so now thus here below.

        // step301: but the "id" can be "null" too as per its initial value that we had set earlier there above ; so lets wrap this inside a if statement here below.
        await updateTodo({id:edittingId, text:editText.trim()})

        // step303: now once update done ; set back the states to their initial values again now thus here below.
        setEdittingId(null)
        setEditText("")
      }
      catch(error){
        console.log("Error updating the task", error)

        // step304: can add a alert popup with the following title and description now here below.
        Alert.alert("Error", "Failed to update the task")
      }
    }
  }

  // step294: lets create a function now to handle what to happen if we click on the Cancel button while editting there, hence so now thus here below.
  const handleCancelEdit = () => {
    // step295: when we cancel the editting , we will set the states back to their default values here below.
    setEdittingId(null)
    setEditText("")
  }

  // step249: lets now define the function here below.

  // step250: FlatList by rule passes "item" as the one element from the "data" array there ; in our case "data" was the "todos" array ; and in TypeScript best practice is to mention its type too along with it like done here below.

  // step 251: React Native’s FlatList calls your renderItem function like this internally: renderItem({ item, index, separators }) ; but we need only the "item" so destructure it using {} here below.
  const renderTodoItem = ({item}: {item:Todo}) => {

    // step305: now lets create a variable to keep track of if we are editting or not here below.

    // step306: FlatList renders each todo seperately by rule unlike "map" ; so each todo gets its own renderTodoItem ; so for a todo if edittingId is equal to that todo's id, then it will be sure that the current todo is being edited , else "false" ; hence so now thus here below ; we know that in the FlatList we created ; this renderTodoItem function runs for each item and its item._id ; so this is being done for each item of todo ; and then based on if we are editting it or not ; we show that UI for that specific todo ; while the rest remains unchanged which are not being editted currently ; i.e. that whose isEditting is still "false" will still remain as it is, hence so now thus here below.
    const isEditting = edittingId === item._id

    // step252: now lets return the following component for each item of "todos" here below.
    return (
      <View style={homeStyles.todoItemWrapper}>
        {/* step253: lets now make the container to have a gradient like mentioned here below. */}
        <LinearGradient
          colors={colors.gradients.surface} 
          style={homeStyles.todoItem} 

          // step254: but gradient color variation , we want to have top left to bottom right and not the default top to bottom ; so lets mention it here below specifically here below.

          // step254: so its like -
          /*
          (0,0) ----- (0,1)
            |
            |
          (1,0) ----- (1,1)

          so : for top left to bottom right , mention the same here below.
          */
          start={{x:0, y:0}}
          end={{x:1, y:1}}
        >
          {/* step255: now for the content of the gradient container ; we first want a button here below to check or uncheck a task here below. */}
          <TouchableOpacity
            style={homeStyles.checkbox}

            // step256: lets make it to be 70% visible when active ; this makes it slightly faded on pressing , giving a good realistic feel to the user, here below.
            activeOpacity={0.7}

            // step261: now lets call the method to handle the toggling here below ; by passing the "id" of the item as a prop in it here below.
            onPress={() => {handleToggleTodo(item._id)}}
          >
            {/* step257: now inside the button , we want to show the checkmark here below ; so lets add a linear gradient for it as well here below. */}
            <LinearGradient

            // step258: give colors based on the status of isCompleted here below.
              colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}

              // step259: passing the styles as array i.e. all styles will be merged and applied ; i..e checkboxInner will always be there ; but if the item has been marked completed , then we show no border i.e. transparent ; but if its not completed then show the border color present in "colors" of theme here below.
              style={[
                homeStyles.checkboxInner,
                {borderColor: item.isCompleted ? "transparent" : colors.border},
              ]}
            >
              {/* step260: if the task is completed ; we show the checkmark here below inside the button here below. */}
              {item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />}

            </LinearGradient>
          </TouchableOpacity>

          {/* step268: now after the button i.e. after the touchable opacity , lets put the actual text from database here below now. */}

          {/* step307: so we will be showing the content inside the gradient box for each todo ; based on if the current todo is being editted or not ; if NOT then we show the UI we created earlier ; else render the following UI for that todo being editted, hence so now thus here below ; we know that in the FlatList we created ; this renderTodoItem function runs for each item and its item._id ; so this is being done for each item of todo ; and then based on if we are editting it or not ; we show that UI for that specific todo ; while the rest remains unchanged which are not being editted currently ; i.e. that whose isEditting is still "false" will still remain as it is, hence so now thus here below. */}
          {isEditting ? (
            <View style={homeStyles.editContainer}>

              {/* step308: we now will be having a input tag given by "textInput" in react-native for editing the todo, hence so now thus here below. */}
              <TextInput
                style={homeStyles.editInput}

                // step309: the value of it will always be equal to the value of the editText variable here below, hence so now thus here below ; Whatever value editText currently has will appear inside the input field here below.
                value={editText}

                // step310: on changing the text or value of the input tag, we call the below function ; Every time the user types something; it will update the editText variable too using the function here below.
                onChangeText={setEditText}

                // step311: Automatically focuses this input when it appears (so the keyboard pops up instantly) ; and so the user doesn’t need to tap the box again here below.
                autoFocus

                // step312: "multiline"  is Ideal for longer todo text or notesand it lets the user type multiple lines (pressing Enter adds a new line instead of submitting) here below.
                multiline
                placeholder="Edit your task..."
                placeholderTextColor={colors.textMuted}
              />
              {/* step314: now lets have the SAVE and CANCEL buttons now here below. */}
              <View style={homeStyles.editButtons}>

                {/* step315: now lets have the button OR the TouchableOpacity of react native for the Save button here below. */}
                <TouchableOpacity
                  onPress={handleSaveEdit}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.success}
                    style={homeStyles.editButton}
                  >
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* step316: similarly now lets have the button to cancel the editting here below. */}

                {/* step317: see the next steps in settings.tsx file now there. */}
                <TouchableOpacity
                  onPress={handleCancelEdit}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.muted}
                    style={homeStyles.editButton}
                  >
                    <Ionicons name="close" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

          ) 
          :(
          <View style={homeStyles.todoTextContainer}>
            <Text

            // step269: we will apply multiple styles to the text here , so pass them as an array here below ; we will always apply the todoText style ; but apply the other styles only if its completed here below.
              style={[
                homeStyles.todoText,
                item.isCompleted && {

                  // step270: line-through means it will strike it off when completed here below.
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.text}
            </Text>

            {/* step271: now lets add the EDIT and DELETE buttons here below. */}

            {/* step272: here is the EDIT button below. */}
            <View style={homeStyles.todoActions}>

              {/* step313: lets now call the function on pressing the button here below ; and pass only the "item" itself and not item._id : because : it as defined in function takes the whole "todo" of type "Todo" defined earlier there ; and not only the id of that todo, hence so now thus here below. */}
              <TouchableOpacity onPress={() => {handleEditTodo(item)}} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="pencil" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>

              {/* step273: and then this is the DELETE button here below. */}

              {/* step279: lets pass a function to be called with the id of the todo to be deleted on pressing the button , thus here below. */}
              <TouchableOpacity onPress={() => {handleDeleteTodo(item._id)}} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          )}
        </LinearGradient>
      </View>
    )
  }

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

          {/* step232: now lets use map to iterate through all the todos and display it here below. */}

          {/* step233: we using ?. so that it will run the loop only if "todos" is not empty and has some values in it , else it will be meaningless.*/}
          {/* {todos?.map((todo)=>

            // step234: so this will now print the "text" of all the todos there & lets put key as something unique here below ; because by rule : "map" involves using a unique key in each of its iteration, like done here below.

            <Text key={todo._id}>{todo.text}</Text>
          )} */}

          {/* step243: now lets use the FlatList instead of the "map" here below. */}
          <FlatList
            // step 244: we first pass the data to map over here below.
            data={todos}

            // step245: then for every item in it , we call the function written in the "renderItem" here below.
            renderItem={renderTodoItem}

            // step246: like we pass unique key in "map" ; similarly here below too we do so.
            keyExtractor={(item) => item._id}

            // step247: lets add some styles too here below.
            style={homeStyles.todoList}

            // step248: this contentContainerStyle is used to style the inner content area of the FlatList — not the FlatList container itself.
            contentContainerStyle={homeStyles.todoListContent}

            // step274: now if the list of data to traverse on is empty there ; then instead of showing nothing there ; we can show the text like "no todos" there ; for this we can use the "ListEmptyComponent" of FlatList here below.

            // step275: see the next steps in EmptyState.jsx file now there.
            ListEmptyComponent={<EmptyState />}

            // step278: we can now prevent the side scrollbar to be visible on scrolling there by the code here below.
            showsVerticalScrollIndicator={false}
          />

          {/* step235: but a better way to render UI is using FlatList instead of map ; because : if we have 100 of todos in database ; using "map" will render all of them at once making the task heavy and network may slow down ; but using FlatList will render only like 2-3 items that can fit screen at that time & as we scroll to bottom ; it will render the rest of them there ; thus FlatList is a "performant" way of rendering lists. */}

          {/* step92: lets create a button , which is "TouchableOpacity" in React Native thus here below. */}
          {/* <TouchableOpacity onPress={toggleDarkMode}> */}

            {/* Toggle the theme */}

            {/* step93: we can't have the text of button too as such , but must be inside a "Text" component here below. */}

            {/* step94: now on clicking this we will see the color change stating we now are in a different mode : and after going to dark mode if we close the app there and then re-run the app, it will still be in dark mode there as we had used AsyncStorage to save the value of darkMode in local storage there earlier. */}

            {/* step95: now see the next steps in step96.txt file now there. */}
            {/* <Text>Toggle the theme</Text> */}
          {/* </TouchableOpacity> */}

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