import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './components/AuthContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
