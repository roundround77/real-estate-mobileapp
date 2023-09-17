import { StatusBar } from "expo-status-bar";
import RootStack from "./src/navigations/Stacks/RootStack";
import { Provider } from "react-redux";
import { store,persistor } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import FlashMessage, {
  showMessage,
  hideMessage,
} from "react-native-flash-message";

export default function App() {
  return (
    <Provider store={store}>
        <RootStack />
        <StatusBar style="auto" backgroundColor="white" />
        <FlashMessage onPress={hideMessage} floating position="top" /> 
    </Provider>
  );
}
