import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMembersStore } from '../../store/members';
import { Picker } from '@react-native-picker/picker';

interface AddMemberModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AddMemberModal({ visible, onClose }: AddMemberModalProps) {
  const addMember = useMembersStore((state) => state.addMember);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    phone: '',
    role: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.birthDate.trim()) newErrors.birthDate = 'Data de nascimento é obrigatória';
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.role.trim()) newErrors.role = 'Função é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      addMember(formData);
      setFormData({ name: '', birthDate: '', phone: '', role: '' }); // Resetando o formulário
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/50 justify-center">
        <View className="bg-white rounded-2xl mx-4 p-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">Adicionar Membro</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView className="space-y-4">
            <View>
              <Text className="text-sm text-gray-700 mb-1">Nome *</Text>
              <TextInput
                className={`bg-white border p-3 rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Nome completo"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />
              {errors.name && <Text className="text-red-500 text-xs mt-1">{errors.name}</Text>}
            </View>

            <View>
              <Text className="text-sm text-gray-700 mb-1">Data de Nascimento *</Text>
              <TextInput
                className={`bg-white border p-3 rounded-lg ${errors.birthDate ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="DD/MM/AAAA"
                value={formData.birthDate}
                onChangeText={(text) => setFormData({ ...formData, birthDate: text })}
              />
              {errors.birthDate && <Text className="text-red-500 text-xs mt-1">{errors.birthDate}</Text>}
            </View>

            <View>
              <Text className="text-sm text-gray-700 mb-1">Telefone *</Text>
              <TextInput
                className={`bg-white border p-3 rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="(00) 00000-0000"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
              />
              {errors.phone && <Text className="text-red-500 text-xs mt-1">{errors.phone}</Text>}
            </View>

            <View>
              <Text className="text-sm text-gray-700 mb-1">Função *</Text>
              <View className={`border rounded-lg ${errors.role ? 'border-red-500' : 'border-gray-300'}`}>
                <Picker
                  selectedValue={formData.role}
                  onValueChange={(itemValue) => setFormData({ ...formData, role: itemValue })}
                  style={{ height: 50 }}
                >
                  <Picker.Item label="Selecione uma função" value="" />
                  <Picker.Item label="Pastor" value="pastor" />
                  <Picker.Item label="Líder" value="leader" />
                  <Picker.Item label="Membro" value="member" />
                  <Picker.Item label="Visitante" value="visitor" />
                </Picker>
              </View>
              {errors.role && <Text className="text-red-500 text-xs mt-1">{errors.role}</Text>}
            </View>
          </ScrollView>

          <TouchableOpacity className="bg-indigo-600 p-4 rounded-xl mt-6" onPress={handleSubmit}>
            <Text className="text-white text-center font-semibold text-lg">Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
