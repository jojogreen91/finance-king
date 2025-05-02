import React, { useState } from 'react';
import { Box, Container, Typography, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Fade } from '@mui/material';
import { useGame, GamePhase } from '../contexts/GameContext';
import OfficeScreen from './office/OfficeScreen';
import MissionSelectScreen from './mission/MissionSelectScreen';
import MissionScreen from './mission/MissionScreen';
import MissionResultScreen from './mission/MissionResultScreen';
import CharacterDialog from './common/CharacterDialog';
import { CHARACTERS, ASSISTANT_DIALOGS } from '../data/characters';

const MainGame: React.FC = () => {
  const { gamePhase, startNewGame, user, resetGame, setGamePhase } = useGame();
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [userName, setUserName] = useState('');
  const [nameError, setNameError] = useState('');

  // 게임 시작 버튼 클릭 처리
  const handleStartGame = () => {
    setShowNameDialog(true);
  };

  // 이름 제출 처리
  const handleNameSubmit = () => {
    if (!userName.trim()) {
      setNameError('이름을 입력해주세요.');
      return;
    }
    
    startNewGame(userName);
    setShowNameDialog(false);
    setUserName('');
  };

  // 인트로 화면 상태 관리
  const [introStep, setIntroStep] = useState(0);
  const [introBackground, setIntroBackground] = useState('linear-gradient(to bottom, #e0f7fa, #ffffff)');
  
  // 게임 시작 화면 (미연시 스타일)
  const renderIntroScreen = () => (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      p: 4,
      background: introBackground,
      transition: 'background 0.5s ease'
    }}>
      {introStep === 0 && (
        <Fade in={true}>
          <Box sx={{ 
            textAlign: 'center', 
            mb: { xs: 2, md: 6 },
            maxWidth: '800px',
            mx: 'auto',
            p: { xs: 3, md: 4 },
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 3,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <Typography variant="h2" component="h1" sx={{ 
                fontFamily: 'monospace', 
                color: 'primary.main',
                letterSpacing: '-1px',
                fontSize: { xs: '2.5rem', md: '3rem' },
                fontWeight: 800,
                textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
                position: 'relative',
                display: 'inline-block',
                pb: 1.5,
                mb: 1,
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '40%',
                  height: '3px',
                  backgroundColor: 'primary.main',
                  bottom: 0,
                  left: '30%'
                }
              }}
            >
              FINANCE KING
            </Typography>
            <Typography variant="h3" component="h2" sx={{ 
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                fontWeight: 700,
                mb: 2,
                color: 'secondary.main'
              }}
            >
              재무왕
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ 
              fontSize: { xs: '1rem', md: '1.2rem' },
              mb: 4,
              lineHeight: 1.5,
              px: { xs: 0, md: 4 },
              fontWeight: 400
             }}>
              회계사가 되어 재무제표를 분석하고 기업과 투자자들에게 전문적인 조언을 제공하세요
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => setIntroStep(1)}
              sx={{ 
                py: 1.5, 
                px: 4, 
                fontSize: '1.1rem',
                borderRadius: 3,
                fontWeight: 600,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                }
              }}
            >
              게임 시작하기
            </Button>
          </Box>
        </Fade>
      )}
      
      {introStep === 1 && (
        <Box sx={{ maxWidth: '800px', mx: 'auto', width: '100%' }}>
          <CharacterDialog
            character={CHARACTERS.ASSISTANT}
            message={ASSISTANT_DIALOGS.INTRO.WELCOME}
            onContinue={() => setIntroStep(2)}
          />
        </Box>
      )}
      
      {introStep === 2 && (
        <Box sx={{ maxWidth: '800px', mx: 'auto', width: '100%' }}>
          <CharacterDialog
            character={CHARACTERS.ASSISTANT}
            message={ASSISTANT_DIALOGS.INTRO.GAME_EXPLANATION}
            onContinue={() => setIntroStep(3)}
          />
        </Box>
      )}
      
      {introStep === 3 && (
        <Box sx={{ maxWidth: '800px', mx: 'auto', width: '100%' }}>
          <CharacterDialog
            character={CHARACTERS.ASSISTANT}
            message={ASSISTANT_DIALOGS.INTRO.NAME_REQUEST}
            onContinue={() => setShowNameDialog(true)}
          />
        </Box>
      )}
      
      {introStep === 4 && (
        <Box sx={{ maxWidth: '800px', mx: 'auto', width: '100%' }}>
          <CharacterDialog
            character={CHARACTERS.ASSISTANT}
            message={
              <>
                <Typography paragraph>
                  반갑습니다, <b>{userName}</b>님! 저는 앞으로 회계사님의 비서로 일하게 된 김비서입니다.
                </Typography>
                <Typography paragraph>
                  처음에는 간단한 수익성 분석부터 시작하여, 점점 복잡한 기업 인수 타당성 분석까지 도전해보세요.
                  성공적인 분석을 통해 경험치와 보수를 얻고, 더 높은 레벨의 의뢰를 수행할 수 있습니다.
                </Typography>
                <Typography>
                  사무실도 점점 업그레이드하며 전문 회계사로 성장해보세요! 제가 옆에서 도와드리겠습니다.
                </Typography>
              </>
            }
            onContinue={handleNameSubmit}
            continueText="사무실로 이동하기"
          />
        </Box>
      )}

      {/* 이름 입력 다이얼로그 */}
      <Dialog 
        open={showNameDialog} 
        onClose={() => setShowNameDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 3
          }
        }}
      >
        <DialogTitle>회계사 이름 입력</DialogTitle>
        <DialogContent>
          <Typography paragraph sx={{ mt: 1 }}>
            게임에서 사용할 회계사 이름을 입력해주세요.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="이름"
            fullWidth
            variant="outlined"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              if (e.target.value.trim()) setNameError('');
            }}
            error={!!nameError}
            helperText={nameError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNameDialog(false)}>취소</Button>
          <Button 
            onClick={() => {
              if (!userName.trim()) {
                setNameError('이름을 입력해주세요.');
                return;
              }
              setShowNameDialog(false);
              setIntroStep(4);
            }} 
            variant="contained"
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  // 게임 단계에 따른 화면 렌더링
  const renderGameScreen = () => {
    switch(gamePhase) {
      case GamePhase.INTRO:
        return renderIntroScreen();
      case GamePhase.OFFICE:
        return <OfficeScreen />;
      case GamePhase.MISSION_SELECT:
        return <MissionSelectScreen />;
      case GamePhase.MISSION_ACTIVE:
        return <MissionScreen />;
      case GamePhase.MISSION_RESULT:
        return <MissionResultScreen />;
      default:
        return renderIntroScreen();
    }
  };

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        height: '100vh', 
        py: { xs: 1, md: 2 },
        px: { xs: 1, md: 2 }
      }}
      disableGutters
    >
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        {renderGameScreen()}
      </Box>
    </Container>
  );
};

export default MainGame;