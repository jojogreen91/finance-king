export interface Character {
  id: string;
  name: string;
  role: string;
  avatar: string;
  position?: 'left' | 'right';
  description?: string;
}

// 실제 프로젝트에서는 이미지 파일을 public 폴더에 넣고 주소를 사용하세요
// 예: '/images/assistant.png'
// 여기서는 임시로 placeholder 이미지 주소를 사용합니다

export const CHARACTERS: Record<string, Character> = {
  ASSISTANT: {
    id: 'assistant',
    name: '김비서',
    role: '비서',
    avatar: 'assistant_icon', // MUI 아이콘을 사용할 것이므로 실제 이미지 URL 필요 없음
    position: 'left',
    description: '믿음직한 재무 분석 비서'
  },
  PLAYER: {
    id: 'player',
    name: '플레이어',
    role: '회계사',
    avatar: 'https://placehold.co/200x200/2196f3/ffffff?text=회계사',
    position: 'right',
    description: '플레이어 캐릭터'
  },
  INVESTOR: {
    id: 'investor',
    name: '김투자',
    role: '투자자',
    avatar: 'https://placehold.co/200x200/9c27b0/ffffff?text=김투자',
    position: 'left',
    description: '투자자 클라이언트'
  },
  BANK: {
    id: 'bank',
    name: '우리은행',
    role: '채권자',
    avatar: 'https://placehold.co/200x200/f44336/ffffff?text=우리은행',
    position: 'left',
    description: '은행 클라이언트'
  },
  CEO: {
    id: 'ceo',
    name: '박경영',
    role: '경영진',
    avatar: 'https://placehold.co/200x200/ff9800/ffffff?text=박경영',
    position: 'left',
    description: 'CEO 클라이언트'
  }
};

export const getCharacterById = (id: string): Character => {
  return CHARACTERS[id.toUpperCase()] || CHARACTERS.ASSISTANT;
};

export const getCharacterByClientId = (clientId: string): Character => {
  switch(clientId) {
    case 'c1':
      return CHARACTERS.INVESTOR;
    case 'c2':
      return CHARACTERS.INVESTOR;  
    case 'c3':
      return CHARACTERS.BANK;
    case 'c4':
      return CHARACTERS.CEO;
    default:
      return CHARACTERS.ASSISTANT;
  }
};

// 비서 대사 모음
export const ASSISTANT_DIALOGS = {
  // 인트로/튜토리얼 대사
  INTRO: {
    WELCOME: "안녕하세요! 저는 김비서입니다. 재무 분석 전문가가 되실 당신을 도와드리게 되어 기쁩니다.",
    GAME_EXPLANATION: "이 게임에서는 다양한 클라이언트의 재무 분석 의뢰를 수행하며 경험치와 돈을 모을 수 있어요. 레벨이 올라갈수록 더 어려운 의뢰를 받게 됩니다.",
    NAME_REQUEST: "시작하기 전에, 회계사님의 이름을 알 수 있을까요?",
    START_GUIDE: "좋아요! 이제 사무실에서 첫 의뢰를 확인해보세요. 의뢰 버튼을 클릭하면 가능한 의뢰 목록을 볼 수 있습니다."
  },
  
  // 사무실 관련 대사
  OFFICE: {
    WELCOME: "오늘도 좋은 하루예요! 어떤 의뢰를 진행해볼까요?",
    NO_MISSIONS: "아직 가능한 의뢰가 없네요. 첫 의뢰를 성공적으로 완료하면 더 많은 의뢰를 받을 수 있어요!",
    NEW_LEVEL: "축하합니다! 레벨이 올랐어요. 이제 더 다양한 의뢰를 받을 수 있게 되었습니다.",
    AFTER_MISSION: "수고하셨어요! 다음 의뢰도 기대하고 있을게요.",
    UPGRADE: "축하합니다! 사무실이 업그레이드되었어요. 이제 더 높은 레벨의 의뢰를 받을 수 있게 되었어요!"
  },
  
  // 의뢰 관련 대사
  MISSION: {
    INTRO: "이 의뢰에 대해 설명해드릴게요. 의뢰인은 {clientName}님이시고, {missionType} 관련 분석을 요청하셨어요.",
    DIFFICULTY: "난이도는 {difficulty}이며, 성공적으로 완료하면 {money}원의 보수와 {exp} 경험치를 얻을 수 있어요.",
    START: "준비가 되셨으면 '의뢰 시작하기' 버튼을 눌러주세요. 제가 옆에서 도와드릴게요!",
    ACTIVE: "재무제표를 분석하고 질문에 답해주세요. 질문 아래에 있는 '힌트 보기' 버튼을 누르면 유용한 힌트를 볼 수 있어요.",
    SUBMIT: "모든 질문에 답변하셨나요? 준비가 되면 '분석 제출하기' 버튼을 눌러주세요."
  },
  
  // 결과 관련 대사
  RESULT: {
    SUCCESS: "축하합니다! 의뢰를 성공적으로 완료했어요. {money}원의 보수와 {exp} 경험치를 획득했습니다.",
    FAILURE: "아쉽게도 의뢰 달성에 실패했어요. 하지만 걱정하지 마세요. 다음 기회에 더 잘할 수 있을 거예요!",
    LEVEL_UP: "축하합니다! 레벨이 올랐어요. 이제 더 다양한 의뢰를 받을 수 있게 되었습니다.",
    RETURN_OFFICE: "사무실로 돌아가서 다음 의뢰를 확인해보세요."
  }
};