import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { BottomTabBar , createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Accueil from './composants/Accueil';
import Connexion from './composants/Connexion';

const Menu = createBottomTabNavigator();
export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Menu.Navigator screenOptions={ 
          {tabBarActiveBackgroundColor : "#eee",
          tabBarStyle : { borderColor: "#ccc", borderWidth:2},
          tabBarShowLabel : false
      }}>
          <Menu.Screen name='home' component={Accueil}
          options={{ tabBarIcon : function(){
            return <MaterialCommunityIcons name='home' color="black" size={30}/>
          }}} />
         <Menu.Screen name='Profil' component={Connexion}
         options={{function() {
          return <MaterialCommunityIcons name='mdiFaceManProfile' color="black" size={30}/>
         }}}/>

        </Menu.Navigator>

      </NavigationContainer>
      <StatusBar style="auto" hidden={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
