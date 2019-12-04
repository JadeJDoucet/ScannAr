/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import CustomerContext from '../../applicationState/customerContext';

const CustomerListItem = ({
  name,
  uri,
  description,
  price,
  setModalProp,
  item,
}) => {
  const {
    productTitle,
    listItemContainer,
    image,
    productDescription,
    productPrice,
    productMenu,
    informationContainer,
    // eslint-disable-next-line no-use-before-define
  } = styles;
  const context = useContext(CustomerContext);
  const { setCurrentSavedList, serverUrl, currentUser } = context;

  // Retrieves all current user's saved products
  const getSavedProducts = () => (
    fetch(`${serverUrl}/savedProducts?idUser=${currentUser.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((savedList) => {
        setCurrentSavedList(savedList);
      })
    // .catch(() => )
  );

  // Deletes the current product from the current user's savedProducts
  const handleDelete = () => {
    fetch(`${serverUrl}/savedProducts?idUser=${currentUser.id}&idProduct=${item.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => getSavedProducts());
    // .catch(() => console.log('something went wrong'));
  };

  return (
    <View
      style={listItemContainer}
    >
      <Image
        source={{ uri }}
        style={image}
      />
      <View style={informationContainer}>
        <View>
          <Text
            style={productTitle}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {name}
          </Text>
        </View>
        <Text style={productDescription}>{description}</Text>
        <Text style={productPrice}>{`$${price}.00`}</Text>
      </View>
      <View style={productMenu}>
        <TouchableOpacity
          onPress={() => setModalProp(item)}
        >
          <Text style={productTitle}>...</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={{ color: 'red', fontSize: 24 }}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productTitle: {
    fontSize: 20,
    color: '#B3C6CD',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productMenu: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
  productDescription: {
    fontSize: 12,
    color: '#B3C6CD',
    marginBottom: 6,
  },
  productPrice: {
    marginTop: 5,
    fontSize: 20,
    color: '#B3C6CD',
  },
  listItemContainer: {
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#B3C6CD',
    borderWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  informationContainer: {
    flex: 1,
    paddingRight: 50,
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default CustomerListItem;
