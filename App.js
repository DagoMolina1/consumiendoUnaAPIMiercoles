import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [idSearch, setIdSearch] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [data, setData] = useState([]);
  
  const getUsers = async () => {
     try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setData(json);
    } catch (error){
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getUsersById = async (id) => {
    try {
     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
     const json = await response.json();
     setData(json);
     //CHECAR SI SE ENCUENTRA EL ID
    if (json.name != null){
      setName(json.name);
      setUsername(json.username);
    }else{
      alert("La identificacion no exixte... Intenta nuevamente");
    }
    } catch (error){
     console.error(error);
    } finally{
     setLoading(false);
   };
 };

  useEffect(() => {
    //getMovies(); //AL CARGAR EL COMPONENTE POR PRIMERA VEZ
    //getUsers();
  }, []);

  return (
    <View style = {{ flex: 1, padding: 24 }}>
      <TouchableOpacity 
        style = {styles.touchableOpacity}
        onPress = {getUsers}>
        <Text style = {{color: 'white', fontSize: 22}}>Listado de usuarios</Text>
      </TouchableOpacity>
      <View>
        <Text>Usuarios</Text>
        <TextInput 
          placeholder = 'Ingrese id a buscar' 
          style = {styles.inputs}
          onChangeText = {idSearch => setIdSearch(idSearch)}
          value = {idSearch}
        />
        <TextInput
          style = {styles.inputs}
          value = {name}
        />
        <TextInput
          style = {styles.inputs}
          value = {username}
        />
      </View>

      <TouchableOpacity 
        style = {styles.touchableOpacity}
        onPress = {() => getUsersById(idSearch)}>
        <Text style = {{color: 'white', fontSize: 22}}>Buscar</Text>
      </TouchableOpacity>

      {isLoading ? <ActivityIndicator size = "large" color = "green"/> : (
        <FlatList
          data = {data}
          //keyExtractor = {({id}, index) => id}
          renderItem = {({item}) => (
            <TouchableOpacity 
              style = {styles.touchableOpacity} 
              onPress = {() =>{
              alert(item.email)
            }}>
              <Text style = {{color:'white'}}>{item.name}, {item.username}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableOpacity: {
    width: 310,
    backgroundColor: 'orange',
    borderRadius: 10,
    alignItems: 'center',
    padding: 5,
    marginTop: 10,
    justifyContent: 'center'
  },
  inputs: {
    borderRadius: 8,
    textAlign: 'center',
    padding: 5,
    borderWidth: 2,
    borderColor: 'green'
  }
});
