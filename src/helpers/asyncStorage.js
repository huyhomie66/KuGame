import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.error(e);
  }
  return undefined;
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};

export const setItem = async (key, value) => {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(key, json);
  } catch (e) {
    console.error(e);
  }
};
