import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, List, Divider, Text } from 'react-native-paper';

const DietScreen = ({ route }) => {
  const { diet } = route.params;

  // 식단 유형별 아이콘 매핑
  const getIconForMeal = (meal) => {
    const lowerMeal = meal.toLowerCase();
    if (lowerMeal.includes('아침') || lowerMeal.includes('breakfast')) return 'food-croissant';
    if (lowerMeal.includes('점심') || lowerMeal.includes('lunch')) return 'food';
    if (lowerMeal.includes('저녁') || lowerMeal.includes('dinner')) return 'food-steak';
    if (lowerMeal.includes('간식') || lowerMeal.includes('snack')) return 'food-apple';
    if (lowerMeal.includes('단백질') || lowerMeal.includes('protein')) return 'food-drumstick';
    if (lowerMeal.includes('탄수화물') || lowerMeal.includes('carb')) return 'bread-slice';
    if (lowerMeal.includes('채소') || lowerMeal.includes('veggie')) return 'food-apple-outline';
    return 'silverware-fork-knife';
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>🍎 맞춤형 식단 추천</Title>
          <Paragraph style={styles.subtitle}>목표 달성을 위한 영양 계획입니다</Paragraph>
          
          {diet && diet.length > 0 ? (
            diet.map((mealPlan, index) => (
              <View key={index} style={styles.mealContainer}>
                <List.Item
                  title={mealPlan.시간 || mealPlan.종류 || `식단 ${index + 1}`}
                  left={props => (
                    <List.Icon 
                      {...props} 
                      icon={getIconForMeal(mealPlan.시간 || mealPlan.종류 || '')}
                      color="#4CAF50" 
                    />
                  )}
                  titleStyle={styles.mealTitle}
                />
                
                {mealPlan.음식들 && mealPlan.음식들.map((food, foodIndex) => (
                  <View key={foodIndex} style={styles.foodItem}>
                    <Text style={styles.foodName}>{food.이름 || food}</Text>
                    {food.양 && <Text style={styles.foodDetail}>양: {food.양}</Text>}
                    {food.칼로리 && <Text style={styles.foodDetail}>칼로리: {food.칼로리}</Text>}
                    {food.설명 && <Text style={styles.foodDescription}>{food.설명}</Text>}
                  </View>
                ))}
                
                {/* 음식들이 문자열 배열인 경우에 대한 처리 */}
                {!mealPlan.음식들 && mealPlan.설명 && (
                  <View style={styles.foodItem}>
                    <Text style={styles.foodDescription}>{mealPlan.설명}</Text>
                  </View>
                )}
                
                {index < diet.length - 1 && <Divider style={styles.divider} />}
              </View>
            ))
          ) : (
            <Paragraph style={styles.noDataText}>식단 추천 정보가 없습니다.</Paragraph>
          )}
          
          <View style={styles.tipsContainer}>
            <Title style={styles.tipsTitle}>💡 식단 팁</Title>
            <Text style={styles.tipText}>• 충분한 물을 마시는 것을 잊지 마세요 (하루 2-3L)</Text>
            <Text style={styles.tipText}>• 식사는 천천히 하고 포만감을 느끼도록 하세요</Text>
            <Text style={styles.tipText}>• 가공식품보다는 자연식품을 선택하세요</Text>
            <Text style={styles.tipText}>• 식사 시간을 규칙적으로 유지하세요</Text>
          </View>
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
    elevation: 4,
  },
  title: {
    fontSize: 24,
    marginBottom: 4,
    color: '#333',
  },
  subtitle: {
    marginBottom: 16,
    color: '#666',
  },
  mealContainer: {
    marginBottom: 16,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  foodItem: {
    marginLeft: 48,
    marginBottom: 12,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  foodDetail: {
    marginTop: 2,
    fontSize: 14,
    color: '#666',
  },
  foodDescription: {
    marginTop: 4,
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
  },
  divider: {
    marginVertical: 16,
    backgroundColor: '#ddd',
  },
  noDataText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  tipsContainer: {
    marginTop: 24,
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 8,
  },
  tipsTitle: {
    fontSize: 18,
    marginBottom: 12,
    color: '#388E3C',
  },
  tipText: {
    fontSize: 14,
    color: '#1B5E20',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default DietScreen;
