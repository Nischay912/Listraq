import { Stack } from "expo-router";

export default function RootLayout() {

  // step25: we now see the header names in mobile there based on the file names we gave to each screen in the app folder here ; to get rid of this , we can either put <Stack screenOptions = {{  headerShown: false }} ; but it will make the content to overflow with the top status bar of the mobile there ; so we'll see how to fix it later.
  // return <Stack screenOptions= {{headerShown: false}} />;

  // step26: But : for now : lets try to update the title to something else here below ; so we can use the Stack.Screen component to give a title to each screen , based on their name which comes from the file names there , like name="index" fo index.tsx , name="about" for about.tsx and so on....

  // step27: see the next steps in step28.txt file now there.
  return <Stack screenOptions={{  headerShown: false }}>
    
    {/* step29: now we will replace the name="index" with (tabs) so that we can now have the tab navigators be used here below. */}
    <Stack.Screen
      // name = "index"

      // step30: so we have only one stack screen which is the tabs , and in this one screen only we will have navigation tabs to switch screen while remaining in the same stack screen here below ; i.e. now the screens wont change on navigating here below.

      // step31: see the next steps in _layout.tsx of the (tabs) folder now there.
      name = "(tabs)"
      options={{title: "Home"}}
    />
    {/* <Stack.Screen
      name = "about"
      options={{title: "About"}}
    /> */}
  </Stack>
}
