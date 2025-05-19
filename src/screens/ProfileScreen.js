import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, TextInput, Button, Avatar, Text, Divider, List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('');
  const [history, setHistory] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadProfile();
    loadHistory();
  }, []);

  const loadProfile = async () => {
    try {
      const profileData = await AsyncStorage.getItem('userProfile');
      if (profileData) {
        const profile = JSON.parse(profileData);
        setName(profile.name || '');
        setAge(profile.age || '');
        setHeight(profile.height || '');
        setWeight(profile.weight || '');
        setGoal(profile.goal || '');
      }
    } catch (error) {
      console.error('프로필 로딩 오류:', error);
    }
  };

  const loadHistory = async () => {
    try {
      const historyData = await AsyncStorage.getItem('workoutHistory');
      if (historyData) {
        setHistory(JSON.parse(historyData));
      }
    } catch (error) {
      console.error('히스토리 로딩 오류:', error);
    }
  };

  const saveProfile = async () => {
    try {
      const profileData = { name, age, height, weight, goal };
      await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
      setEditing(false);
    } catch (error) {
      console.error('프로필 저장 오류:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.avatarContainer}>
            <Avatar.Icon size={80} icon="account" style={styles.avatar} />
            <View style={styles.userInfo}>
              <Title style={styles.userName}>{name || '이름을 입력하세요'}</Title>
              <Text style={styles.userGoal}>{goal || '목표를 설정하세요'}</Text>
            </View>
            <TouchableOpacity onPress={() => setEditing(!editing)} style={styles.editButton}>
              <Avatar.Icon size={40} icon="pencil" style={styles.editIcon} />
            </TouchableOpacity>
          </View>
          
          {editing ? (
            <View style={styles.formContainer}>
              <TextInput
                label="이름"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
                outlineColor="#4CAF50"
                activeOutlineColor="#4CAF50"
              />
              <TextInput
                label="나이"
                value={age}
                onChangeText={setAge}
                mode="outlined"
                style={styles.input}
                keyboardType="numeric"
                outlineColor="#4CAF50"
                activeOutlineColor="#4CAF50"
              />
              <TextInput
                label="키 (cm)"
                value={height}
                onChangeText={setHeight}
                mode="outlined"
                style={styles.input}
                keyboardType="numeric"
                outlineColor="#4CAF50"
                activeOutlineColor="#4CAF50"
              />
              <TextInput
                label="몸무게 (kg)"
                value={weight}
                onChangeText={setWeight}
                mode="outlined"
                style={styles.input}
                keyboardType="numeric"
                outlineColor="#4CAF50"
                activeOutlineColor="#4CAF50"
              />
              <TextInput
                label="목표"
                value={goal}
                onChangeText={setGoal}
                mode="outlined"
                style={styles.input}
                outlineColor="#4CAF50"
                activeOutlineColor="#4CAF50"
              />
              <Button 
                mode="contained" 
                onPress={saveProfile}
                style={styles.saveButton}
              >
                저장하기
              </Button>
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <List.Item
                title="나이"
                description={age || '미설정'}
                left={props => <List.Icon {...props} icon="calendar" color="#4CAF50" />}
              />
              <Divider />
              <List.Item
                title="키"
                description={height ? `${height} cm` : '미설정'}
                left={props => <List.Icon {...props} icon="human-male-height" color="#4CAF50" />}
              />
              <Divider />
              <List.Item
                title="몸무게"
                description={weight ? `${weight} kg` : '미설정'}
                left={props => <List.Icon {...props} icon="weight" color="#4CAF50" />}
              />
            </View>
          )}
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>🏆 최근 트레이닝 기록</Title>
          {history.length > 0 ? (
            history.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyDate}>{item.date}</Text>
                <Text style={styles.historyTitle}>{item.title}</Text>
                <Text style={styles.historyDescription}>{item.description}</Text>
                {index < history.length - 1 && <Divider style={styles.divider} />}
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>아직 트레이닝 기록이 없습니다.</Text>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    marginBottom: 8,
    elevation: 4,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#4CAF50',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 22,
  },
  userGoal: {
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    backgroundColor: '#4CAF50',
  },
  formContainer: {
    marginTop: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: '#4CAF50',
  },
  profileInfo: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
    color: '#333',
  },
  historyItem: {
    marginBottom: 16,
  },
  historyDate: {
    fontSize: 14,
    color: '#888',
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#333',
  },
  historyDescription: {
    fontSize: 14,
    marginTop: 4,
    color: '#666',
  },
  divider: {
    marginTop: 16,
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 16,
    marginBottom: 16,
  },
});

export default ProfileScreen;
