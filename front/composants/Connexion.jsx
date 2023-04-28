import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const Connexion = () => {

  const [isConnnected, setConnected] = useState(false);
  return (
    <View style={styles.container}>
      <Text>Connexion</Text>

      {/** permet de se connecter uu de creer un compte et d'acceder á son profil */}
      <TextInput placeholder='email' style={styles.input} />
      <TextInput placeholder='password' style={styles.input} />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button title='Connexion' style={styles.bouton} onPress={{/** post localhost login redirection sur profil isConnnected =>true*/ }} />
        <Button title='créer un compte' style={styles.bouton} onPress={{/** redirection sur une page login  */ }} />
      </View>
    </View>
  )
}

export default Connexion

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd"
  },
  btn: {
    maxWidth: 400,
    textAlign: "center"
  },
  input: {
    marginBottom: 5,
    padding: 10,
    borderWidth : 1,
    borderColor : "#b3cce6",
    backgroundColor : "white"
  }
})