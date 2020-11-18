import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Pie} from 'react-native-progress';

export default ({hasUpdate, progress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.progress}>
        <Pie color="black" indeterminate={!hasUpdate} progress={progress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  progress: {
    position: 'absolute',
    bottom: '20%',
  },
});
