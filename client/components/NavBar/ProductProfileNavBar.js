/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, StyleSheet, TouchableOpacity, Image,
} from 'react-native';

// import image
const back = require('../../assets/icons/back.png');

const ProductProfileNavBar = ({ setVisibility }) => {
  const { container, backButton, backButtonTouchable } = styles;
  return (
    <View style={container}>
      <TouchableOpacity style={backButtonTouchable} onPress={() => setVisibility(false)}>
        <Image source={back} style={backButton} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    height: '7%',
    width: '100%',
    opacity: 50,
    backgroundColor: '#124559',
  },
  backButton: {
    height: 28,
    width: 28,
  },
  backButtonTouchable: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
});

export default ProductProfileNavBar;
