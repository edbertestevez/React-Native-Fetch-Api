import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, ListView, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import Moment from 'moment';

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=OHPnoxFnYDKpxqwoGKgrrsIVx5V2dj0RmMO9yzV5')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.rovers), //define parent location separated by .
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) { 
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    let header_pic = {uri:'http://www.spyderonlines.com/images/2017/potrait-wallpaper_00030161.jpg'};
    let header_logo = {uri: 'https://api.nasa.gov/images/logo.png'};
    let rover1 = {uri: 'https://img.purch.com/w/660/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzA0OS82MTEvb3JpZ2luYWwvY3VyaW9zaXR5LXJvdmVyLXNlbGYtcG9ydHJhaXQtYXVnLTUtMjAxNS5qcGc='};
    return (
      <View style={styles.container}>
      <Image style={styles.background_image} source={header_pic}/>
      
      <View style={styles.header}>
        <Image style={styles.head_logo} source={header_logo}/>
        <Text style={styles.head_text}>NASA Rovers</Text>
      </View>

      <View style={styles.list}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={

            (rowData) => (
              //const cameraCount = rowData.getRowCount(); 
              <View style={styles.card}>
                <Image style={styles.list_pic} source={rover1}/>
                <View style={styles.card_content}>
                  <Text style={styles.main_name}>{rowData.name}</Text>
                  <Text style={styles.card_text}>Status: {rowData.status}</Text>
                  <Text style={styles.card_text}>Launch Date: {Moment(rowData.launch_date).format('MMMM d, YYYY')}</Text>
                  <Text style={styles.card_text}>Landing Date: {Moment(rowData.landing_date).format('MMMM d, YYYY')}</Text>
                  <Text style={styles.card_text}>Photos: {rowData.total_photos}</Text>
                  <Text style={styles.card_text}>
                    
                    Camera: {rowData.cameras[0].full_name}

                  </Text>
                </View>
              </View>
            )
          }
          />
          </View>
          </View>
      );
    
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header:{
    flex:1,
    maxHeight: 100,
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'relative',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingTop: 35,
  },
  card:{
    marginTop: 8,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 5
  },
  main_name:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  background_image:{
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  list:{
    flex: 5,
  },
  head_logo:{
    width: 50,
    height: 50
  },
  head_text:{
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 15,
    marginTop: 5,
    
  },
  list_pic:{
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    backgroundColor: 'black'
  },
  card_content:{
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 20
  },
  card_text:{
    fontSize: 15,
    marginBottom: 12
  }
});