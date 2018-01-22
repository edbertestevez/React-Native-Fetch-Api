import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

//1st page
/*class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome User',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button
          onPress={() => navigate('Chat', {user:'Aloha'})}
          title="Chat with Aloha"
        />
      </View>
    );
  }
}
*/

//second page
class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) =>({
    //MAKE SURE TO USE `` instead of ''
    title: `Chat with ${navigation.state.params.user}`,
    headerRight: <ImageButton title="Info" />,
  });
  render() {
    //get parameters
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with { params.user }</Text>
      </View>
    );
  }
}


class RecentChatsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>List of recent chats</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Chat', { user: 'Jane' })}
          title="Chat with Jane"/>
      </View>
        );
  }
}

class AllContactsScreen extends React.Component {
  render() {
    return(
      <View>
        <Text>List of all contacts</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy' })}
          title="Chat with Lucy"/>
      </View>
    );
  }
}

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
},{
  //UI
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: 'yellow',
},
});

//define contents
const SimpleApp = StackNavigator({
  Home: { screen: MainScreenNavigator }, //calls tab navigation
  Chat: { screen: ChatScreen },
});


export default class App extends React.Component {
  render() {
    //Header
    return <SimpleApp />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});