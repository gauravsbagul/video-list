import { Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const SelectedColorDetails = (props) => {
  const {
    item: { selectedColorBoxIndex, values, name },
  } = props;
  return (
    <View style={[styles.colorDetailCard]}>
      <Text style={styles.colorTitle}>{name}</Text>

      <Text style={[styles.colorText]}>
        {values[selectedColorBoxIndex].value}
      </Text>
      <View
        style={[
          styles.colorBox,
          {
            backgroundColor: values[selectedColorBoxIndex].color,
          },
        ]}
      />
    </View>
  );
};
export default SelectedColorDetails;

const styles = StyleSheet.create({
  colorDetailCard: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorTitle: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#344356',
    fontSize: 16,
    width: 100,
    fontWeight: '700',
    flexWrap: 'wrap',
  },
  colorBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#aaa',
    justifyContent: 'center',
    height: 28,
    width: 58,
    alignSelf: 'flex-end',
  },
  colorText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.88,
  },
});
