import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Card, 
  CardContent, 
  CardActions,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Fab,
  AppBar,
  Toolbar,
  Alert,
  LinearProgress,
  Collapse,
  Snackbar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useGame, GamePhase } from '../../contexts/GameContext';
import { OFFICE_LEVELS } from '../../data/gameModels';
import CharacterDialog from '../common/CharacterDialog';
import { CHARACTERS, ASSISTANT_DIALOGS } from '../../data/characters';

// 사무실 업그레이드 비용 계산 함수
const getUpgradeCost = (currentLevel: number): number => {
  const baseCost = 10000; // 기본 비용
  return baseCost * Math.pow(3, currentLevel - 1); // 지수적으로 증가
};

// 사무실 업그레이드에 필요한 유저 레벨 계산 함수
const getRequiredUserLevel = (targetOfficeLevel: number): number => {
  // 사무실 레벨별 필요 유저 레벨
  const levelRequirements = {
    1: 1,  // 레벨 1 사무실은 유저 레벨 1 필요
    2: 3,  // 레벨 2 사무실은 유저 레벨 3 필요
    3: 6,  // 레벨 3 사무실은 유저 레벨 6 필요
    4: 9,  // 레벨 4 사무실은 유저 레벨 9 필요
    5: 12  // 레벨 5 사무실은 유저 레벨 12 필요
  };
  
  return levelRequirements[targetOfficeLevel as keyof typeof levelRequirements] || 15;
};

const OfficeScreen: React.FC = () => {
  const { user, gamePhase, setGamePhase, availableMissions, resetGame, upgradeOffice, addMoney } = useGame();
  // 비서 대화 상태
  const [assistantMessage, setAssistantMessage] = useState('');
  // 알림 상태
  const [upgradeSnackbar, setUpgradeSnackbar] = useState(false);

  // 컴포넌트 마운트시 방문 횟수 증가
  useEffect(() => {
    const count = parseInt(localStorage.getItem('office-visit-count') || '0', 10);
    const newCount = count + 1;
    localStorage.setItem('office-visit-count', newCount.toString());
    
    // 방문 횟수에 따라 다른 메시지 표시
    if (newCount === 1) {
      setAssistantMessage(ASSISTANT_DIALOGS.OFFICE.WELCOME);
    } else {
      setAssistantMessage(ASSISTANT_DIALOGS.OFFICE.WELCOME);
    }
  }, []);

  if (!user) return null;

  // 현재 사무실 레벨 정보
  const currentOffice = OFFICE_LEVELS.find(office => office.level === user.officeLevel) || OFFICE_LEVELS[0];
  
  // 진행 중인 의뢰 수
  const availableMissionCount = availableMissions.length;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 상단 정보 바 */}
      <AppBar position="static" sx={{ boxShadow: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
        <Toolbar sx={{ py: 1 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {currentOffice.name} {user.isAdmin && <span style={{ fontSize: '0.7em', color: 'rgba(255, 255, 255, 0.7)' }}>[관리자]</span>}
          </Typography>
          <Box sx={{ 
            py: 1, 
            px: 2, 
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            mr: 2,
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
          <Button 
            color="inherit" 
            variant="outlined" 
            onClick={resetGame}
            sx={{ 
              fontSize: '0.8rem',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.7)'
              }
            }}
          >
            로그아웃
          </Button>
        </Toolbar>
      </AppBar>

      {/* 메인 콘텐츠 */}
      <Box sx={{ 
        flexGrow: 1, 
        p: { xs: 1.5, md: 2 }, 
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100%'
      }}>
        {/* 비서 캐릭터 대화창 - 항상 표시 */}
        <Box sx={{ 
          position: 'absolute', 
          bottom: 20, 
          right: 20, 
          zIndex: 10, 
          maxWidth: '450px',
          width: '100%'
        }}>
          <CharacterDialog
            character={{...CHARACTERS.ASSISTANT, position: 'right'}}
            message={assistantMessage}
            showContinueButton={false}
          />
        </Box>
        
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold" 
            sx={{ 
              fontFamily: 'monospace', 
              color: 'primary.main',
              mb: 1
            }}
          >
            {currentOffice.name}
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: '800px', mx: 'auto' }}>
            {currentOffice.description}
          </Typography>
        </Box>
        
        {/* 정보 카드 */}
        <Grid container spacing={3} sx={{ maxWidth: '100%', width: '100%', mx: 0 }}>
          {/* 원래 레이아웃으로 돌아가기 - 카드들 나란히 배치 */}
          {/* 모든 카드 그리드에 일관된 높이 적용 */}
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* 카드 헤더 */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ fontSize: '1.1rem', mb: 1.5 }}>
                    <BusinessIcon sx={{ verticalAlign: 'middle', mr: 1, fontSize: '1.3rem' }} />
                    사무실 정보
                  </Typography>
                  <Divider />
                </Box>
                
                {/* 메인 콘텐츠 - flex:1로 확장 가능 */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* 사무실 레벨 정보 */}
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h4" sx={{ fontSize: '1.8rem', lineHeight: 1.2, mb: 0.5 }} color="primary.main" fontWeight="bold">
                      Level {currentOffice.level} / 5
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                      {currentOffice.name}
                    </Typography>
                  </Box>
                  
                  {/* 레벨 진행 바 */}
                  <Box sx={{ width: '100%', mb: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(currentOffice.level / 5) * 100}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">현재 레벨</Typography>
                      <Typography variant="caption" color="text.secondary">최대 레벨</Typography>
                    </Box>
                  </Box>
                  
                  {/* 사무실 혜택 정보 */}
                  <Box sx={{ 
                    py: 1.5, 
                    px: 2, 
                    bgcolor: 'background.paper', 
                    borderRadius: 2, 
                    border: '1px solid', 
                    borderColor: 'divider',
                    mb: 'auto'  // 남은 공간 채우기
                  }}>
                    <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 500, mb: 1 }}>
                      현재 혜택:
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', mb: 0.7 }}>
                      <StarIcon sx={{ fontSize: '0.9rem', mr: 0.8, color: 'primary.main' }} />
                      최대 레벨 {currentOffice.level + 2} 의뢰 수락 가능
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}>
                      <StarIcon sx={{ fontSize: '0.9rem', mr: 0.8, color: 'primary.main' }} />
                      사무실 평판 +{currentOffice.level * 10}%
                    </Typography>
                  </Box>
                </Box>
                
                {/* 카드 푸터 - 항상 하단에 고정 */}
                <Box sx={{ mt: 2 }}>
                  {/* 업그레이드 버튼 */}
                  {currentOffice.level >= 5 ? (
                    <Button
                      variant="outlined"
                      size="medium"
                      disabled
                      fullWidth
                      sx={{ py: 1.2 }}
                    >
                      최대 레벨 달성
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="medium"
                      disabled={
                        user.money < getUpgradeCost(currentOffice.level) || 
                        user.level < getRequiredUserLevel(currentOffice.level + 1)
                      }
                      fullWidth
                      onClick={() => {
                        // 업그레이드 비용 계산
                        const upgradeCost = getUpgradeCost(currentOffice.level);
                        
                        // 충분한 돈이 있는지 확인
                        if (user.money >= upgradeCost && user.level >= getRequiredUserLevel(currentOffice.level + 1)) {
                          // 비용 지불
                          addMoney(-upgradeCost);
                          // 사무실 업그레이드
                          upgradeOffice();
                          // 알림 표시
                          setUpgradeSnackbar(true);
                          // 비서 메시지 업데이트
                          setAssistantMessage(ASSISTANT_DIALOGS.OFFICE.UPGRADE || "사무실이 업그레이드되었습니다!");
                        }
                      }}
                      startIcon={<ArrowUpwardIcon />}
                      sx={{ py: 1.2 }}
                    >
                      업그레이드 ({getUpgradeCost(currentOffice.level).toLocaleString()}원)
                    </Button>
                  )}
                  
                  {/* 업그레이드 요구사항 팁 */}
                  {currentOffice.level < 5 && (
                    <Box sx={{ mt: 1, textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                        필요: Lv.{getRequiredUserLevel(currentOffice.level + 1)}, {getUpgradeCost(currentOffice.level).toLocaleString()}원
                      </Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* 의뢰 현황 카드 */}
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* 카드 헤더 */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ fontSize: '1.1rem', mb: 1.5 }}>
                    <WorkIcon sx={{ verticalAlign: 'middle', mr: 1, fontSize: '1.3rem' }} />
                    의뢰 현황
                  </Typography>
                  <Divider />
                </Box>
                
                {/* 메인 콘텐츠 - flex:1로 확장 가능 */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* 의뢰 현황 숫자 */}
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <Box sx={{ flex: 1, textAlign: 'center', p: 1 }}>
                      <Typography variant="h3" sx={{ fontSize: '2.2rem', lineHeight: 1.1 }} color={availableMissionCount > 0 ? 'primary.main' : 'text.secondary'}>
                        {availableMissionCount}
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: '0.95rem', mt: 0.5 }} color="text.secondary">진행 가능 의뢰</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                    <Box sx={{ flex: 1, textAlign: 'center', p: 1 }}>
                      <Typography variant="h3" sx={{ fontSize: '2.2rem', lineHeight: 1.1 }} color="text.secondary">
                        {user.completedMissions.length}
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: '0.95rem', mt: 0.5 }} color="text.secondary">완료한 의뢰</Typography>
                    </Box>
                  </Box>
                  
                  {/* 알림 메시지 */}
                  {availableMissionCount > 0 ? (
                    <Alert severity="info" sx={{ py: 0.8, mb: 2, fontSize: '0.9rem' }}>
                      새로운 의뢰가 도착했습니다!
                    </Alert>
                  ) : (
                    <Alert severity="warning" sx={{ py: 0.8, mb: 2, fontSize: '0.9rem' }}>
                      현재 모든 의뢰를 완료했습니다.
                    </Alert>
                  )}
                  
                  {/* 의뢰 통계 정보 */}
                  <Box sx={{ 
                    p: 1.5, 
                    bgcolor: 'background.paper', 
                    borderRadius: 1, 
                    border: '1px dashed rgba(0, 0, 0, 0.12)',
                    mb: 'auto'  // 남은 공간 채우기
                  }}>
                    <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 500, mb: 1, textAlign: 'center' }}>
                      의뢰 진행률: {Math.round((user.completedMissions.length / (user.completedMissions.length + availableMissionCount)) * 100) || 0}%
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <Box sx={{ textAlign: 'center', px: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                          총 수입
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                          {(user.money).toLocaleString()}원
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center', px: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                          의뢰당 평균
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {user.completedMissions.length > 0 
                            ? Math.round(user.money / user.completedMissions.length).toLocaleString() 
                            : 0}원
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                
                {/* 카드 푸터 - 항상 하단에 고정 */}
                <Box sx={{ mt: 2 }}>
                  <Button 
                    size="large" 
                    variant="contained" 
                    color="primary"
                    onClick={() => setGamePhase(GamePhase.MISSION_SELECT)}
                    disabled={availableMissionCount === 0}
                    fullWidth
                    startIcon={<WorkIcon />}
                    sx={{ py: 1.2 }}
                  >
                    의뢰 확인하기
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* 경력 정보 카드 */}
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* 카드 헤더 */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ fontSize: '1.1rem', mb: 1.5 }}>
                    <StarIcon sx={{ verticalAlign: 'middle', mr: 1, fontSize: '1.3rem' }} />
                    경력 정보
                  </Typography>
                  <Divider />
                </Box>
                
                {/* 메인 콘텐츠 - flex:1로 확장 가능 */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* 레벨 정보 */}
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h3" sx={{ fontSize: '2.5rem', lineHeight: 1.2 }} color="primary.main">
                      {user.level}
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1rem' }} color="text.secondary">현재 레벨</Typography>
                  </Box>
                  
                  {/* 경험치 바 */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8, alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>경험치:</Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.9rem' }} fontWeight="bold">{user.experience} XP</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(user.experience / 1000) * 100} 
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">0</Typography>
                      <Typography variant="caption" color="text.secondary">다음 레벨까지 {1000 - user.experience} XP</Typography>
                    </Box>
                  </Box>
                  
                  {/* 스킬 정보 */}
                  <Box sx={{ 
                    p: 1.5, 
                    bgcolor: 'background.paper', 
                    borderRadius: 1, 
                    border: '1px dashed rgba(0, 0, 0, 0.12)',
                    mb: 'auto'  // 남은 공간 채우기
                  }}>
                    <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 500, mb: 1 }}>
                      전문 분야:
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem', width: '50%' }}>
                        재무제표 분석
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(user.level * 10, 100)}
                        sx={{ height: 6, borderRadius: 3, width: '50%' }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem', width: '50%' }}>
                        투자 분석
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(user.level * 8, 100)}
                        sx={{ height: 6, borderRadius: 3, width: '50%' }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem', width: '50%' }}>
                        리스크 관리
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(user.level * 9, 100)}
                        sx={{ height: 6, borderRadius: 3, width: '50%' }}
                      />
                    </Box>
                  </Box>
                </Box>
                
                {/* 카드 푸터 - 항상 하단에 고정 */}
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    p: 2,
                    bgcolor: 'primary.light',
                    borderRadius: 2,
                    color: 'white'
                  }}>
                    <AttachMoneyIcon sx={{ mr: 0.8, fontSize: '1.5rem', color: 'rgba(255, 255, 255, 0.9)' }} />
                    <Typography variant="h5" sx={{ fontSize: '1.6rem', fontWeight: 700 }}>
                      {user.money.toLocaleString()}원
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* 새 의뢰 시작하기 버튼 제거 */}
      </Box>
      
      {/* 업그레이드 성공 알림 */}
      <Snackbar
        open={upgradeSnackbar}
        autoHideDuration={3000}
        onClose={() => setUpgradeSnackbar(false)}
        message={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircleIcon sx={{ mr: 1, color: 'success.main' }} />
            <Typography variant="body2">사무실이 성공적으로 업그레이드되었습니다!</Typography>
          </Box>
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ 
          '& .MuiSnackbarContent-root': { 
            bgcolor: 'background.paper',
            color: 'text.primary',
            boxShadow: 3,
            borderRadius: 2
          }
        }}
      />
    </Box>
  );
};

export default OfficeScreen;