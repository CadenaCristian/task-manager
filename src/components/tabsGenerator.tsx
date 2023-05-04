import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Animated, View } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabsGenerator({ tabs, color }: { tabs: Array<any>, color: string }) {
  const TabIcon = ({ focused, children }: any) => {
    const [size, setSize] = React.useState(new Animated.Value(1));
    let translate = new Animated.Value(0);

    const changeSizeIcon = (sizeIcon: number, position: number) => {
      Animated.timing(size, {
        toValue: sizeIcon,
        duration: 1000,
        useNativeDriver: false,
      }).start();
      Animated.timing(translate, {
        toValue: position,
        duration: 500,
        useNativeDriver: false,
      }).start();
    };

    // focused ? changeSizeIcon(2, -5) : changeSizeIcon(1, 10);

    return (
      <View
        style={{
          width: 25,
          height: 25,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          backgroundColor: color,
          borderRadius: 50,
        }}
      >
        {children}
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 50,
          position: "absolute",
          paddingTop: 10,
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
          backgroundColor: color
        },
      }}
    >
      {tabs?.map((pos: any, index: number) => {
        return (
          <Tab.Screen
            key={index}
            name={pos?.name}
            component={pos?.component}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused}>
                  <Icon
                    name={pos?.iconName}
                    color={focused ? pos?.color : "black"}
                    size={pos?.size}
                  />
                </TabIcon>
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
