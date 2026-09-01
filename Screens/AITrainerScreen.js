import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

export default function AITrainerScreen({ navigation }) {
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi! I am your Elite-Fit AI Trainer 🤖💪\nHow can I help you today?',
      sender: 'ai',
    },
  ]);

  const getAIResponse = (userMessage) => {
    const text = userMessage.toLowerCase();

    if (text.includes('workout') || text.includes('exercise')) {
      return 'For a beginner, I recommend starting with a 20–30 minute full-body workout. Focus on proper form and take enough rest between exercises. 💪';
    }

    if (
      text.includes('diet') ||
      text.includes('food') ||
      text.includes('nutrition')
    ) {
      return 'A balanced diet should include protein, healthy carbohydrates, vegetables, fruits and enough water. Your exact plan should match your fitness goal. 🥗';
    }

    if (text.includes('weight') || text.includes('gain')) {
      return 'For healthy weight gain, focus on nutritious calorie-dense foods and strength training rather than relying only on junk food. 💪';
    }

    if (text.includes('lose') || text.includes('fat')) {
      return 'For healthy fat loss, combine regular exercise with a balanced diet and a sustainable calorie deficit. Avoid extreme dieting. 🔥';
    }

    if (
      text.includes('motivate') ||
      text.includes('motivation')
    ) {
      return 'You do not need to be perfect. You just need to stay consistent. Keep going — your future self will thank you! 🔥💚';
    }

    if (text.includes('rest')) {
      return 'Rest is an important part of fitness. Give your muscles enough recovery time and make sure you get quality sleep. 😴';
    }

    return 'Great question! Stay consistent with your workouts, nutrition and recovery. If you tell me your specific fitness goal, I can guide you better. 💚';
  };

  const sendMessage = () => {
    if (message.trim() === '') {
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
    };

    const aiMessage = {
      id: Date.now() + 1,
      text: getAIResponse(message),
      sender: 'ai',
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      aiMessage,
    ]);

    setMessage('');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.aiIcon}>🤖</Text>

          <View>
            <Text style={styles.headerTitle}>
              AI Trainer
            </Text>

            <Text style={styles.onlineText}>
              ● Online
            </Text>
          </View>
        </View>

        <View style={styles.headerSpace} />
      </View>

      {/* Chat */}
      <ScrollView
        style={styles.chat}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((item) => (
          <View
            key={item.id}
            style={[
              styles.messageContainer,
              item.sender === 'user'
                ? styles.userMessageContainer
                : styles.aiMessageContainer,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                item.sender === 'user'
                  ? styles.userBubble
                  : styles.aiBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.sender === 'user'
                    ? styles.userMessageText
                    : styles.aiMessageText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Suggestions */}
      <View style={styles.suggestions}>
        <TouchableOpacity
          style={styles.suggestion}
          onPress={() => setMessage('Give me a workout plan')}
        >
          <Text style={styles.suggestionText}>
            Workout plan
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.suggestion}
          onPress={() => setMessage('Give me nutrition advice')}
        >
          <Text style={styles.suggestionText}>
            Nutrition
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.suggestion}
          onPress={() => setMessage('I need motivation')}
        >
          <Text style={styles.suggestionText}>
            Motivation
          </Text>
        </TouchableOpacity>
      </View>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask your AI Trainer..."
          placeholderTextColor="#777"
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={sendMessage}
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
        >
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Workouts')}
        >
          <Text style={styles.navIcon}>🏋️</Text>
          <Text style={styles.navText}>Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🤖</Text>
          <Text style={styles.activeNavText}>AI Trainer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Nutrition')}
        >
          <Text style={styles.navIcon}>🥗</Text>
          <Text style={styles.navText}>Nutrition</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F0E',
  },

  header: {
    height: 75,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111613',
    borderBottomWidth: 1,
    borderBottomColor: '#26302B',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#171D1A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 35,
  },

  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  aiIcon: {
    fontSize: 28,
    marginRight: 10,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  onlineText: {
    color: '#39FF88',
    fontSize: 11,
    marginTop: 2,
  },

  headerSpace: {
    width: 42,
  },

  chat: {
    flex: 1,
  },

  chatContent: {
    padding: 18,
    paddingBottom: 10,
  },

  messageContainer: {
    width: '100%',
    marginBottom: 12,
  },

  aiMessageContainer: {
    alignItems: 'flex-start',
  },

  userMessageContainer: {
    alignItems: 'flex-end',
  },

  messageBubble: {
    maxWidth: '82%',
    padding: 14,
    borderRadius: 17,
  },

  aiBubble: {
    backgroundColor: '#171D1A',
    borderBottomLeftRadius: 4,
  },

  userBubble: {
    backgroundColor: '#39FF88',
    borderBottomRightRadius: 4,
  },

  messageText: {
    fontSize: 14,
    lineHeight: 21,
  },

  aiMessageText: {
    color: '#D5DBD8',
  },

  userMessageText: {
    color: '#07100B',
  },

  suggestions: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 8,
    gap: 7,
  },

  suggestion: {
    backgroundColor: '#171D1A',
    borderRadius: 18,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },

  suggestionText: {
    color: '#39FF88',
    fontSize: 11,
    fontWeight: '600',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#111613',
  },

  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#171D1A',
    borderRadius: 24,
    paddingHorizontal: 17,
    color: '#FFFFFF',
    fontSize: 14,
  },

  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#39FF88',
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sendIcon: {
    color: '#07100B',
    fontSize: 20,
    fontWeight: 'bold',
  },

  bottomNav: {
    height: 72,
    backgroundColor: '#111613',
    borderTopWidth: 1,
    borderTopColor: '#26302B',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    fontSize: 19,
    marginBottom: 3,
  },

  navText: {
    color: '#777F7B',
    fontSize: 10,
  },

  activeNavText: {
    color: '#39FF88',
    fontSize: 10,
    fontWeight: 'bold',
  },
});