import { Link } from "expo-router";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

export default function Index() {
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
