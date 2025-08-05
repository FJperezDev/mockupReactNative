import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './components';
import { AppNavigator } from './navigation';

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
