import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { Provider } from 'react-redux';
import store from './store';
import StackNavigatior from './StackNavigatior';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StackNavigatior />
        <StatusBar style="auto" />
      </View>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    paddingTop: 40
  },
});
