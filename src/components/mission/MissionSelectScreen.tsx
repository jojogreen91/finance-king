import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  IconButton,
  Chip,
  Divider,
  Paper,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
  AppBar,
  Toolbar,
  Collapse
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GavelIcon from '@mui/icons-material/Gavel';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CloseIcon from '@mui/icons-material/Close';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useGame, GamePhase } from '../../contexts/GameContext';
import { MissionDifficulty, MissionType, ClientType } from '../../data/gameModels';
import CharacterDialog from '../common/CharacterDialog';
import { CHARACTERS, ASSISTANT_DIALOGS, getCharacterByClientId } from '../../data/characters';

const MissionSelectScreen: React.FC = () => {
  const { availableMissions, setGamePhase, setCurrentMission, getCompanyById, user, clients } = useGame();
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [missionDetailsOpen, setMissionDetailsOpen] = useState(false);
  
  // 비서 캐릭터 대화 관련 상태
  const [assistantMessage, setAssistantMessage] = useState<React.ReactNode>('의뢰 목록입니다. 수행하실 의뢰를 선택해주세요.');

  // 클라이언트 유형에 따른 아이콘 및 색상
  const getClientTypeInfo = (type: ClientType) => {
    switch (type) {
      case ClientType.INVESTOR:
        return { 
          icon: <PersonIcon />, 
          label: '투자자', 
          color: 'primary' 
        };
      case ClientType.CREDITOR:
        return { 
          icon: <AccountBalanceIcon />, 
          label: '채권자', 
          color: 'secondary' 
        };
      case ClientType.MANAGEMENT:
        return { 
          icon: <BusinessIcon />, 
          label: '경영진', 
          color: 'success' 
        };
      case ClientType.GOVERNMENT:
        return { 
          icon: <GavelIcon />, 
          label: '정부기관', 
          color: 'warning' 
        };
      case ClientType.COMPETITOR:
        return { 
          icon: <CompareArrowsIcon />, 
          label: '경쟁사', 
          color: 'info' 
        };
      default:
        return { 
          icon: <PersonIcon />, 
          label: '기타', 
          color: 'default' 
        };
    }
  };
  
  // 난이도에 따른 별점 및 색상
  const getDifficultyInfo = (difficulty: MissionDifficulty) => {
    switch (difficulty) {
      case MissionDifficulty.BEGINNER:
        return { stars: 1, color: 'success.main', label: '초보자' };
      case MissionDifficulty.EASY:
        return { stars: 2, color: 'success.light', label: '쉬움' };
      case MissionDifficulty.MEDIUM:
        return { stars: 3, color: 'warning.light', label: '보통' };
      case MissionDifficulty.HARD:
        return { stars: 4, color: 'warning.main', label: '어려움' };
      case MissionDifficulty.EXPERT:
        return { stars: 5, color: 'error.main', label: '전문가' };
      default:
        return { stars: 1, color: 'success.main', label: '초보자' };
    }
  };

  // 미션 타입에 따른 라벨
  const getMissionTypeLabel = (type: MissionType) => {
    switch (type) {
      case MissionType.PROFITABILITY: return '수익성 분석';
      case MissionType.STABILITY: return '안정성 분석';
      case MissionType.GROWTH: return '성장성 분석';
      case MissionType.ACTIVITY: return '활동성 분석';
      case MissionType.CASH_FLOW: return '현금흐름 분석';
      case MissionType.INVESTMENT_DECISION: return '투자 결정';
      case MissionType.LOAN_APPROVAL: return '대출 심사';
      case MissionType.BUSINESS_STRATEGY: return '경영 전략';
      case MissionType.COMPANY_COMPARISON: return '기업 비교';
      default: return '기타 분석';
    }
  };

  // 미션 선택 처리
  const handleMissionSelect = (missionId: string) => {
    setSelectedMission(missionId);
    
    // 선택한 미션 정보 가져오기
    const mission = availableMissions.find(m => m.id === missionId);
    if (mission) {
      const client = clients.find(c => c.id === mission.clientId);
      const difficultyInfo = getDifficultyInfo(mission.difficulty);
      
      // 비서 메시지 설정
      const message = (
        <>
          <Typography paragraph>
            <b>{mission.title}</b> 의뢰를 선택하셨습니다.
          </Typography>
          <Typography paragraph>
            의뢰인 <b>{client?.name || '알 수 없음'}</b>님께서 <b>{getMissionTypeLabel(mission.type)}</b> 관련 분석을 요청하셨습니다.
          </Typography>
          <Typography>
            난이도는 <b>{difficultyInfo.label}</b>이며, 성공적으로 완료하면 <b>{mission.reward.money.toLocaleString()}원</b>의 보수와 <b>{mission.reward.experience} 경험치</b>를 얻을 수 있습니다.
          </Typography>
        </>
      );
      
      // 비서 메시지 표시 
      setAssistantMessage(message);
    }
    
    setMissionDetailsOpen(true);
  };

  // 미션 시작 처리
  const handleStartMission = () => {
    const mission = availableMissions.find(m => m.id === selectedMission);
    if (mission) {
      setCurrentMission(mission);
      setGamePhase(GamePhase.MISSION_ACTIVE);
    }
    setMissionDetailsOpen(false);
  };

  // 선택된 미션 찾기
  const selectedMissionData = availableMissions.find(m => m.id === selectedMission);

  if (!user) return null;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 상단 헤더 */}
      <AppBar position="static" sx={{ boxShadow: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
        <Toolbar sx={{ py: 1 }}>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => setGamePhase(GamePhase.OFFICE)}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            의뢰 선택
          </Typography>
          <Box sx={{ 
            py: 1, 
            px: 2, 
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            color: 'white'
          }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600,
                mr: 1.5
              }}
            >
              {user.name}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 500,
                mr: 1.5
              }}
            >
              Lv. {user.level}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              💰 {user.money.toLocaleString()}원
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 미션 목록 컨테이너 */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        flexGrow: 1, 
        bgcolor: '#f5f8fa', 
        position: 'relative',
        overflow: 'hidden' // 전체 컨테이너의 오버플로우 제어
      }}>
        {/* 미션 목록 - 스크롤 가능 영역 */}
        <Box sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 56px)', // 상단 AppBar 높이 제외
          overflow: 'hidden' // 이 컨테이너에서 오버플로우 숨김
        }}>
          <Box sx={{ 
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'primary.main',
            flexShrink: 0, // 헤더가 축소되지 않도록 설정
            py: { xs: 1.5, md: 2 },
            px: { xs: 2, md: 3 },
            boxShadow: '0 1px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              maxWidth: '1400px', 
              mx: 'auto',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 3, md: 0 }
            }}>
              <Box sx={{ 
                textAlign: { xs: 'center', md: 'left' },
                width: { xs: '100%', md: 'auto' }
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontSize: { xs: '1.2rem', md: '1.4rem' }, 
                    mb: 1.5,
                    fontWeight: 'bold',
                    color: 'primary.main',
                    display: 'inline-block'
                  }}
                >
                  이용 가능한 의뢰
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    fontSize: '0.85rem', 
                    maxWidth: '600px',
                    lineHeight: 1.5,
                    mt: 1
                  }}
                >
                  아래 의뢰 중 하나를 선택하여 재무 분석을 시작하세요.
                </Typography>
              </Box>
              
              {/* 비서 캐릭터 대화창 - 오른쪽에 배치 */}
              <Box sx={{ 
                width: { xs: '100%', md: '450px' },
                maxWidth: { xs: '500px', md: '450px' },
                flexShrink: 0,
                ml: { xs: 0, md: 3 },
                mx: { xs: 'auto', md: 0 },
                display: { xs: 'none', md: 'block' } // 모바일에서는 숨김
              }}>
                <CharacterDialog
                  character={{...CHARACTERS.ASSISTANT, position: 'right'}}
                  message={assistantMessage}
                  showContinueButton={false}
                />
              </Box>
            </Box>
          </Box>
          
          {/* 스크롤 가능한 미션 카드 영역 */}
          <Box sx={{ 
            flexGrow: 1, 
            overflowY: 'auto', // 이 영역에만 스크롤 적용
            p: { xs: 2, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#f9f9fb', // 배경색 변경
            backgroundImage: 'linear-gradient(to bottom, rgba(65, 105, 225, 0.03), rgba(65, 105, 225, 0.01))'
          }}>
            <Container maxWidth={false} disableGutters sx={{ 
              px: { xs: 1, md: 2 }, 
              width: '100%', 
              maxWidth: '1400px', 
              height: '100%', // 컨테이너 높이 100% 설정
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* 모바일에서만 표시되는 비서 */}
              <Box sx={{ 
                width: '100%', 
                mb: 3,
                maxWidth: '500px',
                mx: 'auto',
                display: { xs: 'block', md: 'none' }, // 모바일에서만 표시
                flexShrink: 0, // 크기 고정
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                borderRadius: 2,
                overflow: 'hidden'
              }}>
                <CharacterDialog
                  character={{...CHARACTERS.ASSISTANT, position: 'right'}}
                  message={assistantMessage}
                  showContinueButton={false}
                />
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 3, 
                flexShrink: 0,
                px: { xs: 1, md: 2 }
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'medium', 
                    color: 'text.primary',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <AssignmentIcon sx={{ color: 'primary.main' }} />
                  선택 가능한 의뢰 목록
                </Typography>
                
                <Chip 
                  label={`${availableMissions.length}개의 의뢰`} 
                  color="primary" 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    fontWeight: 'medium',
                    fontSize: '0.8rem',
                    borderRadius: '16px',
                    px: 1
                  }}
                />
              </Box>
              
              <Grid container spacing={3} sx={{ 
                width: '100%', 
                mx: 0, 
                pb: 4, // 하단 여백 추가
                flexGrow: 1, 
                minHeight: 0, // flexbox 내부에서 스크롤이 작동하기 위한 설정
                alignContent: 'flex-start' // 컨텐츠를 위에서부터 배치
              }}>
              {availableMissions.map((mission) => {
                const difficultyInfo = getDifficultyInfo(mission.difficulty);
                
                return (
                  <Grid item xs={12} md={6} lg={6} key={mission.id}>
                    <Card sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      overflow: 'hidden',
                      borderRadius: 3,
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.06)',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, primary.main, primary.light)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                      },
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                        borderColor: 'primary.main',
                        '&::before': {
                          opacity: 1
                        }
                      }
                    }}>
                      <CardContent sx={{ 
                        flexGrow: 1,
                        p: 0,
                      }}>
                        {/* 카드 헤더 부분 - 배경색 있는 타이틀과 태그 */}
                        <Box sx={{ 
                          background: 'linear-gradient(135deg, #000000, #333333)',
                          px: 3, 
                          py: 2.5, 
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '6px',
                            background: 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0))'
                          }
                        }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" component="div" sx={{ 
                              fontWeight: 'bold', 
                              fontSize: '1.2rem',
                              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                              color: 'white'
                            }}>
                              {mission.title}
                            </Typography>
                            <Chip 
                              size="small"
                              label={getMissionTypeLabel(mission.type)}
                              sx={{ 
                                bgcolor: 'rgba(255, 255, 255, 0.25)', 
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.75rem',
                                height: '26px',
                                borderRadius: '13px',
                                border: '1px solid rgba(255,255,255,0.3)',
                                backdropFilter: 'blur(4px)'
                              }}
                            />
                          </Box>
                        </Box>

                        {/* 카드 본문 내용 */}
                        <Box sx={{ p: 3 }}>
                          {/* 클라이언트 및 난이도 정보 - 윗줄 */}
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            mb: 2.5,
                            pb: 2,
                            borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
                          }}>
                            {/* 클라이언트 정보 */}
                            {(() => {
                              const client = clients.find(c => c.id === mission.clientId);
                              if (client) {
                                const typeInfo = getClientTypeInfo(client.type);
                                return (
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar 
                                      sx={{ 
                                        bgcolor: `${typeInfo.color}.main`, 
                                        width: 32, 
                                        height: 32, 
                                        mr: 1.5,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                      }}
                                    >
                                      {typeInfo.icon}
                                    </Avatar>
                                    <Box>
                                      <Typography variant="body2" sx={{ 
                                        fontSize: '0.95rem', 
                                        fontWeight: 'bold',
                                        color: 'text.primary'
                                      }}>
                                        {client.name}
                                      </Typography>
                                      <Typography variant="caption" sx={{ 
                                        fontSize: '0.75rem',
                                        color: 'text.secondary',
                                        display: 'flex',
                                        alignItems: 'center'
                                      }}>
                                        {typeInfo.label}
                                      </Typography>
                                    </Box>
                                  </Box>
                                );
                              }
                              return null;
                            })()}
                            
                            {/* 난이도 정보 */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                              <Chip 
                                size="small"
                                label={difficultyInfo.label}
                                sx={{ 
                                  bgcolor: difficultyInfo.color,
                                  color: 'white',
                                  height: 24,
                                  fontSize: '0.75rem',
                                  fontWeight: 'bold',
                                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                }}
                              />
                              <Rating 
                                value={difficultyInfo.stars} 
                                readOnly 
                                size="small"
                                sx={{ 
                                  mt: 0.5,
                                  fontSize: '0.7rem',
                                  color: difficultyInfo.color
                                }}
                              />
                            </Box>
                          </Box>
                          
                          {/* 미션 설명 */}
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                              fontSize: '0.9rem',
                              lineHeight: 1.7,
                              minHeight: '4.8em',
                              mb: 2.5,
                              borderLeft: '3px solid',
                              borderLeftColor: 'primary.light',
                              pl: 1.5,
                              py: 0.5
                            }}
                          >
                            {mission.description}
                          </Typography>
                          
                          {/* 보상 정보 */}
                          <Box sx={{ 
                            display: 'flex', 
                            pt: 2,
                            borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              bgcolor: '#e6f7e6',
                              border: '1px solid #2e7d32',
                              color: '#2e7d32',
                              py: 0.75,
                              px: 2,
                              borderRadius: 2
                            }}>
                              <MonetizationOnIcon sx={{ fontSize: '1.2rem', mr: 0.75, color: '#2e7d32' }} />
                              <Typography variant="body1" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                {mission.reward.money.toLocaleString()}원
                              </Typography>
                            </Box>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              bgcolor: '#e3f2fd',
                              border: '1px solid #1976d2',
                              color: '#1976d2',
                              py: 0.75,
                              px: 2,
                              borderRadius: 2
                            }}>
                              <WorkspacePremiumIcon sx={{ fontSize: '1.2rem', mr: 0.75, color: '#1976d2' }} />
                              <Typography variant="body1" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                {mission.reward.experience} XP
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                      <CardActions sx={{ p: 0, mt: 'auto' }}>
                        <Button 
                          variant="contained"
                          fullWidth
                          onClick={() => handleMissionSelect(mission.id)}
                          sx={{ 
                            borderRadius: '0 0 8px 8px',
                            py: 1.75,
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            boxShadow: 'none',
                            background: 'linear-gradient(90deg, primary.main, primary.dark)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                              filter: 'brightness(110%)'
                            }
                          }}
                        >
                          의뢰 상세보기
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            
            {availableMissions.length === 0 && (
              <Box sx={{ 
                py: 10, 
                textAlign: 'center',
                border: '1px dashed',
                borderColor: 'divider',
                borderRadius: 2
              }}>
                <Typography variant="h6" color="text.secondary">
                  현재 이용 가능한 의뢰가 없습니다.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  레벨을 올리거나 다른 클라이언트를 선택해보세요.
                </Typography>
                <Button 
                  variant="outlined" 
                  sx={{ mt: 2 }}
                  onClick={() => setGamePhase(GamePhase.OFFICE)}
                >
                  사무실로 돌아가기
                </Button>
              </Box>
            )}
            </Container>
          </Box>
        </Box>
      </Box>

      {/* 미션 상세 다이얼로그 */}
      <Dialog 
        open={missionDetailsOpen} 
        onClose={() => setMissionDetailsOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            position: 'relative',
            pb: 2,
            boxShadow: '0 10px 35px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden'
          }
        }}
      >
        {selectedMissionData && (
          <>
            <DialogTitle sx={{ 
              bgcolor: 'primary.main',
              color: 'white', 
              py: 3,
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <Typography variant="h5" fontWeight="bold">{selectedMissionData.title}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
                <Chip 
                  size="small"
                  label={getMissionTypeLabel(selectedMissionData.type)}
                  sx={{ 
                    mr: 1.5, 
                    bgcolor: 'rgba(255, 255, 255, 0.25)', 
                    color: 'white',
                    fontWeight: 'bold',
                    border: 'none'
                  }}
                />
                <Rating 
                  value={getDifficultyInfo(selectedMissionData.difficulty).stars} 
                  readOnly 
                  size="small"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    '& .MuiRating-iconFilled': {
                      color: 'rgba(255, 255, 255, 0.9)'
                    }
                  }}
                />
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              {/* 김비서 대화창 */}
              <Box sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
                <Paper sx={{ p: 2, bgcolor: 'grey.50', position: 'relative' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Avatar 
                      sx={{ 
                        width: 48, 
                        height: 48, 
                        mr: 2, 
                        border: '2px solid',
                        borderColor: 'primary.main',
                        bgcolor: 'primary.main'
                      }}
                    >
                      <SupportAgentIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                        {CHARACTERS.ASSISTANT.name}
                      </Typography>
                      <Box>
                        <Typography variant="body2" paragraph>
                          <b>{selectedMissionData.title}</b> 의뢰에 관심이 있으시군요!
                        </Typography>
                        {(() => {
                          const client = clients.find(c => c.id === selectedMissionData.clientId);
                          if (client) {
                            return (
                              <Typography variant="body2" paragraph>
                                의뢰인 <b>{client.name}</b>님께서 <b>{getMissionTypeLabel(selectedMissionData.type)}</b> 관련 분석을 요청하셨습니다.
                              </Typography>
                            );
                          }
                          return null;
                        })()}
                        <Typography variant="body2">
                          난이도는 <b>{getDifficultyInfo(selectedMissionData.difficulty).label}</b>이며, 성공적으로 완료하면 <b>{selectedMissionData.reward.money.toLocaleString()}원</b>의 보수와 <b>{selectedMissionData.reward.experience} 경험치</b>를 얻을 수 있습니다.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Box>
              
              <Typography paragraph>
                {selectedMissionData.description}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      <AssignmentIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                      미션 정보
                    </Typography>
                    <List dense>
                      {(() => {
                        const client = clients.find(c => c.id === selectedMissionData.clientId);
                        if (client) {
                          const typeInfo = getClientTypeInfo(client.type);
                          return (
                            <ListItem>
                              <ListItemAvatar sx={{ minWidth: 36 }}>
                                <Avatar sx={{ width: 24, height: 24, bgcolor: `${typeInfo.color}.main` }}>
                                  {typeInfo.icon}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText 
                                primary="의뢰인" 
                                secondary={`${client.name} (${typeInfo.label})`} 
                              />
                            </ListItem>
                          );
                        }
                        return null;
                      })()}
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <WorkspacePremiumIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="난이도" 
                          secondary={getDifficultyInfo(selectedMissionData.difficulty).label} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <MonetizationOnIcon fontSize="small" color="success" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="보상" 
                          secondary={`${selectedMissionData.reward.money.toLocaleString()}원 / 경험치 ${selectedMissionData.reward.experience}`} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <HelpOutlineIcon fontSize="small" color="info" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="질문 수" 
                          secondary={`${selectedMissionData.questions.length}개 질문`} 
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      <BusinessIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                      분석 대상 기업
                    </Typography>
                    <List dense>
                      {selectedMissionData.companyIds.map(companyId => {
                        const company = getCompanyById(companyId);
                        return (
                          <ListItem key={companyId}>
                            <ListItemText 
                              primary={company?.name || '알 수 없는 기업'} 
                              secondary={company?.industry || '-'} 
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom color="primary.main">
                  참고 사항
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  이 의뢰를 수행하려면 재무제표를 분석하고 질문에 답변해야 합니다. 질문에 올바르게 답변할수록 더 많은 점수를 얻을 수 있습니다.
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Button 
                onClick={() => setMissionDetailsOpen(false)} 
                variant="outlined"
                sx={{ 
                  borderWidth: 2,
                  mr: 2,
                  px: 3
                }}
              >
                취소
              </Button>
              <Button 
                onClick={handleStartMission} 
                variant="contained"
                sx={{ 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                  px: 4,
                  py: 1.5
                }}
              >
                의뢰 시작하기
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default MissionSelectScreen;