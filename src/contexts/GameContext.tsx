import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Mission, Client, MissionDifficulty, LEVEL_THRESHOLDS } from '../data/gameModels';
import { sampleClients, sampleMissions } from '../data/sampleData';
import { sampleCompanies, Company } from '../data/financialData';

interface GameContextType {
  // 사용자 관련
  user: User | null;
  setUser: (user: User) => void;
  levelUp: () => void;
  addExperience: (amount: number) => void;
  addMoney: (amount: number) => void;
  upgradeOffice: () => void;
  
  // 클라이언트 관련
  clients: Client[];
  availableClients: Client[];
  
  // 미션 관련
  missions: Mission[];
  availableMissions: Mission[];
  currentMission: Mission | null;
  setCurrentMission: (mission: Mission | null) => void;
  completeMission: (missionId: string, success: boolean, score: number) => void;
  lastCompletedMissionId: string | null; // 마지막으로 완료한 미션 ID
  
  // 기업 관련
  companies: Company[];
  getCompanyById: (companyId: string) => Company | undefined;
  
  // 게임 상태 관련
  gamePhase: GamePhase;
  setGamePhase: (phase: GamePhase) => void;
  startNewGame: (userName: string) => void;
  resetGame: () => void;
  
  // 미션 진행 관련
  currentAnswers: Record<string, any>;
  setAnswer: (questionId: string, answer: any) => void;
}

export enum GamePhase {
  INTRO = "INTRO",
  OFFICE = "OFFICE",
  MISSION_SELECT = "MISSION_SELECT",
  MISSION_ACTIVE = "MISSION_ACTIVE",
  MISSION_RESULT = "MISSION_RESULT"
}

export const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 사용자 상태
  const [user, setUserState] = useState<User | null>(null);
  const [clients, setClients] = useState<Client[]>(sampleClients);
  const [missions, setMissions] = useState<Mission[]>(sampleMissions);
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [lastCompletedMissionId, setLastCompletedMissionId] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>(sampleCompanies);
  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.INTRO);
  const [currentAnswers, setCurrentAnswers] = useState<Record<string, any>>({});

  // 로컬 스토리지에서 게임 상태 불러오기
  useEffect(() => {
    const savedUser = localStorage.getItem('finance-king-user');
    if (savedUser) {
      setUserState(JSON.parse(savedUser));
      setGamePhase(GamePhase.OFFICE);
    }
  }, []);

  // 사용자 상태가 변경될 때 로컬 스토리지에 저장
  useEffect(() => {
    if (user) {
      localStorage.setItem('finance-king-user', JSON.stringify(user));
    }
  }, [user]);

  // 사용자 레벨에 따라 이용 가능한 클라이언트 필터링
  const availableClients = clients.filter(client => client.unlockLevel <= (user?.level || 0));

  // 사용자 레벨에 따라 이용 가능한 미션 필터링
  const availableMissions = missions.filter(mission => 
    mission.requiredLevel <= (user?.level || 0) && 
    !user?.completedMissions.includes(mission.id)
  );

  // 사용자 정보 설정
  const setUser = (updatedUser: User) => {
    setUserState(updatedUser);
  };

  // 경험치 추가 및 레벨 확인
  const addExperience = (amount: number) => {
    if (!user) return;
    
    const newExperience = user.experience + amount;
    const newUser = { ...user, experience: newExperience };
    
    // 레벨업 체크
    const currentLevelThreshold = LEVEL_THRESHOLDS[user.level - 1] || 0;
    const nextLevelThreshold = LEVEL_THRESHOLDS[user.level] || Infinity;
    
    if (newExperience >= nextLevelThreshold && user.level < LEVEL_THRESHOLDS.length) {
      // 레벨업
      newUser.level += 1;
    }
    
    setUserState(newUser);
  };

  // 레벨 증가
  const levelUp = () => {
    if (!user) return;
    
    const newLevel = user.level + 1;
    setUserState({ ...user, level: newLevel });
  };

  // 돈 추가
  const addMoney = (amount: number) => {
    if (!user) return;
    
    const newMoney = user.money + amount;
    setUserState({ ...user, money: newMoney });
  };

  // 사무실 업그레이드
  const upgradeOffice = () => {
    if (!user) return;
    
    const newOfficeLevel = user.officeLevel + 1;
    setUserState({ ...user, officeLevel: newOfficeLevel });
  };

  // 답변 설정
  const setAnswer = (questionId: string, answer: any) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // 기업 ID로 기업 찾기
  const getCompanyById = (companyId: string): Company | undefined => {
    return companies.find(company => company.id === companyId);
  };

  // 미션 완료 처리
  const completeMission = (missionId: string, success: boolean, score: number) => {
    if (!user) return;
    
    console.log(`Completing mission: ${missionId}, success: ${success}, score: ${score}`);
    
    // 마지막으로 완료한 미션 ID 저장
    setLastCompletedMissionId(missionId);
    
    // 미션 정보 저장 (결과 화면에서 참조하기 위함)
    const completedMissionData = missions.find(m => m.id === missionId);
    
    if (success && completedMissionData) {
      // 완료된 미션 목록에 추가
      const completedMissions = [...user.completedMissions, missionId];
      
      // 보상 지급
      const newMoney = user.money + completedMissionData.reward.money;
      const newExperience = user.experience + completedMissionData.reward.experience;
      
      // 레벨업 체크
      let newLevel = user.level;
      const nextLevelThreshold = LEVEL_THRESHOLDS[user.level] || Infinity;
      
      if (newExperience >= nextLevelThreshold && user.level < LEVEL_THRESHOLDS.length) {
        newLevel += 1;
      }
      
      // 사용자 정보 업데이트
      setUserState({
        ...user,
        completedMissions,
        money: newMoney,
        experience: newExperience,
        level: newLevel
      });
    } else if (!success) {
      // 실패한 경우에도 결과 화면으로 이동하기 위해 임시 처리
      console.log("Mission failed");
    }
    
    // 현재 미션 초기화 (답변은 결과 화면에서 사용하므로 유지)
    setCurrentMission(null);
    
    // 게임 단계 변경
    setGamePhase(GamePhase.MISSION_RESULT);
    
    // 참고: 답변 데이터(currentAnswers)는 결과 화면에서 사용한 후에 초기화
  };

  // 새 게임 시작
  const startNewGame = (userName: string) => {
    // 어드민 계정 체크 - 유저네임이 "조조그린킹"인 경우
    const isAdmin = userName === "조조그린킹";
    
    // 초기 사용자 정보 생성
    const newUser: User = {
      id: '1',
      name: userName,
      level: 1,
      experience: 0,
      money: 0,
      completedMissions: [],
      officeLevel: 1,
      isAdmin: isAdmin // 어드민 권한 설정
    };
    
    setUserState(newUser);
    setGamePhase(GamePhase.OFFICE);
  };

  // 게임 초기화
  const resetGame = () => {
    setUserState(null);
    setCurrentMission(null);
    setCurrentAnswers({});
    setGamePhase(GamePhase.INTRO);
    localStorage.removeItem('finance-king-user');
  };

  // 컨텍스트 값
  const value = {
    user,
    setUser,
    levelUp,
    addExperience,
    addMoney,
    upgradeOffice,
    
    clients,
    availableClients,
    
    missions,
    availableMissions,
    currentMission,
    setCurrentMission,
    completeMission,
    lastCompletedMissionId,
    
    companies,
    getCompanyById,
    
    gamePhase,
    setGamePhase,
    startNewGame,
    resetGame,
    
    currentAnswers,
    setAnswer
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};