import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './auth';
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
