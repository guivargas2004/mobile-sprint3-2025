// src/components/Login/Login.tsx
import React, { useEffect, useState } from 'react';
import { Alert, TextInput, TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { styles } from '../Login/LoginStyle';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const ADMIN_EMAIL = 'admin@email.com';
const ADMIN_PASSWORD = 'admin123';
const STORAGE_KEY = '@loggedIn';

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const flag = await AsyncStorage.getItem(STORAGE_KEY);
        if (flag === 'true') {
          navigation.reset({ index: 0, routes: [{ name: 'Principal' }] });
          return;
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha e-mail e senha.');
      return;
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, 'true');
      } catch {
        Alert.alert('Aviso', 'Não foi possível salvar seu login localmente.');
      }
      navigation.reset({ index: 0, routes: [{ name: 'Principal' }] });
    } else {
      Alert.alert('Credenciais inválidas', 'E-mail ou senha incorretos.');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={{ alignItems: 'center', marginBottom: 12 }}>
          <Ionicons name="log-in" size={48} color="#2196F3" />
        </View>

        <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 12 }}>
          Faça login para continuar
        </Text>

        <TextInput
          style={styles.input}
          placeholder="admin@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
