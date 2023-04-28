import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const Accueil = () => {

  const [data, setData] = useState(null);

  useEffect(()=>{
    fetch("http://localhost:4003/all").then((result)=> result.json()).then((data)=> setData(data))
  }, [])

  const renderItem = ({item}) => {
  <View>
    <Text>{item.nom}</Text>
    <Image source={{ uri : item.image }} />
    <Text>{item.description}</Text>
    <Text>{item.auteur}</Text>
    <Text>{item.dtCreation}</Text>
    </View>
  }
  return (
    <View>
      <Text>Accueil</Text>

        {!data ? 
        <Text>chargement</Text>
      :
      <FlatList 
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.list}
      />}
        {/** liste des Oeuvres get localhost/all (Flatlist) */}
      {/** liste des Oeuvres d'art existantes dans la base de donnée 
       * cliquer sur une image permet d'être dirigé sur la page Single
      */}
    </View>
  )
}

export default Accueil

const styles = StyleSheet.create({
  list : {
    borderWidth: 2,
    padding : 5
  }
})