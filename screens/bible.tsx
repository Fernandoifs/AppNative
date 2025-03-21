import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as BibleData from '../mocks/bible.json';
import { useNavigation } from '@react-navigation/native';

export default function Bible({ route }) {
  const navigation = useNavigation();
  const initialParams = route?.params || {};

  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [view, setView] = useState('books');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Culto');
  const books = BibleData?.biblia?.livros || [];

  useEffect(() => {
    if (initialParams.initialBook) {
      setSelectedBook(initialParams.initialBook);
      setSelectedChapter(initialParams.initialChapter);
      setSelectedVerse(initialParams.initialVerse);
      setView('verseContent');
    }
  }, [initialParams]);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setView('chapters');
  };

  const handleChapterSelect = (chapter) => {
    if (!selectedBook) {
      Alert.alert('Erro', 'Por favor, selecione um livro primeiro.');
      return;
    }
    setSelectedChapter(chapter);
    setView('verses');
  };

  const handleVerseSelect = (verse) => {
    if (!selectedBook || !selectedChapter) {
      Alert.alert('Erro', 'Por favor, selecione um livro e um capítulo primeiro.');
      return;
    }
    setSelectedVerse(verse);
    setView('verseContent');
  };

  const handleBack = () => {
    if (view === 'verseContent') {
      setView('verses');
      setSelectedVerse(null);
    } else if (view === 'verses') {
      setView('chapters');
      setSelectedChapter(null);
    } else if (view === 'chapters') {
      setView('books');
      setSelectedBook(null);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!view) return null; // Evita renderização inválida

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="max-w-screen-2xl mx-auto w-full">
        <View className="p-8 bg-blue-500 flex-row items-center">
          {view !== 'books' && (
            <TouchableOpacity onPress={handleBack} className="mr-4">
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          )}
          <View className="flex-1">
            <Text className="text-2xl font-bold text-white text-center mb-2">
              {view === 'books' && 'Bíblia'}
              {view === 'chapters' && selectedBook?.nome}
              {view === 'verses' && `${selectedBook?.nome} - Capítulo ${selectedChapter}`}
              {view === 'verseContent' && `${selectedBook?.nome} ${selectedChapter}:${selectedVerse}`}
            </Text>
            <Text className="text-white text-center opacity-80">Explore as escrituras sagradas</Text>
          </View>
        </View>

        <View className="p-4">
          {view === 'books' && (
            <>
              <View className="mb-4">
                <View className="flex-row items-center bg-white rounded-lg px-3 py-2">
                  <Ionicons name="search-outline" size={20} color="#4F46E5" />
                  <TextInput
                    className="flex-1 ml-2 text-gray-900"
                    placeholder="Pesquisar livro"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                  />
                </View>
              </View>
              <View className="flex-row flex-wrap justify-between">
                {filteredBooks.map((book) => (
                  <TouchableOpacity
                    key={book.id}
                    className="bg-white p-4 rounded-lg shadow-md w-[48%] mb-4"
                    onPress={() => handleBookSelect(book)}
                  >
                    <Text className="font-medium text-gray-900">{book.nome}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {view === 'chapters' && selectedBook && (
            <View className="flex-row flex-wrap justify-between">
              {selectedBook.capitulos?.map((chapter) => (
                <TouchableOpacity
                  key={chapter.numero}
                  className="bg-white p-4 rounded-lg shadow-md w-[23%] mb-4 items-center"
                  onPress={() => handleChapterSelect(chapter.numero)}
                >
                  <Text className="font-medium text-gray-900">{chapter.numero}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {view === 'verses' && selectedBook && selectedChapter && (
            <View className="flex-row flex-wrap justify-between">
              {selectedBook.capitulos
                ?.find((c) => c.numero === selectedChapter)
                ?.versiculos?.map((verse) => (
                  <TouchableOpacity
                    key={verse.numero}
                    className="bg-white p-4 rounded-lg shadow-md w-[23%] mb-4 items-center"
                    onPress={() => handleVerseSelect(verse.numero)}
                  >
                    <Text className="font-medium text-gray-900">{verse.numero}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}

          {view === 'verseContent' && selectedBook && selectedChapter && selectedVerse && (
            <View className="bg-white p-4 rounded-lg shadow-md">
              <Text className="text-gray-600 text-lg mb-2">
                {selectedBook.capitulos
                  ?.find((c) => c.numero === selectedChapter)
                  ?.versiculos?.find((v) => v.numero === selectedVerse)?.texto}
              </Text>
              <Text className="text-gray-900 font-medium">
                {selectedBook.nome} {selectedChapter}:{selectedVerse}
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
