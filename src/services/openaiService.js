import axios from 'axios';
import Config from 'react-native-config';

// OpenAI API 키 (환경 변수에서 가져오거나 직접 설정)
const API_KEY = Config.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY';

/**
 * OpenAI API를 사용하여 트레이닝 플랜을 생성하는 함수
 * @param {string} goal - 운동 목표 (다이어트, 근육 증가, 체력 증진 등)
 * @param {string} experience - 운동 경력 (초보, 중급, 고급)
 * @param {number} days - 주당 운동 횟수
 * @returns {Promise<object>} - 생성된 트레이닝 플랜 데이터
 */
export const generateTrainingPlan = async (goal, experience, days) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: '너는 피트니스 전문가야. 사용자에게 맞는 운동/식단/주의사항을 JSON으로 추천해줘. 운동은 부위별로 나눠서 추천해줘.'
          },
          {
            role: 'user',
            content: `운동 목표: ${goal}\n운동 경력: ${experience}\n주당 운동 횟수: ${days}\n\n위 정보를 바탕으로 아래 JSON 형식으로 트레이닝 계획을 추천해줘:\n\n{\n  "운동_루틴": [],\n  "식단_추천": [],\n  "주의사항": ""\n}`
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    const data = response.data;
    const content = data.choices[0].message.content;
    
    try {
      // JSON 파싱
      return JSON.parse(content);
    } catch (parseError) {
      console.error('JSON 파싱 오류:', parseError);
      throw new Error('응답 형식이 올바르지 않습니다.');
    }
  } catch (error) {
    console.error('API 요청 오류:', error);
    throw error;
  }
};
