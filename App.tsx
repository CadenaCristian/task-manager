import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Navigation from "./src/navigation/Navigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";

export default function App() {
  Icon.loadFont();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}
