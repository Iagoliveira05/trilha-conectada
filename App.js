import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, View } from "react-native";
import RewardScreen from "./src/screens/RewardScreen";
import ScanScreen from "./src/screens/ScanScreen";
import AboutScreen from "./src/screens/AboutScreen";
import DetailScreen from "./src/screens/DetailScreen";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#264C36",
    primary: "#102513ff",
  },
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ScanStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ScanScreen"
        component={ScanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "#264c36e8" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <NavigationContainer theme={MyTheme}>
          <Tab.Navigator
            initialRouteName="Scan"
            screenOptions={{
              tabBarStyle: {
                flexDirection: "row",
                height: 60,
                backgroundColor: "#ffffffe5",
              },
              tabBarLabelStyle: {
                fontSize: 14, // controla o tamanho do texto
              },
              tabBarIconStyle: {
                marginBottom: 0, // para centralizar melhor o ícone
              },
            }}
          >
            <Tab.Screen
              name="About"
              component={AboutScreen}
              options={{
                headerShown: false,
                title: "About",
                tabBarIcon: ({ color, size }) => (
                  <Image
                    source={require("./src/assets/about.png")}
                    style={{ width: size, height: size, tintColor: color }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Scan"
              component={ScanStack}
              options={{
                headerShown: false,
                title: "Scan",
                tabBarIcon: ({ color, size }) => (
                  <Image
                    source={require("./src/assets/scan.png")}
                    style={{ width: size, height: size, tintColor: color }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Reward"
              component={RewardScreen}
              options={{
                headerShown: false,
                title: "Reward",
                tabBarIcon: ({ color, size }) => (
                  <Image
                    source={require("./src/assets/coins.png")}
                    style={{ width: size, height: size, tintColor: color }}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
}
