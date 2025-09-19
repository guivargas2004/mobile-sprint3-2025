import React, { useState, useEffect } from 'react';
import {SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { styles } from './FormularioStyle';

type Props = NativeStackScreenProps<RootStackParamList, 'Formulario'>;

const STORAGE_KEY = '@avaliacao_apoio';

export default function Formulario({ navigation }: Props) {
  const [frequency, setFrequency] = useState('');
  const [spend, setSpend] = useState('');
  const [triedStop, setTriedStop] = useState('');
  const [impact, setImpact] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          setFrequency(data.frequency || '');
          setSpend(data.spend || '');
          setTriedStop(data.triedStop || '');
          setImpact(data.impact || '');
        }
      } catch (e) {
        console.warn('Erro ao carregar formulário', e);
      }
    }
    load();
  }, []);

  const handleSubmit = async () => {
    if (!/^[0-9]+$/.test(frequency)) {
      Alert.alert('Erro', 'A primeira resposta deve ser apenas números.');
      return;
    }
    if (!/^[0-9]+$/.test(spend)) {
      Alert.alert('Erro', 'A segunda resposta deve ser apenas números.');
      return;
    }
    if (!/^(Sim|Não)$/i.test(triedStop)) {
      Alert.alert('Erro', 'A terceira resposta deve ser "Sim" ou "Não".');
      return;
    }
    if (impact.length > 100) {
      Alert.alert('Erro', 'A quarta resposta deve ter no máximo 100 caracteres.');
      return;
    }

    const formData = { frequency, spend, triedStop, impact };
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      Alert.alert('Sucesso', 'Suas respostas foram salvas!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar suas respostas.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.screenContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Avaliação de Apoio</Text>

          <View style={styles.field}>
            <Text style={styles.label}>1. Quantas vezes por semana você aposta?</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={frequency}
              onChangeText={setFrequency}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>2. Quanto você gasta de dinheiro apostando por mês?</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={spend}
              onChangeText={setSpend}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>3. Você já tentou parar de apostar antes?</Text>
            <TextInput
              style={styles.input}
              placeholder="Sim ou Não"
              autoCapitalize="none"
              value={triedStop}
              onChangeText={setTriedStop}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>4. Como as apostas afetam sua vida pessoal?</Text>
            <TextInput
              style={styles.input}
              multiline
              maxLength={100}
              value={impact}
              onChangeText={setImpact}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
