import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import RewardScreen from "./src/screens/RewardScreen";
import ScanScreen from "./src/screens/ScanScreen";
import AboutScreen from "./src/screens/AboutScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Scan">
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
            component={ScanScreen}
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
  );
}
