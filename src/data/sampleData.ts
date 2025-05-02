import { Client, ClientType, Mission, MissionDifficulty, MissionType } from './gameModels';

// 샘플 클라이언트 데이터
export const sampleClients: Client[] = [
  {
    id: "c1",
    name: "김투자",
    type: ClientType.INVESTOR,
    description: "안정적인 장기 투자를 선호하는 개인 투자자",
    unlockLevel: 1
  },
  {
    id: "c2",
    name: "한국투자증권",
    type: ClientType.INVESTOR,
    description: "적극적인 투자 전략을 가진 투자 회사",
    unlockLevel: 3
  },
  {
    id: "c3",
    name: "우리은행",
    type: ClientType.CREDITOR,
    description: "기업 대출 심사를 위해 재무건전성을 중시하는 은행",
    unlockLevel: 2
  },
  {
    id: "c4",
    name: "박경영",
    type: ClientType.MANAGEMENT,
    description: "회사의 재무 상태를 파악하고 경영 전략을 수립하려는 CEO",
    unlockLevel: 4
  },
  {
    id: "c5",
    name: "국세청",
    type: ClientType.GOVERNMENT,
    description: "기업의 세무 상태를 확인하고 세금 징수를 담당하는 정부 기관",
    unlockLevel: 5
  },
  {
    id: "c6",
    name: "경쟁사 A",
    type: ClientType.COMPETITOR,
    description: "경쟁사의 재무 상태를 파악하여 전략을 수립하려는 기업",
    unlockLevel: 6
  }
];

// 샘플 미션 데이터
export const sampleMissions: Mission[] = [
  // 레벨 1 미션 - 첫 번째 (매우 쉬움)
  {
    id: "m0",
    title: "입문 의뢰: 기본 재무제표 이해",
    description: "김투자님의 첫 번째 의뢰입니다. 간단한 재무제표를 보고 기본적인 질문에 답해보세요.",
    clientId: "c1",
    type: MissionType.PROFITABILITY,
    difficulty: MissionDifficulty.BEGINNER,
    requiredLevel: 1,
    reward: {
      money: 300000,
      experience: 30
    },
    companyIds: ["company1"],
    questions: [
      {
        id: "q0-1",
        text: "이 기업의 총 자산은 얼마인가요? (단위: 억원)",
        type: "SINGLE_CHOICE",
        options: ["500억원", "795억원", "1,000억원", "1,500억원"],
        correctAnswer: "795억원",
        points: 10,
        explanation: "재무상태표에서 총 자산은 795억원입니다. 총 자산은 유동자산과 비유동자산의 합계입니다."
      },
      {
        id: "q0-2",
        text: "이 기업의 매출액은 투자하기에 적합한 규모라고 생각하시나요?",
        type: "SINGLE_CHOICE",
        options: ["예, 투자하기 적합합니다", "아니오, 투자하기 부적합합니다", "추가 정보가 필요합니다"],
        correctAnswer: "예, 투자하기 적합합니다",
        points: 20,
        explanation: "이 기업은 500억원의 매출액을 기록하고 있으며, 매출 규모가 안정적이고 성장세를 보이고 있어 투자에 적합합니다."
      }
    ],
    hints: ["재무상태표에서 자산 총계를 확인하세요", "매출액은 손익계산서 맨 위에 있습니다"]
  },

  // 레벨 1 미션 - 두 번째 (매우 쉬움)
  {
    id: "m0-2",
    title: "현금 흐름 확인하기",
    description: "김투자님이 기업의 현금 흐름을 간단히 파악하고 싶어합니다. 기본적인 현금 흐름 정보를 확인해주세요.",
    clientId: "c1",
    type: MissionType.CASH_FLOW,
    difficulty: MissionDifficulty.BEGINNER,
    requiredLevel: 1,
    reward: {
      money: 320000,
      experience: 25
    },
    companyIds: ["company1"],
    questions: [
      {
        id: "q0-2-1",
        text: "이 기업의 현금 및 현금성 자산은 얼마인가요? (단위: 억원)",
        type: "SINGLE_CHOICE",
        options: ["80억원", "120억원", "150억원", "200억원"],
        correctAnswer: "120억원",
        points: 15,
        explanation: "재무상태표에서 현금 및 현금성 자산은 120억원입니다."
      },
      {
        id: "q0-2-2",
        text: "이 기업의 현금 흐름은 어떤 상태인가요?",
        type: "SINGLE_CHOICE",
        options: ["현금 증가", "현금 감소", "현금 변동 없음"],
        correctAnswer: "현금 감소",
        points: 15,
        explanation: "현금흐름표를 보면 당기 순현금흐름이 -25억원으로 감소하고 있습니다."
      }
    ],
    hints: ["재무상태표의 유동자산 중 현금 항목을 확인하세요", "현금흐름표의 '현금의 순증감' 항목을 확인하세요"]
  },
  
  // 레벨 2 미션 - 첫 번째 (쉬움)
  {
    id: "m1-2",
    title: "영업 실적 분석",
    description: "우리은행에서 기업의 영업 실적을 분석해 달라고 요청했습니다. 기본적인 손익계산서 분석을 해보세요.",
    clientId: "c3",
    type: MissionType.PROFITABILITY,
    difficulty: MissionDifficulty.EASY,
    requiredLevel: 2,
    reward: {
      money: 450000,
      experience: 40
    },
    companyIds: ["company2"],
    questions: [
      {
        id: "q1-2-1",
        text: "이 기업의 매출액은 얼마인가요? (단위: 억원)",
        type: "SINGLE_CHOICE",
        options: ["500억원", "600억원", "700억원", "800억원"],
        correctAnswer: "600억원",
        points: 10,
        explanation: "손익계산서에서 매출액은 600억원입니다."
      },
      {
        id: "q1-2-2",
        text: "이 기업의 영업이익은 얼마인가요? (단위: 억원)",
        type: "SINGLE_CHOICE",
        options: ["50억원", "60억원", "75억원", "90억원"],
        correctAnswer: "75억원",
        points: 15,
        explanation: "손익계산서에서 영업이익은 75억원입니다."
      },
      {
        id: "q1-2-3",
        text: "이 기업의 영업이익률은 어느 정도인가요?",
        type: "NUMERIC",
        correctAnswer: 12.5, // 75억원 ÷ 600억원 × 100 = 12.5%
        points: 15,
        explanation: "영업이익률은 영업이익 ÷ 매출액 × 100으로 계산합니다. 이 기업의 경우 75억원 ÷ 600억원 × 100 = 12.5%입니다."
      }
    ],
    hints: ["손익계산서에서 매출액과 영업이익을 확인하세요", "영업이익률 = 영업이익 ÷ 매출액 × 100"]
  },

  // 수정된 레벨 3 미션 (이전 레벨 1 미션)
  {
    id: "m1",
    title: "수익성 분석: 투자 적합성 판단",
    description: "김투자님이 투자를 고려 중인 기업의 수익성을 분석해주세요. 기업의 수익성 지표를 확인하고 투자 가치가 있는지 판단해주세요.",
    clientId: "c1",
    type: MissionType.PROFITABILITY,
    difficulty: MissionDifficulty.MEDIUM,
    requiredLevel: 3,
    reward: {
      money: 700000,
      experience: 70
    },
    companyIds: ["company1"],
    questions: [
      {
        id: "q1-1",
        text: "이 기업의 매출총이익률(Gross Profit Margin)은 얼마인가요?",
        type: "NUMERIC",
        correctAnswer: 40, // 40%
        points: 10,
        explanation: "매출총이익률은 (매출총이익 / 매출액) × 100으로 계산합니다. 이 기업의 경우 매출총이익은 2억원이고 매출액은 5억원이므로, 매출총이익률은 (2억원 / 5억원) × 100 = 40%입니다. 재무상태표를 보면 매출액은 5억원, 매출원가는 3억원으로 매출총이익(매출액-매출원가)은 2억원입니다. 매출총이익률은 기업이 제품이나 서비스를 판매하고 직접적인 생산 비용을 제외한 후 얼마나 많은 이익을 남기는지 보여주는 지표입니다."
      },
      {
        id: "q1-2",
        text: "이 기업의 영업이익률(Operating Profit Margin)은 얼마인가요?",
        type: "NUMERIC",
        correctAnswer: 14, // 14%
        points: 10,
        explanation: "영업이익률은 (영업이익 / 매출액) × 100으로 계산합니다. 이 기업의 경우 영업이익은 7,000만원이고 매출액은 5억원이므로, 영업이익률은 (7,000만원 / 5억원) × 100 = 14%입니다. 손익계산서를 보면, 매출총이익 2억원에서 영업비용(연구개발비 5,000만원, 판매관리비 7,000만원, 기타영업비용 1,000만원의 합계 1억 3,000만원)을 차감하면 영업이익은 7,000만원입니다. 영업이익률은 기업의 핵심 사업 활동의 효율성을 나타내는 중요한 지표입니다."
      },
      {
        id: "q1-3",
        text: "이 기업의 당기순이익률(Net Profit Margin)은 얼마인가요?",
        type: "NUMERIC",
        correctAnswer: 8, // 8%
        points: 10,
        explanation: "당기순이익률은 (당기순이익 / 매출액) × 100으로 계산합니다. 이 기업의 경우 당기순이익은 4,000만원이고 매출액은 5억원이므로, 당기순이익률은 (4,000만원 / 5억원) × 100 = 8%입니다. 이는 매출액 대비 순이익의 비율을 나타내는 중요한 수익성 지표로, 기업이 모든 비용과 세금을 제외한 후 얼마나 많은 이익을 남기는지 보여줍니다."
      },
      {
        id: "q1-4",
        text: "이 기업의 수익성은 투자하기에 적합한가요?",
        type: "SINGLE_CHOICE",
        options: ["예, 투자하기 적합합니다", "아니오, 투자하기 부적합합니다", "추가 정보가 필요합니다"],
        correctAnswer: "예, 투자하기 적합합니다",
        points: 20,
        explanation: "이 기업의 수익성 지표들은 산업 평균 이상으로, 안정적인 수익을 내고 있어 투자에 적합합니다. 매출총이익률 40%, 영업이익률 14%, 순이익률 8%는 IT 서비스 업종에서 양호한 수준입니다. 특히 매출총이익률이 높아 가격 경쟁력과 원가 관리가 우수하며, 영업이익률도 업계 평균(약 10%)보다 높습니다. 또한 ROA 5%와 ROE 9.88%도 안정적인 투자 수익을 기대할 수 있는 수준입니다. 이러한 종합적인 수익성 지표를 고려할 때 장기적으로 안정적인 투자처로 평가됩니다."
      }
    ],
    hints: ["매출총이익률 = (매출총이익 / 매출액) × 100", "영업이익률 = (영업이익 / 매출액) × 100", "당기순이익률 = (당기순이익 / 매출액) × 100", "산업 평균 수익성 지표와 비교하세요"]
  },
  // 레벨 2 미션 - 두 번째 (쉬운 난이도)
  {
    id: "m2",
    title: "안정성 분석: 부채 상환 능력",
    description: "우리은행에서 기업 대출 심사를 위해 해당 기업의 재무 안정성과 부채 상환 능력을 분석해달라고 요청했습니다.",
    clientId: "c3",
    type: MissionType.STABILITY,
    difficulty: MissionDifficulty.EASY,
    requiredLevel: 2,
    reward: {
      money: 500000,
      experience: 45
    },
    companyIds: ["company2"],
    questions: [
      {
        id: "q2-1",
        text: "이 기업의 부채비율(Debt-to-Equity Ratio)은 얼마인가요?",
        type: "NUMERIC",
        correctAnswer: 172, // 171.88% → 반올림하여 172%
        points: 10,
        explanation: "부채비율은 (총부채 / 자기자본) × 100으로 계산합니다. 이 기업의 경우 총부채는 5억 5,000만원(유동부채 1억 9,000만원 + 비유동부채 3억 6,000만원)이고, 자기자본은 3억 2,000만원(자본금 1억 5,000만원 + 이익잠여금 1억 5,000만원 - 자기주식 3,000만원 + 기타자본 5,000만원)입니다. 부채비율은 (5억 5,000만원 / 3억 2,000만원) × 100 = 171.88%로 계산되며, 반올림하면 172%입니다. 이 수치는 기업이 자기자본 대비 타인자본에 의존하는 정도를 나타내며, 사전적으로 100% 미만을 안정적인 값으로 본다면 172%는 다소 높은 수치입니다."
      },
      {
        id: "q2-2",
        text: "이 기업의 유동비율(Current Ratio)은 얼마인가요?",
        type: "NUMERIC",
        correctAnswer: 1.79, // 1.79배
        points: 10,
        explanation: "유동비율은 유동자산 / 유동부채로 계산합니다. 이 기업의 경우 유동자산은 3억 4,000만원(현금 8,000만원 + 단기투자자산 2,000만원 + 매출채권 9,000만원 + 재고자산 1억 2,000만원 + 기타유동자산 3,000만원)이고, 유동부채는 1억 9,000만원(매입채무 7,000만원 + 단기차입금 8,000만원 + 기타유동부채 4,000만원)입니다. 유동비율은 3억 4,000만원 / 1억 9,000만원 = 1.79배입니다. 유동비율은 기업의 단기 채무 지급능력을 평가하는 지표로, 일반적으로 1.5배 이상이면 양호한 수준으로 평가됩니다. 따라서 1.79배는 양호한 유동성을 나타냅니다."
      },
      {
        id: "q2-3",
        text: "이 기업의 이자보상배율(Interest Coverage Ratio)은 얼마인가요?",
        type: "NUMERIC",
        correctAnswer: 3.75, // 3.75배
        points: 15,
        explanation: "이자보상배율은 영업이익 / 이자비용으로 계산합니다. 이 기업의 경우 영업이익은 7억 5,000만원이고, 이자비용은 2억원(영업외손익으로 표시)입니다. 이자보상배율은 7억 5,000만원 / 2억원 = 3.75배입니다. 이자보상배율은 기업이 발생한 이자비용을 영업이익으로 충당할 수 있는 능력을 나타냅니다. 일반적으로 3배 이상이면 양호한 수준으로 평가됩니다. 따라서 3.75배는 이자 지급 능력이 안정적임을 의미합니다."
      },
      {
        id: "q2-4",
        text: "이 기업에 대출을 승인하는 것이 적절한가요?",
        type: "SINGLE_CHOICE",
        options: ["예, 대출 승인 적합", "조건부 대출 승인", "아니오, 대출 승인 부적합"],
        correctAnswer: "조건부 대출 승인",
        points: 25,
        explanation: "이 기업은 적정한 유동비율과 이자보상배율을 보이지만, 부채비율이 다소 높습니다. 따라서 추가 담보나 조건을 설정한 조건부 대출이 적합합니다."
      }
    ],
    hints: ["부채비율 = (총부채 / 자기자본) × 100", "유동비율 = 유동자산 / 유동부채", "이자보상배율 = 영업이익 / 이자비용", "일반적으로 유동비율 1.5 이상, 이자보상배율 3 이상이 양호합니다"]
  },
  // 레벨 3 미션 - 두 번째 (중간 난이도)
  {
    id: "m3-2",
    title: "유동성 비율 분석",
    description: "박경영 CEO가 회사의 유동성 문제에 대해 상담하고 싶어합니다. 회사의 유동성 비율을 분석하고 조언해주세요.",
    clientId: "c4",
    type: MissionType.STABILITY,
    difficulty: MissionDifficulty.MEDIUM,
    requiredLevel: 3,
    reward: {
      money: 650000,
      experience: 55
    },
    companyIds: ["company6"],
    questions: [
      {
        id: "q3-2-1",
        text: "이 기업의 유동비율(Current Ratio)은 얼마인가요?",
        type: "NUMERIC",
        correctAnswer: 2.33, // (유동자산 1억 7500만 / 유동부채 7500만) = 약 2.33
        points: 15,
        explanation: "유동비율은 유동자산 / 유동부채로 계산합니다. 이 기업의 경우 약 2.33입니다."
      },
      {
        id: "q3-2-2",
        text: "이 기업의 당좌비율(Quick Ratio)은 얼마인가요?",
        type: "NUMERIC",
        correctAnswer: 2.2, // (유동자산 1억 7500만 - 재고자산 1000만) / 유동부채 7500만 = 약 2.2
        points: 20,
        explanation: "당좌비율은 (유동자산 - 재고자산) / 유동부채로 계산합니다. 이 기업의 경우 유동자산은 1억 7,500만원(현금 5,000만원 + 단기투자자산 3,000만원 + 매출채권 7,000만원 + 재고자산 1,000만원 + 기타유동자산 1,500만원)이고, 재고자산은 1,000만원, 유동부채는 7,500만원(매입채무 3,000만원 + 단기차입금 2,500만원 + 기타유동부채 2,000만원)입니다. 당좌비율은 (1억 7,500만원 - 1,000만원) / 7,500만원 = 1억 6,500만원 / 7,500만원 = 2.2배입니다. 당좌비율은 재고자산을 제외한 즉시 현금화 가능한 자산으로 유동부채를 얼마나 충당할 수 있는지 답해주는 지표로, 일반적으로 1.0 이상이면 양호한 수준으로 평가됩니다. 2.2배는 매우 양호한 수준입니다."
      },
      {
        id: "q3-2-3",
        text: "이 기업의 유동성 상태에 대한 평가는 어떻습니까?",
        type: "SINGLE_CHOICE",
        options: ["매우 우수", "양호", "보통", "취약"],
        correctAnswer: "양호",
        points: 15,
        explanation: "일반적으로 유동비율 2.0 이상, 당좌비율 1.0 이상이면 유동성이 양호한 것으로 평가됩니다. 이 기업은 두 비율 모두 기준을 충족하므로 유동성이 양호합니다."
      }
    ],
    hints: ["유동비율 = 유동자산 / 유동부채", "당좌비율 = (유동자산 - 재고자산) / 유동부채", "일반적으로 유동비율 2.0 이상, 당좌비율 1.0 이상이 양호합니다"]
  },
  
  // 레벨 4 미션 - 첫 번째 (중간 난이도)
  {
    id: "m3",
    title: "성장성 분석: 투자 포트폴리오 구성",
    description: "한국투자증권에서 투자 포트폴리오에 포함할 성장성 있는 기업들을 찾고 있습니다. 여러 기업의 성장성을 분석하고 추천해주세요.",
    clientId: "c2",
    type: MissionType.GROWTH,
    difficulty: MissionDifficulty.MEDIUM,
    requiredLevel: 4,
    reward: {
      money: 800000,
      experience: 70
    },
    companyIds: ["company3", "company4", "company5"],
    questions: [
      {
        id: "q3-1",
        text: "3개 기업 중 매출액 성장률이 가장 높은 기업은 어디인가요?",
        type: "SINGLE_CHOICE",
        options: ["A기업", "B기업", "C기업"],
        correctAnswer: "B기업",
        points: 15,
        explanation: "B기업의 매출액 성장률은 25%로, A기업(15%)과 C기업(18%)보다 높습니다."
      },
      {
        id: "q3-2",
        text: "3개 기업 중 영업이익 성장률이 가장 높은 기업은 어디인가요?",
        type: "SINGLE_CHOICE",
        options: ["A기업", "B기업", "C기업"],
        correctAnswer: "A기업",
        points: 15,
        explanation: "A기업의 영업이익 성장률은 10%입니다. A기업(company3)의 경우 2022년 영업이익은 5억원, 2023년 영업이익은 5억 5,000만원으로, 성장률은 (5억 5,000만원 - 5억원) / 5억원 × 100 = 10%입니다. 다른 기업들을 비교해보면, B기업은 영업이익 성장률이 8%, C기업은 5%로, A기업이 세 기업 중 가장 높은 성장률을 보이고 있습니다. 이는 A기업이 영업 활동에서 상대적으로 더 강한 성장세를 보여주고 있음을 의미합니다."
      },
      {
        id: "q3-3",
        text: "다음 중 PER(주가수익비율)이 가장 적정한 기업은 어디인가요?",
        type: "SINGLE_CHOICE",
        options: ["A기업 (PER 35)", "B기업 (PER 22)", "C기업 (PER 18)"],
        correctAnswer: "C기업 (PER 18)",
        points: 20,
        explanation: "C기업의 PER은 18로, 성장성과 현재 주가를 고려할 때 가장 적정한 수준입니다."
      },
      {
        id: "q3-4",
        text: "투자 포트폴리오에 포함시킬 기업을 선택하세요 (복수 선택 가능)",
        type: "MULTI_CHOICE",
        options: ["A기업", "B기업", "C기업"],
        correctAnswer: ["B기업", "C기업"],
        points: 30,
        explanation: "B기업은 매출 성장률이 높고, C기업은 적정한 PER을 가지고 있어 두 기업 모두 투자 포트폴리오에 적합합니다. A기업은 영업이익 성장률은 높지만 PER이 과도하게 높습니다."
      }
    ],
    hints: ["매출액 성장률 = (당해 매출액 - 전년 매출액) / 전년 매출액 × 100", "영업이익 성장률 = (당해 영업이익 - 전년 영업이익) / 전년 영업이익 × 100", "PER(주가수익비율) = 주가 / 주당순이익", "PER 값이 너무 높은 것은 주가가 고평가되었을 가능성이 있습니다"]
  },
  // 레벨 4 미션 - 두 번째 (중간 난이도)
  {
    id: "m4-2",
    title: "활동성 비율 분석",
    description: "박경영 CEO가 회사의 자산 활용 효율성에 대해 알고 싶어합니다. 회사의 활동성 비율을 분석해주세요.",
    clientId: "c4",
    type: MissionType.ACTIVITY,
    difficulty: MissionDifficulty.MEDIUM,
    requiredLevel: 4,
    reward: {
      money: 850000,
      experience: 80
    },
    companyIds: ["company2"],
    questions: [
      {
        id: "q4-2-1",
        text: "이 기업의 총자산회전율은 얼마인가요?",
        type: "NUMERIC",
        correctAnswer: 0.8, // 매출액 6억원 / 총자산 7.5억원 = 0.8
        points: 20,
        explanation: "총자산회전율은 매출액 / 총자산으로 계산합니다. 이 기업의 경우 약 0.8입니다."
      },
      {
        id: "q4-2-2",
        text: "이 기업의 재고자산회전율은 얼마인가요?",
        type: "NUMERIC",
        correctAnswer: 3.5, // 매출원가 4.2억원 / 재고자산 1.2억원 = 3.5
        points: 20,
        explanation: "재고자산회전율은 매출원가 / 재고자산으로 계산합니다. 이 기업의 경우 약 3.5입니다."
      },
      {
        id: "q4-2-3",
        text: "이 기업의 자산 활용 효율성에 대한 평가는 어떻습니까?",
        type: "SINGLE_CHOICE",
        options: ["매우 효율적", "효율적", "보통", "비효율적"],
        correctAnswer: "보통",
        points: 20,
        explanation: "이 기업의 총자산회전율과 재고자산회전율은 업계 평균 수준으로, 자산 활용 효율성은 보통 수준입니다."
      }
    ],
    hints: ["총자산회전율 = 매출액 / 총자산", "재고자산회전율 = 매출원가 / 재고자산", "일반적으로 총자산회전율은 업종별로 다르지만, 제조업의 경우 1.0 이상이 양호합니다"]
  },
  
  // 레벨 6 미션 (어려운 난이도)
  {
    id: "m4",
    title: "경영 전략 수립: 재무 구조 개선",
    description: "박경영 CEO는 회사의 재무 구조를 개선하고 효율적인 경영 전략을 수립하고자 합니다. 현재 재무 상태를 분석하고 개선 방안을 제시해주세요.",
    clientId: "c4",
    type: MissionType.BUSINESS_STRATEGY,
    difficulty: MissionDifficulty.HARD,
    requiredLevel: 6,
    reward: {
      money: 1200000,
      experience: 110
    },
    companyIds: ["company6"],
    questions: [
      {
        id: "q4-1",
        text: "이 기업의 자산수익률(ROA)은 얼마인가요? (%)",
        type: "NUMERIC",
        correctAnswer: 5,
        points: 15,
        explanation: "ROA = 당기순이익 / 총자산 × 100 = 5%입니다."
      },
      {
        id: "q4-2",
        text: "이 기업의 자기자본수익률(ROE)은 얼마인가요? (%)",
        type: "NUMERIC",
        correctAnswer: 12,
        points: 15,
        explanation: "ROE = 당기순이익 / 자기자본 × 100 = 12%입니다."
      },
      {
        id: "q4-3",
        text: "이 기업의 재고자산회전율은 얼마인가요? (회)",
        type: "NUMERIC",
        correctAnswer: 6,
        points: 15,
        explanation: "재고자산회전율 = 매출액 / 평균 재고자산 = 6회입니다."
      },
      {
        id: "q4-4",
        text: "이 기업의 재무 구조에서 가장 개선이 필요한 부분은 무엇인가요?",
        type: "SINGLE_CHOICE",
        options: ["과도한 부채 비율", "낮은 자산 회전율", "운전자본 관리 비효율", "매출총이익률 하락"],
        correctAnswer: "운전자본 관리 비효율",
        points: 25,
        explanation: "이 기업은 재고자산회전율과 매출채권회전율이 업계 평균보다 낮아 운전자본 관리가 비효율적입니다. 이로 인해 현금 흐름이 악화되고 있습니다."
      },
      {
        id: "q4-5",
        text: "이 기업의 재무 구조 개선을 위한 전략으로 적절한 것을 모두 선택하세요.",
        type: "MULTI_CHOICE",
        options: [
          "재고 관리 시스템 개선을 통한 재고자산 감축",
          "매출채권 회수 기간 단축",
          "추가 차입을 통한 설비 투자 확대",
          "불필요한 비용 절감을 통한 영업이익률 개선"
        ],
        correctAnswer: [
          "재고 관리 시스템 개선을 통한 재고자산 감축",
          "매출채권 회수 기간 단축",
          "불필요한 비용 절감을 통한 영업이익률 개선"
        ],
        points: 35,
        explanation: "재고관리 시스템 개선, 매출채권 회수 기간 단축, 비용 절감은 현 상황에서 적절한 전략입니다. 반면 현재 운전자본 관리가 비효율적인 상황에서 추가 차입을 통한 설비 투자는 재무 부담을 가중시킬 수 있습니다."
      }
    ],
    hints: [
      "ROA(자산수익률) = 당기순이익 / 총자산 × 100",
      "ROE(자기자본수익률) = 당기순이익 / 자기자본 × 100",
      "재고자산회전율 = 매출액 / 평균 재고자산",
      "매출채권회전율 = 매출액 / 평균 매출채권",
      "운전자본 = 유동자산 - 유동부채",
      "재무 구조 개선을 위해서는 수익성, 활동성, 안정성을 모두 고려해야 합니다"
    ]
  },
  // 레벨 8 미션 (전문가 난이도)
  {
    id: "m5",
    title: "기업 인수 타당성 분석",
    description: "경쟁사 A는 시장 점유율 확대를 위해 특정 기업의 인수를 고려하고 있습니다. 해당 기업의 재무 상태와 인수 타당성을 종합적으로 분석해주세요.",
    clientId: "c6",
    type: MissionType.COMPANY_COMPARISON,
    difficulty: MissionDifficulty.EXPERT,
    requiredLevel: 8,
    reward: {
      money: 1800000,
      experience: 150
    },
    companyIds: ["company7", "company8"],
    questions: [
      {
        id: "q5-1",
        text: "인수 대상 기업의 EBITDA 마진은 얼마인가요? (%)",
        type: "NUMERIC",
        correctAnswer: 18, // 18%
        points: 15,
        explanation: "EBITDA 마진 = EBITDA / 매출액 × 100 = 18%입니다."
      },
      {
        id: "q5-2",
        text: "인수 대상 기업의 기업가치(EV)는 얼마인가요? (단위: 억원)",
        type: "NUMERIC",
        correctAnswer: 1200, // 1200억원
        points: 20,
        explanation: "기업가치(EV) = 시가총액 + 순차입금 = 1000억원 + 200억원 = 1200억원입니다."
      },
      {
        id: "q5-3",
        text: "EV/EBITDA 배수에 근거한 적정 인수가는 얼마인가요? (단위: 억원)",
        type: "NUMERIC",
        correctAnswer: 1080, // 1080억원
        points: 25,
        explanation: "업계 평균 EV/EBITDA 배수는 9배이며, 인수 대상 기업의 EBITDA는 120억원입니다. 따라서 적정 인수가 = 120억원 × 9배 = 1080억원입니다."
      },
      {
        id: "q5-4",
        text: "이 인수가 경쟁사 A에게 전략적으로 가치가 있는 이유는 무엇인가요?",
        type: "MULTI_CHOICE",
        options: [
          "시장 점유율 확대",
          "제품 라인업 다양화",
          "생산 시설 확보",
          "R&D 역량 강화",
          "비용 시너지 창출"
        ],
        correctAnswer: ["시장 점유율 확대", "제품 라인업 다양화", "비용 시너지 창출"],
        points: 25,
        explanation: "인수 대상 기업은 보완적인 제품 라인업을 가지고 있어 제품 다양화가 가능하고, 중복 비용 제거를 통한 비용 시너지 창출이 가능하며, 결합된 시장 점유율이 30%로 증가하여 시장 지배력이 강화됩니다. 반면 생산 시설은 노후화되어 있고 R&D 역량은 평균 수준입니다."
      },
      {
        id: "q5-5",
        text: "종합적으로 판단할 때, 제안된 인수가(1150억원)에 대한 의견은?",
        type: "SINGLE_CHOICE",
        options: [
          "적극 추천 - 제안가가 적정 인수가보다 유리함",
          "조건부 추천 - 제안가는 다소 높으나 전략적 가치가 있음",
          "재협상 권장 - 제안가가 적정 인수가를 크게 상회함",
          "인수 반대 - 재무적, 전략적 가치가 모두 낮음"
        ],
        correctAnswer: "조건부 추천 - 제안가는 다소 높으나 전략적 가치가 있음",
        points: 35,
        explanation: "제안가 1150억원은 적정 인수가 1080억원보다 약 6.5% 높지만, 시장 점유율 확대, 제품 라인업 다양화, 비용 시너지 등의 전략적 가치를 고려할 때 조건부로 추천할 수 있습니다. 다만 인수 후 통합 계획을 명확히 하고 시너지 효과를 극대화하는 전략을 수립해야 합니다."
      }
    ],
    hints: [
      "EBITDA = 영업이익 + 감가상각비 + 무형자산상각비",
      "EBITDA 마진 = EBITDA / 매출액 × 100",
      "기업가치(EV) = 시가총액 + 순차입금(총차입금 - 현금성자산)",
      "EV/EBITDA 배수는 기업가치 평가의 중요한 지표입니다",
      "인수 타당성은 재무적 가치와 전략적 가치를 모두 고려해야 합니다",
      "시너지 효과를 계량화하여 인수가 결정에 반영하세요"
    ]
  },
  
  // 레벨 5 미션 (어려운 난이도)
  {
    id: "m6",
    title: "투자 의사결정: 신규 설비 투자 분석",
    description: "박경영 CEO는 생산성 향상을 위한 신규 설비 투자를 고려 중입니다. 투자 타당성을 분석해주세요.",
    clientId: "c4",
    type: MissionType.INVESTMENT_DECISION,
    difficulty: MissionDifficulty.HARD,
    requiredLevel: 5,
    reward: {
      money: 950000,
      experience: 90
    },
    companyIds: ["company6"],
    questions: [
      {
        id: "q6-1",
        text: "신규 설비의 순현재가치(NPV)는 얼마인가요? (단위: 억원)",
        type: "NUMERIC",
        correctAnswer: 48.6,
        points: 25,
        explanation: "순현재가치는 초기 투자비용과 미래 현금흐름의 현재가치를 계산한 결과 48.6억원입니다."
      },
      {
        id: "q6-2",
        text: "투자안의 내부수익률(IRR)은 얼마인가요? (%)",
        type: "NUMERIC",
        correctAnswer: 18,
        points: 25,
        explanation: "내부수익률은 투자 대비 연간 수익률로 계산하여 18%입니다."
      },
      {
        id: "q6-3",
        text: "투자 회수 기간은 몇 년인가요?",
        type: "NUMERIC",
        correctAnswer: 4.2,
        points: 20,
        explanation: "투자 회수 기간은 약 4.2년입니다."
      },
      {
        id: "q6-4",
        text: "이 투자안을 추진해야 하나요?",
        type: "SINGLE_CHOICE",
        options: [
          "추진 권고 - 경제적으로 타당함",
          "조건부 추진 - 일부 조건이 충족되면 타당함",
          "투자 보류 - 현 시점에서는 타당하지 않음"
        ],
        correctAnswer: "추진 권고 - 경제적으로 타당함",
        points: 30,
        explanation: "NPV가 양수(48.6억원)이고 IRR(18%)이 회사의 자본비용(12%)보다 높으며, 투자 회수 기간도 5년 이내로 경제적으로 타당합니다."
      }
    ],
    hints: [
      "NPV = 초기 투자비용 + 미래 현금흐름의 현재가치 합계",
      "IRR은 NPV를 0으로 만드는 할인율",
      "투자 회수 기간 = 초기 투자비용 ÷ 연간 현금흐름",
      "일반적으로 NPV > 0, IRR > 자본비용이면 투자 타당성이 있음"
    ]
  },
  
  // 레벨 6 미션 (어려운 난이도)
  {
    id: "m7",
    title: "운전자본 관리 전략",
    description: "한국투자증권의 의뢰로 기업의 운전자본 관리 전략을 분석하고 개선 방안을 제시해주세요.",
    clientId: "c2",
    type: MissionType.CASH_FLOW,
    difficulty: MissionDifficulty.HARD,
    requiredLevel: 6,
    reward: {
      money: 1100000,
      experience: 100
    },
    companyIds: ["company3"],
    questions: [
      {
        id: "q7-1",
        text: "현재 이 기업의 현금 전환 주기(CCC)는 몇 일인가요?",
        type: "NUMERIC",
        correctAnswer: 85,
        points: 20,
        explanation: "현금 전환 주기 = 재고 보유 일수 + 매출채권 회수 일수 - 매입채무 지급 일수 = 45일 + 60일 - 20일 = 85일입니다."
      },
      {
        id: "q7-2",
        text: "이 기업의 운전자본 대비 매출 비율은 얼마인가요?",
        type: "NUMERIC",
        correctAnswer: 4.2,
        points: 20,
        explanation: "운전자본 대비 매출 비율 = 연간 매출액 ÷ 평균 운전자본 = 4.2배입니다."
      },
      {
        id: "q7-3",
        text: "매출이 연간 10% 증가할 경우, 추가로 필요한 운전자본은 얼마인가요? (단위: 억원)",
        type: "NUMERIC",
        correctAnswer: 12,
        points: 25,
        explanation: "매출 증가에 필요한 추가 운전자본 = 매출 증가액 ÷ 운전자본 회전율 = 50억원 ÷ 4.2 = 약 12억원입니다."
      },
      {
        id: "q7-4",
        text: "이 기업의 운전자본 관리를 개선하기 위한 가장 효과적인 방법은 무엇인가요?",
        type: "SINGLE_CHOICE",
        options: [
          "재고 회전율 개선",
          "매출채권 회수 기간 단축",
          "매입채무 지급 기간 연장",
          "현금 보유량 증가"
        ],
        correctAnswer: "매출채권 회수 기간 단축",
        points: 35,
        explanation: "이 기업의 매출채권 회수 기간(60일)이 업계 평균(45일)보다 길어, 이를 단축하는 것이 가장 효과적인 운전자본 관리 개선 방법입니다."
      }
    ],
    hints: [
      "현금 전환 주기(CCC) = 재고 보유 일수 + 매출채권 회수 일수 - 매입채무 지급 일수",
      "재고 보유 일수 = (평균 재고 × 365) ÷ 매출원가",
      "매출채권 회수 일수 = (평균 매출채권 × 365) ÷ 매출액",
      "매입채무 지급 일수 = (평균 매입채무 × 365) ÷ 매출원가",
      "운전자본 = 유동자산 - 유동부채"
    ]
  },
  
  // 레벨 7 미션 (어려운 난이도)
  {
    id: "m8",
    title: "세무 감사 대비 재무 분석",
    description: "국세청에서 정기 세무 감사를 앞두고 있습니다. 회사의 재무상태를 검토하고 세무 이슈를 파악해주세요.",
    clientId: "c5",
    type: MissionType.BUSINESS_STRATEGY,
    difficulty: MissionDifficulty.HARD,
    requiredLevel: 7,
    reward: {
      money: 1350000,
      experience: 125
    },
    companyIds: ["company4"],
    questions: [
      {
        id: "q8-1",
        text: "이 기업의 유효세율은 얼마인가요? (%)",
        type: "NUMERIC",
        correctAnswer: 17.5,
        points: 20,
        explanation: "유효세율 = 법인세비용 ÷ 세전이익 × 100 = 17.5%입니다."
      },
      {
        id: "q8-2",
        text: "법정 세율(22%)과 비교했을 때 유효세율 차이의 주된 원인은 무엇인가요?",
        type: "SINGLE_CHOICE",
        options: [
          "연구개발비 세액공제",
          "이월결손금 공제",
          "감가상각 방법의 차이",
          "비공제 비용의 증가"
        ],
        correctAnswer: "연구개발비 세액공제",
        points: 25,
        explanation: "연구개발비 세액공제로 인해 유효세율이 법정 세율보다 4.5%p 낮아졌습니다."
      },
      {
        id: "q8-3",
        text: "세무 감사에서 중점적으로 검토할 가능성이 높은 항목은 무엇인가요?",
        type: "MULTI_CHOICE",
        options: [
          "접대비 지출 증빙",
          "특수관계자 거래 내역",
          "재고자산 평가 방법",
          "대손충당금 설정 기준"
        ],
        correctAnswer: ["접대비 지출 증빙", "특수관계자 거래 내역"],
        points: 25,
        explanation: "이 기업은 접대비가 전년 대비 30% 증가했고, 특수관계자 거래 비중이 높아 세무 감사에서 중점적으로 검토될 가능성이 높습니다."
      },
      {
        id: "q8-4",
        text: "세무 감사 대비를 위해 가장 우선적으로 수행해야 할 조치는 무엇인가요?",
        type: "SINGLE_CHOICE",
        options: [
          "과거 세무 조정 내역 검토",
          "이전가격 정책 문서화",
          "감사 전 자체 세무 진단 실시",
          "과거 3년간 주요 거래 증빙 정리"
        ],
        correctAnswer: "감사 전 자체 세무 진단 실시",
        points: 30,
        explanation: "세무 감사 대비를 위해 가장 우선적으로 수행해야 할 조치는 감사 전 자체 세무 진단을 실시하여 잠재적인 세무 이슈를 사전에 파악하고 대비하는 것입니다."
      }
    ],
    hints: [
      "유효세율 = 법인세비용 ÷ 세전이익 × 100",
      "법인세비용 = 당기법인세 + 이연법인세",
      "세액공제와 세액감면은 세금을 직접 감소시키는 항목입니다",
      "특수관계자 거래는 세무당국의 주요 검토 대상입니다",
      "접대비는 손금산입 한도가 정해져 있는 항목입니다"
    ]
  },
  
  // 레벨 3 미션 (중간 난이도)
  {
    id: "m9",
    title: "배당정책 분석",
    description: "김투자님이 투자 대상 기업의 배당정책을 분석해달라고 요청했습니다. 해당 기업의 배당 관련 지표를 검토해주세요.",
    clientId: "c1",
    type: MissionType.INVESTMENT_DECISION,
    difficulty: MissionDifficulty.MEDIUM,
    requiredLevel: 3,
    reward: {
      money: 550000,
      experience: 50
    },
    companyIds: ["company5"],
    questions: [
      {
        id: "q9-1",
        text: "이 기업의 배당수익률은 얼마인가요? (%)",
        type: "NUMERIC",
        correctAnswer: 3.2,
        points: 20,
        explanation: "배당수익률 = 주당 배당금 ÷ 주가 × 100 = 3.2%입니다."
      },
      {
        id: "q9-2",
        text: "이 기업의 배당성향은 얼마인가요? (%)",
        type: "NUMERIC",
        correctAnswer: 45,
        points: 20,
        explanation: "배당성향 = 배당금 총액 ÷ 당기순이익 × 100 = 45%입니다."
      },
      {
        id: "q9-3",
        text: "이 기업의 배당 정책은 어떤 유형에 가까운가요?",
        type: "SINGLE_CHOICE",
        options: [
          "안정적 배당 정책",
          "잔여 배당 정책",
          "고정 배당성향 정책",
          "저배당 성장형 정책"
        ],
        correctAnswer: "안정적 배당 정책",
        points: 30,
        explanation: "이 기업은 지난 5년간 배당금을 안정적으로 유지하거나 소폭 증가시키는 안정적 배당 정책을 채택하고 있습니다."
      },
      {
        id: "q9-4",
        text: "이 기업의 배당 정책은 장기 투자자에게 적합한가요?",
        type: "SINGLE_CHOICE",
        options: [
          "매우 적합함",
          "적합함",
          "보통",
          "적합하지 않음"
        ],
        correctAnswer: "적합함",
        points: 30,
        explanation: "안정적인 배당 정책과 적절한 배당수익률(3.2%)을 고려할 때, 이 기업의 배당 정책은 안정적인 수입을 원하는 장기 투자자에게 적합합니다."
      }
    ],
    hints: [
      "배당수익률 = 주당 배당금 ÷ 주가 × 100",
      "배당성향 = 배당금 총액 ÷ 당기순이익 × 100",
      "안정적 배당 정책은 매년 배당금을 일정하게 유지하거나 소폭 증가시키는 정책입니다",
      "잔여 배당 정책은 투자 후 남은 이익을 배당하는 정책입니다",
      "고정 배당성향 정책은 당기순이익의 일정 비율을 배당하는 정책입니다"
    ]
  },
  
  // 레벨 2 미션 (쉬운 난이도)
  {
    id: "m10",
    title: "현금흐름표 분석",
    description: "우리은행에서 기업의 현금흐름을 분석해달라고 요청했습니다. 현금흐름표를 검토하고 기업의 자금 상황을 평가해주세요.",
    clientId: "c3",
    type: MissionType.CASH_FLOW,
    difficulty: MissionDifficulty.EASY,
    requiredLevel: 2,
    reward: {
      money: 480000,
      experience: 40
    },
    companyIds: ["company2"],
    questions: [
      {
        id: "q10-1",
        text: "이 기업의 영업활동 현금흐름은 얼마인가요? (단위: 억원)",
        type: "NUMERIC",
        correctAnswer: 85,
        points: 20,
        explanation: "현금흐름표에서 영업활동 현금흐름은 85억원입니다."
      },
      {
        id: "q10-2",
        text: "이 기업의 투자활동 현금흐름은 얼마인가요? (단위: 억원)",
        type: "NUMERIC",
        correctAnswer: -60,
        points: 20,
        explanation: "현금흐름표에서 투자활동 현금흐름은 -60억원입니다."
      },
      {
        id: "q10-3",
        text: "이 기업의 재무활동 현금흐름은 얼마인가요? (단위: 억원)",
        type: "NUMERIC",
        correctAnswer: -15,
        points: 20,
        explanation: "현금흐름표에서 재무활동 현금흐름은 -15억원입니다."
      },
      {
        id: "q10-4",
        text: "이 기업의 현금흐름 상태를 어떻게 평가할 수 있나요?",
        type: "SINGLE_CHOICE",
        options: [
          "매우 건전함",
          "양호함",
          "보통",
          "우려됨"
        ],
        correctAnswer: "양호함",
        points: 40,
        explanation: "영업활동에서 양(+)의 현금흐름을 창출하고 있으며, 투자활동 지출도 영업현금흐름 내에서 충당할 수 있습니다. 또한 재무활동에서는 차입금 상환이나 배당금 지급으로 소폭의 현금 유출이 있습니다. 전체적으로 현금흐름 상태는 양호한 편입니다."
      }
    ],
    hints: [
      "영업활동 현금흐름은 기업의 주요 영업활동에서 창출되는 현금흐름입니다",
      "투자활동 현금흐름은 자산의 취득과 처분과 관련된 현금흐름입니다",
      "재무활동 현금흐름은 자본과 부채의 변동과 관련된 현금흐름입니다",
      "현금흐름 분석 시 각 활동별 현금흐름의 부호와 크기를 함께 고려하세요"
    ]
  },
  
  // 레벨 7 미션 (어려운 난이도)
  {
    id: "m11",
    title: "기업 가치 평가",
    description: "한국투자증권에서 투자 대상 기업의 가치를 평가해달라고 요청했습니다. 다양한 가치평가 방법을 적용하여 기업 가치를 산출해주세요.",
    clientId: "c2",
    type: MissionType.INVESTMENT_DECISION,
    difficulty: MissionDifficulty.HARD,
    requiredLevel: 7,
    reward: {
      money: 1400000,
      experience: 130
    },
    companyIds: ["company5"],
    questions: [
      {
        id: "q11-1",
        text: "DCF 방식으로 산출한 이 기업의 주당 가치는 얼마인가요? (단위: 원)",
        type: "NUMERIC",
        correctAnswer: 42500,
        points: 25,
        explanation: "DCF 방식으로 미래 현금흐름의 현재가치를 계산하여 산출한 주당 가치는 42,500원입니다."
      },
      {
        id: "q11-2",
        text: "상대가치평가법(PER)으로 산출한 이 기업의 주당 가치는 얼마인가요? (단위: 원)",
        type: "NUMERIC",
        correctAnswer: 39000,
        points: 25,
        explanation: "PER 방식으로 산출한 주당 가치는 39,000원입니다. (주당순이익 3,000원 × 업종 평균 PER 13 = 39,000원)"
      },
      {
        id: "q11-3",
        text: "이 기업의 적정 주가 범위는 얼마로 판단되나요? (단위: 원)",
        type: "SINGLE_CHOICE",
        options: [
          "35,000원 ~ 38,000원",
          "38,000원 ~ 42,000원",
          "42,000원 ~ 45,000원",
          "45,000원 ~ 50,000원"
        ],
        correctAnswer: "38,000원 ~ 42,000원",
        points: 25,
        explanation: "DCF 방식과 상대가치평가법을 종합적으로 고려할 때, 이 기업의 적정 주가 범위는 38,000원 ~ 42,000원으로 판단됩니다."
      },
      {
        id: "q11-4",
        text: "현재 주가(36,000원) 대비 투자 의견은 무엇인가요?",
        type: "SINGLE_CHOICE",
        options: [
          "강력 매수",
          "매수",
          "보유",
          "매도"
        ],
        correctAnswer: "매수",
        points: 25,
        explanation: "현재 주가(36,000원)가 적정 주가 범위(38,000원 ~ 42,000원)보다 낮아 '매수' 의견이 적절합니다. 주가 상승 여력이 있지만 강력 매수를 권고할 정도로 저평가되었다고 보기는 어렵습니다."
      }
    ],
    hints: [
      "DCF(할인현금흐름) 방식은 미래 현금흐름의 현재가치를 계산합니다",
      "PER(주가수익비율) 방식은 주당순이익 × 적정 PER로 계산합니다",
      "기업가치 평가 시 여러 방법론을 함께 고려하는 것이 중요합니다",
      "가치평가 결과와 현재 주가를 비교하여 투자 의견을 도출하세요"
    ]
  },
  
  // 레벨 1 미션 (입문 난이도)
  {
    id: "m12",
    title: "기본 재무비율 계산",
    description: "김투자님이 초보 투자자를 위한 기본적인 재무비율 연습을 요청했습니다. 간단한 재무비율을 계산해보세요.",
    clientId: "c1",
    type: MissionType.PROFITABILITY,
    difficulty: MissionDifficulty.BEGINNER,
    requiredLevel: 1,
    reward: {
      money: 280000,
      experience: 25
    },
    companyIds: ["company1"],
    questions: [
      {
        id: "q12-1",
        text: "이 기업의 유동비율은 얼마인가요?",
        type: "NUMERIC",
        correctAnswer: 1.8,
        points: 15,
        explanation: "유동비율 = 유동자산 / 유동부채 = 180억원 / 100억원 = 1.8배입니다."
      },
      {
        id: "q12-2",
        text: "이 기업의 매출총이익률은 얼마인가요? (%)",
        type: "NUMERIC",
        correctAnswer: 30,
        points: 15,
        explanation: "매출총이익률 = 매출총이익 / 매출액 × 100 = 150억원 / 500억원 × 100 = 30%입니다."
      },
      {
        id: "q12-3",
        text: "이 기업의 부채비율은 얼마인가요? (%)",
        type: "NUMERIC",
        correctAnswer: 120,
        points: 20,
        explanation: "부채비율 = 총부채 / 자기자본 × 100 = 360억원 / 300억원 × 100 = 120%입니다."
      }
    ],
    hints: [
      "유동비율 = 유동자산 / 유동부채",
      "매출총이익률 = 매출총이익 / 매출액 × 100",
      "부채비율 = 총부채 / 자기자본 × 100"
    ]
  },
  
  // 레벨 3 미션 (중간 난이도)
  {
    id: "m13",
    title: "제조원가 분석",
    description: "박경영 CEO가 제조원가 구조를 개선하고 싶어합니다. 현재의 제조원가를 분석하고 개선 방안을 제안해주세요.",
    clientId: "c4",
    type: MissionType.PROFITABILITY,
    difficulty: MissionDifficulty.MEDIUM,
    requiredLevel: 3,
    reward: {
      money: 600000,
      experience: 55
    },
    companyIds: ["company6"],
    questions: [
      {
        id: "q13-1",
        text: "이 기업의 변동비 비율은 몇 %인가요?",
        type: "NUMERIC",
        correctAnswer: 65,
        points: 20,
        explanation: "변동비 비율 = 변동비 / 총 제조원가 × 100 = 65%입니다."
      },
      {
        id: "q13-2",
        text: "매출액 대비 고정비 비율은 몇 %인가요?",
        type: "NUMERIC",
        correctAnswer: 28,
        points: 20,
        explanation: "매출액 대비 고정비 비율 = 고정비 / 매출액 × 100 = 28%입니다."
      },
      {
        id: "q13-3",
        text: "손익분기점 매출액은 얼마인가요? (억원)",
        type: "NUMERIC",
        correctAnswer: 240,
        points: 25,
        explanation: "손익분기점 매출액 = 고정비 / 공헌이익률 = 240억원입니다."
      },
      {
        id: "q13-4",
        text: "제조원가 개선을 위한 가장 효과적인 방안은 무엇인가요?",
        type: "SINGLE_CHOICE",
        options: [
          "원재료 구매 단가 인하",
          "생산 자동화 시설 투자",
          "아웃소싱 확대",
          "제품 가격 인상"
        ],
        correctAnswer: "원재료 구매 단가 인하",
        points: 35,
        explanation: "이 기업은 원재료비가 전체 제조원가의 50%를 차지하고 있어, 원재료 구매 단가 인하가 가장 효과적인 제조원가 개선 방안입니다."
      }
    ],
    hints: [
      "변동비는 생산량에 비례하여 변동하는 비용입니다",
      "고정비는 생산량과 상관없이 일정하게 발생하는 비용입니다",
      "손익분기점은 총 수익과 총 비용이 같아지는 지점입니다",
      "공헌이익률 = (매출액 - 변동비) / 매출액"
    ]
  },
  
  // 레벨 4 미션 (중간 난이도)
  {
    id: "m14",
    title: "신용평가 지표 분석",
    description: "우리은행에서 대출 심사를 위한 기업의 신용평가 지표 분석을 요청했습니다. 재무제표를 분석하여 핵심 신용평가 지표를 도출해주세요.",
    clientId: "c3",
    type: MissionType.STABILITY,
    difficulty: MissionDifficulty.MEDIUM,
    requiredLevel: 4,
    reward: {
      money: 750000,
      experience: 65
    },
    companyIds: ["company3"],
    questions: [
      {
        id: "q14-1",
        text: "이 기업의 이자보상배율은 얼마인가요?",
        type: "NUMERIC",
        correctAnswer: 5.5,
        points: 20,
        explanation: "이자보상배율 = 영업이익 / 이자비용 = 5.5배입니다."
      },
      {
        id: "q14-2",
        text: "이 기업의 부채상환계수(DSCR)는 얼마인가요?",
        type: "NUMERIC",
        correctAnswer: 1.8,
        points: 25,
        explanation: "부채상환계수(DSCR) = 영업현금흐름 / (이자비용 + 유동성장기부채) = 1.8배입니다."
      },
      {
        id: "q14-3",
        text: "이 기업의 순차입금 대 EBITDA 비율은 얼마인가요?",
        type: "NUMERIC",
        correctAnswer: 2.4,
        points: 25,
        explanation: "순차입금 대 EBITDA 비율 = 순차입금 / EBITDA = 2.4배입니다."
      },
      {
        id: "q14-4",
        text: "이 기업의 신용등급은 어느 수준으로 평가할 수 있나요?",
        type: "SINGLE_CHOICE",
        options: [
          "투자적격 상위등급 (AA 이상)",
          "투자적격 중위등급 (A)",
          "투자적격 하위등급 (BBB)",
          "투기등급 (BB 이하)"
        ],
        correctAnswer: "투자적격 중위등급 (A)",
        points: 30,
        explanation: "이자보상배율 5.5배, 부채상환계수 1.8배, 순차입금 대 EBITDA 비율 2.4배는 투자적격 중위등급(A)에 해당하는 수준입니다."
      }
    ],
    hints: [
      "이자보상배율 = 영업이익 / 이자비용",
      "부채상환계수(DSCR) = 영업현금흐름 / (이자비용 + 유동성장기부채)",
      "순차입금 = 총차입금 - 현금성자산",
      "EBITDA = 영업이익 + 감가상각비 + 무형자산상각비",
      "일반적으로 이자보상배율 3배 이상, DSCR 1.5배 이상이면 양호한 수준입니다"
    ]
  },
  
  // 레벨 5 미션 (어려운 난이도)
  {
    id: "m15",
    title: "자본비용 분석",
    description: "한국투자증권에서 기업의 자본비용 계산을 요청했습니다. 가중평균자본비용(WACC)을 산출해주세요.",
    clientId: "c2",
    type: MissionType.INVESTMENT_DECISION,
    difficulty: MissionDifficulty.HARD,
    requiredLevel: 5,
    reward: {
      money: 980000,
      experience: 85
    },
    companyIds: ["company4"],
    questions: [
      {
        id: "q15-1",
        text: "이 기업의 타인자본비용(세후)은 얼마인가요? (%)",
        type: "NUMERIC",
        correctAnswer: 4.2,
        points: 20,
        explanation: "타인자본비용(세후) = 차입이자율 × (1 - 법인세율) = 5.6% × (1 - 25%) = 4.2%입니다."
      },
      {
        id: "q15-2",
        text: "이 기업의 자기자본비용은 얼마인가요? (%)",
        type: "NUMERIC",
        correctAnswer: 12.8,
        points: 25,
        explanation: "자기자본비용 = 무위험수익률 + 베타 × 시장위험프리미엄 = 3.5% + 1.1 × 8.5% = 12.8%입니다."
      },
      {
        id: "q15-3",
        text: "이 기업의 총자본 중 타인자본 비중은 얼마인가요? (%)",
        type: "NUMERIC",
        correctAnswer: 40,
        points: 25,
        explanation: "타인자본 비중 = 타인자본 / 총자본 × 100 = 40%입니다."
      },
      {
        id: "q15-4",
        text: "이 기업의 가중평균자본비용(WACC)은 얼마인가요? (%)",
        type: "NUMERIC",
        correctAnswer: 9.16,
        points: 30,
        explanation: "WACC = 타인자본비용 × 타인자본비중 + 자기자본비용 × 자기자본비중 = 4.2% × 40% + 12.8% × 60% = 9.16%입니다."
      }
    ],
    hints: [
      "타인자본비용(세후) = 차입이자율 × (1 - 법인세율)",
      "자기자본비용 = 무위험수익률 + 베타 × 시장위험프리미엄",
      "가중평균자본비용(WACC) = 타인자본비용 × 타인자본비중 + 자기자본비용 × 자기자본비중",
      "베타(β)는 기업의 체계적 위험을 나타내는 지표입니다"
    ]
  },
  
  // 레벨 8 미션 (전문가 난이도)
  {
    id: "m16",
    title: "지주회사 가치평가",
    description: "김투자님이 지주회사 구조를 가진 기업의 가치평가를 요청했습니다. 적절한 가치평가 방법을 적용하여 분석해주세요.",
    clientId: "c1",
    type: MissionType.COMPANY_COMPARISON,
    difficulty: MissionDifficulty.EXPERT,
    requiredLevel: 8,
    reward: {
      money: 1700000,
      experience: 140
    },
    companyIds: ["company7"],
    questions: [
      {
        id: "q16-1",
        text: "이 지주회사가 보유한 상장 자회사들의 가치 합계는 얼마인가요? (단위: 억원)",
        type: "NUMERIC",
        correctAnswer: 8500,
        points: 20,
        explanation: "상장 자회사들의 시가총액에 지주회사의 지분율을 곱하여 계산한 가치 합계는 8,500억원입니다."
      },
      {
        id: "q16-2",
        text: "이 지주회사가 보유한 비상장 자회사들의 가치 합계는 얼마인가요? (단위: 억원)",
        type: "NUMERIC",
        correctAnswer: 3200,
        points: 25,
        explanation: "비상장 자회사들의 가치는 유사 상장기업의 평균 PER을 적용하여 평가한 결과 3,200억원입니다."
      },
      {
        id: "q16-3",
        text: "순자산가치법(NAV)으로 산출한 이 지주회사의 가치는 얼마인가요? (단위: 억원)",
        type: "NUMERIC",
        correctAnswer: 9100,
        points: 25,
        explanation: "순자산가치 = 자회사 가치 합계 - 순부채 = (8,500억원 + 3,200억원) - 2,600억원 = 9,100억원입니다."
      },
      {
        id: "q16-4",
        text: "이 지주회사의 현재 시가총액은 6,500억원입니다. 이 회사의 NAV 할인율은 얼마인가요? (%)",
        type: "NUMERIC",
        correctAnswer: 28.6,
        points: 30,
        explanation: "NAV 할인율 = (NAV - 시가총액) / NAV × 100 = (9,100억원 - 6,500억원) / 9,100억원 × 100 = 28.6%입니다."
      }
    ],
    hints: [
      "지주회사 가치평가는 보유 자회사들의 가치 합계에서 순부채를 차감하는 순자산가치법(NAV)을 주로 사용합니다",
      "상장 자회사는 시가총액에 지분율을 적용하여 평가합니다",
      "비상장 자회사는 유사 상장기업의 평균 PER이나 EV/EBITDA 배수 등을 적용하여 평가합니다",
      "NAV 할인율은 지주회사의 실제 시가총액이 이론적 NAV보다 얼마나 할인되어 거래되는지를 나타냅니다"
    ]
  },
  
  // 레벨 5 미션 (어려운 난이도)
  {
    id: "m17",
    title: "브랜드 가치 평가",
    description: "박경영 CEO가 회사의 브랜드 가치를 평가해달라고 요청했습니다. 적절한 방법론을 적용하여 브랜드 가치를 산출해주세요.",
    clientId: "c4",
    type: MissionType.BUSINESS_STRATEGY,
    difficulty: MissionDifficulty.HARD,
    requiredLevel: 5,
    reward: {
      money: 1050000,
      experience: 95
    },
    companyIds: ["company5"],
    questions: [
      {
        id: "q17-1",
        text: "로열티 면제법에서 적용할 적정 로열티율은 몇 %인가요?",
        type: "NUMERIC",
        correctAnswer: 3.5,
        points: 25,
        explanation: "동종 업계의 라이선스 계약을 참고하여 산출한 적정 로열티율은 3.5%입니다."
      },
      {
        id: "q17-2",
        text: "향후 5년간 예상되는 브랜드 관련 매출의 현재가치는 얼마인가요? (단위: 억원)",
        type: "NUMERIC",
        correctAnswer: 2800,
        points: 25,
        explanation: "향후 5년간 브랜드 관련 매출을 추정하고 할인율을 적용하여 계산한 현재가치는 2,800억원입니다."
      },
      {
        id: "q17-3",
        text: "로열티 면제법으로 산출한 브랜드 가치는 얼마인가요? (단위: 억원)",
        type: "NUMERIC",
        correctAnswer: 98,
        points: 25,
        explanation: "브랜드 가치 = 매출의 현재가치 × 로열티율 = 2,800억원 × 3.5% = 98억원입니다."
      },
      {
        id: "q17-4",
        text: "업계 평균과 비교했을 때 이 회사의 브랜드 가치 수준은 어떻습니까?",
        type: "SINGLE_CHOICE",
        options: [
          "매우 높음 (업계 상위 10% 이내)",
          "높음 (업계 상위 30% 이내)",
          "보통 (업계 평균 수준)",
          "낮음 (업계 하위 30% 이내)"
        ],
        correctAnswer: "높음 (업계 상위 30% 이내)",
        points: 25,
        explanation: "이 회사의 브랜드 가치는 매출 대비 비율로 볼 때 업계 상위 30% 이내에 해당하는 수준입니다."
      }
    ],
    hints: [
      "브랜드 가치 평가에는 로열티 면제법(Relief from Royalty Method)이 많이 사용됩니다",
      "로열티 면제법은 브랜드 소유로 인해 지불하지 않아도 되는 로열티의 현재가치를 계산합니다",
      "로열티율은 동종 업계의 라이선스 계약을 참고하여 결정합니다",
      "브랜드 가치 = 브랜드 관련 매출의 현재가치 × 로열티율"
    ]
  },
  
  // 레벨 2 미션 (쉬운 난이도)
  {
    id: "m18",
    title: "재무상태표 분석",
    description: "김투자님을 위해 기업의 재무상태표를 분석하고 주요 항목의 변동을 파악해주세요.",
    clientId: "c1",
    type: MissionType.STABILITY,
    difficulty: MissionDifficulty.EASY,
    requiredLevel: 2,
    reward: {
      money: 420000,
      experience: 35
    },
    companyIds: ["company1"],
    questions: [
      {
        id: "q18-1",
        text: "전년 대비 유동자산 증가율은 몇 %인가요?",
        type: "NUMERIC",
        correctAnswer: 15.4,
        points: 20,
        explanation: "유동자산 증가율 = (당해 유동자산 - 전년 유동자산) / 전년 유동자산 × 100 = 15.4%입니다."
      },
      {
        id: "q18-2",
        text: "전년 대비 비유동자산 증가율은 몇 %인가요?",
        type: "NUMERIC",
        correctAnswer: 8.7,
        points: 20,
        explanation: "비유동자산 증가율 = (당해 비유동자산 - 전년 비유동자산) / 전년 비유동자산 × 100 = 8.7%입니다."
      },
      {
        id: "q18-3",
        text: "총자산 대비 유동자산의 비율은 몇 %인가요?",
        type: "NUMERIC",
        correctAnswer: 42.5,
        points: 20,
        explanation: "유동자산 비율 = 유동자산 / 총자산 × 100 = 42.5%입니다."
      },
      {
        id: "q18-4",
        text: "재무상태표 분석 결과 이 기업의 가장 큰 특징은 무엇인가요?",
        type: "SINGLE_CHOICE",
        options: [
          "높은 유동성",
          "높은 부채 의존도",
          "높은 비유동자산 비중",
          "높은 이익잉여금 비중"
        ],
        correctAnswer: "높은 유동성",
        points: 40,
        explanation: "이 기업은 유동비율이 180%로 높고, 전년 대비 유동자산 증가율(15.4%)이 비유동자산 증가율(8.7%)보다 높아 유동성이 양호한 상태입니다."
      }
    ],
    hints: [
      "증가율 = (당해 금액 - 전년 금액) / 전년 금액 × 100",
      "유동자산 비율 = 유동자산 / 총자산 × 100",
      "유동비율 = 유동자산 / 유동부채 × 100",
      "재무상태표는 기업의 특정 시점의 재무상태를 보여줍니다"
    ]
  },
  
  // 레벨 4 미션 (중간 난이도)
  {
    id: "m19",
    title: "주가 변동성 분석",
    description: "한국투자증권에서 투자 대상 기업의 주가 변동성을 분석해달라고 요청했습니다. 리스크 관점에서 주가 변동성을 평가해주세요.",
    clientId: "c2",
    type: MissionType.INVESTMENT_DECISION,
    difficulty: MissionDifficulty.MEDIUM,
    requiredLevel: 4,
    reward: {
      money: 720000,
      experience: 65
    },
    companyIds: ["company3", "company4"],
    questions: [
      {
        id: "q19-1",
        text: "A기업의 연간 주가 변동성(표준편차)은 몇 %인가요?",
        type: "NUMERIC",
        correctAnswer: 22.5,
        points: 20,
        explanation: "A기업의 연간 주가 수익률의 표준편차는 22.5%입니다."
      },
      {
        id: "q19-2",
        text: "B기업의 연간 주가 변동성(표준편차)은 몇 %인가요?",
        type: "NUMERIC",
        correctAnswer: 18.3,
        points: 20,
        explanation: "B기업의 연간 주가 수익률의 표준편차는 18.3%입니다."
      },
      {
        id: "q19-3",
        text: "A기업의 베타(β)는 얼마인가요?",
        type: "NUMERIC",
        correctAnswer: 1.35,
        points: 25,
        explanation: "A기업의 베타는 시장 대비 주가 변동성을 나타내며, 1.35입니다."
      },
      {
        id: "q19-4",
        text: "변동성을 고려할 때 어느 기업에 투자하는 것이 더 적합한가요?",
        type: "SINGLE_CHOICE",
        options: [
          "A기업",
          "B기업",
          "두 기업 모두 적합함",
          "두 기업 모두 적합하지 않음"
        ],
        correctAnswer: "B기업",
        points: 35,
        explanation: "B기업은 A기업보다 변동성이 낮고(18.3% vs 22.5%), A기업의 베타(1.35)는 시장보다 높은 변동성을, B기업의 베타(0.95)는 시장보다 낮은 변동성을 가지고 있어, 안정적인 투자를 원하는 투자자에게는 B기업이 더 적합합니다."
      }
    ],
    hints: [
      "주가 변동성은 주가 수익률의 표준편차로 측정합니다",
      "베타(β)는 시장 대비 주가 변동성을 나타내는 지표입니다",
      "베타가 1보다 크면 시장보다 변동성이 크고, 1보다 작으면 시장보다 변동성이 작습니다",
      "변동성이 높을수록 리스크도 높지만, 그에 따른 수익 기회도 클 수 있습니다"
    ]
  },
  
  // 레벨 6 미션 (어려운 난이도)
  {
    id: "m20",
    title: "사업부 가치평가와 분사 타당성 분석",
    description: "박경영 CEO가 특정 사업부의 분사를 고려하고 있습니다. 해당 사업부의 가치를 평가하고 분사 타당성을 분석해주세요.",
    clientId: "c4",
    type: MissionType.BUSINESS_STRATEGY,
    difficulty: MissionDifficulty.HARD,
    requiredLevel: 6,
    reward: {
      money: 1250000,
      experience: 115
    },
    companyIds: ["company6"],
    questions: [
      {
        id: "q20-1",
        text: "DCF 방식으로 산출한 해당 사업부의 가치는 얼마인가요? (단위: 억원)",
        type: "NUMERIC",
        correctAnswer: 380,
        points: 20,
        explanation: "DCF 방식으로 산출한 해당 사업부의 가치는 380억원입니다."
      },
      {
        id: "q20-2",
        text: "상대가치평가법으로 산출한 해당 사업부의 가치는 얼마인가요? (단위: 억원)",
        type: "NUMERIC",
        correctAnswer: 420,
        points: 20,
        explanation: "유사 기업의 평균 EV/EBITDA 배수를 적용한 결과, 해당 사업부의 가치는 420억원입니다."
      },
      {
        id: "q20-3",
        text: "분사 후 독립 기업의 예상 ROE는 몇 %인가요?",
        type: "NUMERIC",
        correctAnswer: 18.5,
        points: 25,
        explanation: "분사 후 독립 기업의 자본구조와 수익성을 고려할 때 예상 ROE는 18.5%입니다."
      },
      {
        id: "q20-4",
        text: "종합적인 관점에서 볼 때, 이 사업부의 분사는 타당한가요?",
        type: "SINGLE_CHOICE",
        options: [
          "매우 타당함",
          "타당함",
          "타당하지 않음",
          "전혀 타당하지 않음"
        ],
        correctAnswer: "타당함",
        points: 35,
        explanation: "이 사업부는 본업과의 시너지가 제한적이고, 독립 기업으로서 더 높은 ROE(18.5% vs 현재 15.2%)를 달성할 수 있으며, 분사를 통해 주주가치가 약 10% 증가할 것으로 예상됩니다. 따라서 분사는 타당한 것으로 판단됩니다."
      }
    ],
    hints: [
      "DCF 방식은 미래 현금흐름의 현재가치를 계산합니다",
      "상대가치평가법은 유사 기업의 평균 배수를 적용합니다",
      "ROE(자기자본이익률) = 당기순이익 / 자기자본 × 100",
      "분사 타당성 평가 시 독립 기업으로서의 가치와 현재 기업 내에서의 가치를 비교하세요",
      "세금, 규제, 운영 효율성, 시너지 등의 요소도 함께 고려하세요"
    ]
  }
];