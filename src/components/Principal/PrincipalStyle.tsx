import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E1F5FE',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    // sombra iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // sombra Android
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardText: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },

  numeroText: {
    fontSize: 12,
    color: '#220df5',
    marginTop: 4,
    fontWeight: '500',
  },

  emailText: {
    paddingTop: 5,
    fontSize: 12,
    color: '#f42e17',
    marginTop: 4,
    fontWeight: '500',
  },


  cardLabel: {
    fontSize: 12,
    color: '#943692',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 4,
  },

  diasTitle: {
    paddingTop: 20,
    fontSize: 12,
    color: '#943692',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 4,
  },

  dicaTitle: {
    color: '#FF5722',
  },

  footerCard: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#E0F7FA',
    marginBottom: 12,
  },
  footerButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  footerButtonText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },

    footer: {
    
  },
});
