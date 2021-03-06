/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const Register = ({
  handleRegister,
  setNameFirst,
  setNameLast,
  setEmail,
  setPassword,
  nameFirst,
  nameLast,
  email,
  password,
  setRegister,
}) => {
  const [addingUser, setAddingUser] = useState(false);

  const register = () => {
    setAddingUser(true);
    handleRegister();
    setTimeout(() => {
      setAddingUser(false);
      setRegister(false);
    }, 1000);
  };

  const {
    inputField,
    inputFields,
    textStyle,
    customerTitle,
    button3,
    button2,
  } = styles;

  return (
    <View style={inputFields}>
      <Text style={textStyle}>
          First Name
      </Text>
      <TextInput
        style={inputField}
        onChangeText={(text) => setNameFirst(text)}
        value={nameFirst}
        autoCompleteType="name"
        placeholder="John"
        placeholderTextColor="rgba(130, 130, 130, 0.7);"
      />
      <Text style={textStyle}>
        Last Name
      </Text>
      <TextInput
        style={inputField}
        onChangeText={(text) => setNameLast(text)}
        value={nameLast}
        autoCompleteType="name"
        placeholder="Doe"
        placeholderTextColor="rgba(130, 130, 130, 0.7);"
      />
      <Text style={textStyle}>
        Email
      </Text>
      <TextInput
        style={inputField}
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCompleteType="email"
        placeholder="email@example.com"
        placeholderTextColor="rgba(130, 130, 130, 0.7);"
      />
      <Text style={textStyle}>
        Password
      </Text>
      <TextInput
        style={inputField}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        placeholder="password123"
        placeholderTextColor="rgba(130, 130, 130, 0.7);"
      />
      <TouchableOpacity
        style={button3}
        onPress={register}
      >
        {addingUser ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={customerTitle}>Submit</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={button2}
        onPress={() => setRegister(false)}
      >
        <Text style={customerTitle}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customerTitle: {
    fontSize: 15,
    color: 'white',
  },
  inputField: {
    height: 40,
    borderColor: '#86A4AF',
    borderWidth: 2,
    width: '100%',
    borderRadius: 5,
    color: 'white',
    backgroundColor: '#082C39',
    marginBottom: 7,
  },
  inputFields: {
    marginTop: 5,
    width: '80%',
  },
  textStyle: {
    padding: 1,
    color: 'white',
  },
  button3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    borderRadius: 5,
    backgroundColor: '#01161D',
    borderColor: '#86A4AF',
    borderWidth: 2,
    marginTop: 10,
  },
  button2: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 40,
    borderRadius: 5,
    backgroundColor: '#01161D',
    borderColor: '#86A4AF',
    borderWidth: 2,
    marginTop: 15,
    width: 150,
  },
});

export default Register;
