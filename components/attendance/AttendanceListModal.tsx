import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMembersStore } from '../../store/members';
import type { Event, Member } from '../../types';

type AttendanceListModalProps = {
  isVisible: boolean;
  onClose: () => void;
  event: Event;
};

type AttendanceStatus = {
  [key: string]: {
    memberName: string;
    presente: boolean;
    santaCeia: boolean;
    visitante: boolean;
  };
};

export const AttendanceListModal = ({ isVisible, onClose, event }: AttendanceListModalProps) => {
  const { members } = useMembersStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [attendance, setAttendance] = useState<AttendanceStatus>({});
  const [isLocked, setIsLocked] = useState(false);
  const [tempParticipants, setTempParticipants] = useState<Array<{id: string; name: string}>>([]);
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [newParticipantName, setNewParticipantName] = useState('');

  const handleAddParticipant = () => {
    if (newParticipantName.trim()) {
      const newParticipant = {
        id: `temp-${Date.now()}`,
        name: newParticipantName.trim()
      };
      setTempParticipants([...tempParticipants, newParticipant]);
      setNewParticipantName('');
      setShowAddParticipant(false);
    }
  };

  const allParticipants = [...members, ...tempParticipants];
  const filteredParticipants = allParticipants.filter((participant) =>
    participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const getStatusColor = (isChecked: boolean) => {
    return isChecked ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white w-full h-full rounded-none overflow-hidden">
          {/* Header */}
          <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
            <View>
              <Text className="text-xl font-bold text-gray-900">{event.category}</Text>
              <Text className="text-sm text-gray-600">{event.date} • {event.time}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsLocked(!isLocked)}
              className="p-2 rounded-full">
              <Ionicons
                name={isLocked ? 'lock-closed' : 'lock-open'}
                size={24}
                color={isLocked ? '#EF4444' : '#6B7280'}
              />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="p-4 border-b border-gray-200">
            <View className="flex-row items-center justify-between gap-2">
              <View className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
                <Ionicons name="search" size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-2 text-gray-900"
                  placeholder="Buscar membros..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              <TouchableOpacity
                className="bg-indigo-600 p-3 rounded-lg shadow-sm"
                onPress={() => setShowAddParticipant(true)}
              >
                <View className="flex-row items-center justify-center">
                  <Ionicons name="add" size={20} color="white" />
                  <Text className="text-white ml-2">Participante</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add Participant Modal */}
          <Modal visible={showAddParticipant} transparent animationType="fade">
            <View className="flex-1 bg-black/50 justify-center items-center">
              <View className="bg-white p-6 rounded-lg w-4/5">
                <Text className="text-xl font-bold mb-4">Adicionar Participante</Text>
                <TextInput
                  className="border border-gray-300 p-2 rounded-lg mb-4"
                  placeholder="Nome do participante"
                  value={newParticipantName}
                  onChangeText={setNewParticipantName}
                />
                <View className="flex-row justify-end gap-2">
                  <TouchableOpacity
                    onPress={() => {
                      setShowAddParticipant(false);
                      setNewParticipantName('');
                    }}
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                  >
                    <Text className="text-gray-800">Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleAddParticipant}
                    className="px-4 py-2 bg-blue-500 rounded-lg"
                  >
                    <Text className="text-white">Adicionar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Members List */}
          <ScrollView className="flex-1">
            <View className="p-4">
              <View className="flex-row justify-between items-center mb-4 px-4">
          
                <View className="flex-row w-2/3 justify-between">
                  <Text className="text-lg font-medium text-gray-900 text-center w-1/3">Presente</Text>
                  <Text className="text-lg font-medium text-gray-900 text-center w-1/3">Santa Ceia</Text>
                  <Text className="text-lg font-medium text-gray-900 text-center w-1/3">Visitante</Text>
                </View>
              </View>
              {filteredParticipants.map((member) => (
                <View
                  key={member.id}
                  className="mb-4 p-4 bg-gray-50 rounded-lg flex-row justify-between items-center">
                  <Text className="text-lg font-medium text-gray-900 w-1/3">{member.name}</Text>
                  <View className="flex-row w-2/3 justify-between">
                    {([
                      { key: 'presente', label: 'Presente' },
                      { key: 'santaCeia', label: 'Santa Ceia' },
                      { key: 'visitante', label: 'Visitante' }
                    ] as const).map((item) => (
                      <TouchableOpacity
                        key={item.key}
                        onPress={() => {
                          if (!isLocked) {
                            setAttendance(prev => ({
                              ...prev,
                              [member.id]: {
                                ...prev[member.id],
                                memberName: member.name,
                                [item.key]: !prev[member.id]?.[item.key]
                              }
                            }));
                          }
                        }}
                        className="w-1/3 items-center justify-center">
                        <Ionicons
                          name={attendance[member.id]?.[item.key] ? 'checkbox' : 'square-outline'}
                          size={24}
                          color={attendance[member.id]?.[item.key] ? '#1D4ED8' : '#6B7280'}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Footer */}
          <View className="p-4 border-t border-gray-200 flex-row justify-end gap-2">
            <TouchableOpacity
              onPress={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg">
              <Text className="text-gray-800 font-medium">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              disabled={isLocked}
              className={`px-4 py-2 rounded-lg ${isLocked ? 'bg-gray-300' : 'bg-blue-500'}`}>
              <Text className={`font-medium ${isLocked ? 'text-gray-600' : 'text-white'}`}>
                Salvar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};