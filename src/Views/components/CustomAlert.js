import React from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SelectedColorDetails from './SelectedColorDetails';

const CustomAlert = (props) => {
  const { selectedColors, isVisibleColorModal, onCloseModal } = props;
  return (
    <Modal
      transparent
      visible={isVisibleColorModal}
      onRequestClose={() => onCloseModal()}
      animationType={'none'}>
      <TouchableWithoutFeedback onPress={() => onCloseModal()}>
        <View style={styles.modalAlertWrapper}>
          <View style={styles.colorContent}>
            <FlatList
              data={[...selectedColors]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <SelectedColorDetails item={item} />
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  modalAlertWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(7, 7, 7, 0.55)',
    justifyContent: 'center',
  },
  colorContent: {
    paddingHorizontal: 25,
    marginTop: 10,
    paddingVertical: 30,
    width: '85%',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    marginHorizontal: 20,
  },
});
