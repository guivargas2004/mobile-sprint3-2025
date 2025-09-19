import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Principal/PrincipalStyle';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Principal'>;

type TabParamList = {
  Home: undefined;
  Perfil: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

function HomeScreen() {
  const nav = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Apoio & Esperança</Text>
        <Text style={styles.subtitle}>
          Você não está sozinho na sua jornada de recuperação. Aqui você
          encontra apoio, compreensão e ferramentas para superar o vício em
          apostas.
        </Text>

        <View style={styles.row}>
          <View style={styles.card}>
            <Ionicons name="heart-circle" size={24} color="#2196F3" />
            <Text style={styles.cardTitle}>Autoconhecimento</Text>
            <Text style={styles.cardText}>
              Desenvolva consciência sobre hábitos, gatilhos e padrões.
            </Text>
          </View>

          <View style={styles.card}>
            <Ionicons name="wallet" size={24} color="#2196F3" />
            <Text style={styles.cardTitle}>Controle Financeiro</Text>
            <Text style={styles.cardText}>
              Ferramentas e dicas para organizar suas finanças e evitar recaídas.
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.card}>
            <Ionicons name="chatbubbles" size={24} color="#2196F3" />
            <Text style={styles.cardTitle}>Rede de Apoio</Text>
            <Text style={styles.cardText}>
              Encontre suporte com pessoas e recursos confiáveis.
            </Text>
          </View>

          <View style={styles.card}>
            <Ionicons name="school" size={24} color="#2196F3" />
            <Text style={styles.cardTitle}>Educação</Text>
            <Text style={styles.cardText}>
              Conteúdos para entender o vício e estratégias de recuperação.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Responda o nosso questionário para entendermos melhor sua situação e
            receber orientações personalizadas.
          </Text>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => nav.navigate('Formulario')}
          >
            <Text style={styles.footerButtonText}>Iniciar Avaliação</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PerfilScreen() {
  const nav = useNavigation<any>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@loggedIn');
    } catch {}
    nav.getParent()?.reset({
      index: 0,
      routes: [{ name: 'Login' as never }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.container, { gap: 16 }]}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.subtitle}>
          Aqui você poderá gerenciar sua conta e preferências.
        </Text>

        <TouchableOpacity style={styles.footerButton} onPress={handleLogout}>
          <Text style={styles.footerButtonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function Principal({}: Props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          const color = focused ? '#2196F3' : '#777';
          if (route.name === 'Home') {
            return <Ionicons name="home" size={size} color={color} />;
          }
          return <Ionicons name="person-circle" size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#777',
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
