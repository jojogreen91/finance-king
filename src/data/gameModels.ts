export interface User {
  id: string;
  name: string;
  level: number;
  experience: number;
  money: number;
  completedMissions: string[];
  officeLevel: number;
  isAdmin?: boolean; // 어드민 권한 여부
}

export enum ClientType {
  INVESTOR = "INVESTOR",
  CREDITOR = "CREDITOR",
  MANAGEMENT = "MANAGEMENT",
  GOVERNMENT = "GOVERNMENT",
  COMPETITOR = "COMPETITOR"
}

export interface Client {
  id: string;
  name: string;
  type: ClientType;
  description: string;
  avatarUrl?: string;
  unlockLevel: number;
}

export enum MissionDifficulty {
  BEGINNER = "BEGINNER",
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
  EXPERT = "EXPERT"
}

export enum MissionType {
  PROFITABILITY = "PROFITABILITY",
  STABILITY = "STABILITY",
  GROWTH = "GROWTH",
  ACTIVITY = "ACTIVITY",
  CASH_FLOW = "CASH_FLOW",
  INVESTMENT_DECISION = "INVESTMENT_DECISION",
  LOAN_APPROVAL = "LOAN_APPROVAL",
  BUSINESS_STRATEGY = "BUSINESS_STRATEGY",
  COMPANY_COMPARISON = "COMPANY_COMPARISON"
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  clientId: string;
  type: MissionType;
  difficulty: MissionDifficulty;
  requiredLevel: number;
  reward: {
    money: number;
    experience: number;
  };
  companyIds: string[];
  questions: MissionQuestion[];
  hints: string[];
}

export interface MissionQuestion {
  id: string;
  text: string;
  type: "SINGLE_CHOICE" | "MULTI_CHOICE" | "NUMERIC" | "TEXT";
  options?: string[];
  correctAnswer: string | string[] | number;
  points: number;
  explanation: string;
}

// XP needed to level up
export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  30,     // Level 2 - 1개 의뢰로 레벨업 가능
  70,     // Level 3 - 2개 의뢰로 레벨업 가능
  120,    // Level 4 - 2개 의뢰로 레벨업 가능
  180,    // Level 5 - 2개 의뢰로 레벨업 가능
  250,    // Level 6 - 2~3개 의뢰로 레벨업 가능
  350,    // Level 7
  450,    // Level 8
  600,    // Level 9
  800,    // Level 10
  1000,   // Level 11
  1250,   // Level 12
  1500,   // Level 13
  1800,   // Level 14
  2200    // Level 15
];

// Office configurations based on level
export const OFFICE_LEVELS = [
  {
    level: 1,
    name: "방구석 사무실",
    description: "집에서 시작하는 아마추어 회계사 사무실",
    unlockLevel: 1
  },
  {
    level: 2,
    name: "소형 사무실",
    description: "작지만 전문적인 느낌의 사무 공간",
    unlockLevel: 2
  },
  {
    level: 3,
    name: "중형 사무실",
    description: "더 넓고 전문적인 사무실",
    unlockLevel: 4
  },
  {
    level: 4,
    name: "대형 사무실",
    description: "전문 회계법인 느낌의 고급스러운 사무 공간",
    unlockLevel: 6
  },
  {
    level: 5,
    name: "프리미엄 사무실",
    description: "최고급 시설을 갖춘 프리미엄 회계 사무소",
    unlockLevel: 8
  }
];