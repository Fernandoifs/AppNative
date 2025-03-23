import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-paper';

interface AddParticipantModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
  participantName: string;
  onParticipantNameChange: (name: string) => void;
}

const AddParticipantModal: React.FC<AddParticipantModalProps> = ({
  isVisible,
  onClose,
  onAdd,
  participantName,
  onParticipantNameChange,
}) => {
  const handleAdd = () => {
    if (participantName.trim()) {
      onAdd(participantName);
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View className="bg-white p-5 rounded-xl">
        <Text className="text-xl font-bold mb-4">Adicionar Participante</Text>
        <TextInput
          className="border border-gray-300 p-3 rounded-lg mb-4"
          placeholder="Nome do participante"
          value={participantName}
          onChangeText={onParticipantNameChange}
        />
        <View className="flex-row justify-end space-x-2">
          <Button 
            onPress={onClose} 
            mode="text"
            className="mr-2"
          >
            Cancelar
          </Button>
          <Button 
            onPress={handleAdd} 
            mode="contained"
            className="bg-blue-500"
          >
            Adicionar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default AddParticipantModal;