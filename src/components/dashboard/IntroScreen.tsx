import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Paper, 
  Container, 
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useGame } from '../../contexts/GameContext';

const IntroScreen: React.FC = () => {
  const { startNewGame } = useGame();
  const [userName, setUserName] = useState('');
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [nameError, setNameError] = useState('');

  const handleStartGame = () => {
    setShowNameDialog(true);
  };

  const handleNameSubmit = () => {
    if (!userName.trim()) {
      setNameError('이름을 입력해주세요.');
      return;
    }
    
    startNewGame(userName);
    setShowNameDialog(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'background.paper',
        p: 4
      }}
    >
      <Container maxWidth="md">
        <Paper 
          elevation={6} 
          sx={{ 
            p: 5, 
            borderRadius: 2,
            backgroundColor: 'background.paper'
          }}
        >
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} textAlign="center">
              <Box 
                component="pre"
                sx={{ 
                  fontFamily: 'monospace', 
                  fontSize: { xs: '6px', sm: '10px', md: '14px' },
                  color: 'primary.main',
                  mb: 2,
                  lineHeight: 1,
                  mx: 'auto',
                  textAlign: 'center',
                  display: 'inline-block',
                  maxWidth: '100%',
                  overflow: 'auto'
                }}
              >
███████╗██╗███╗   ██╗ █████╗ ███╗   ██╗ ██████╗███████╗    ██╗  ██╗██╗███╗   ██╗ ██████╗ 
██╔════╝██║████╗  ██║██╔══██╗████╗  ██║██╔════╝██╔════╝    ██║ ██╔╝██║████╗  ██║██╔════╝ 
█████╗  ██║██╔██╗ ██║███████║██╔██╗ ██║██║     █████╗      █████╔╝ ██║██╔██╗ ██║██║  ███╗
██╔══╝  ██║██║╚██╗██║██╔══██║██║╚██╗██║██║     ██╔══╝      ██╔═██╗ ██║██║╚██╗██║██║   ██║
██║     ██║██║ ╚████║██║  ██║██║ ╚████║╚██████╗███████╗    ██║  ██╗██║██║ ╚████║╚██████╔╝
╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝╚══════╝    ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
              </Box>
              <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                재무제표 분석 마스터
              </Typography>
              <Typography variant="h5" gutterBottom color="text.secondary">
                회계사가 되어 재무제표를 분석하고 고객들에게 전문적인 조언을 제공하세요
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  게임 소개
                </Typography>
                <Typography paragraph>
                  당신은 새내기 회계사로서 다양한 고객들의 재무 분석 의뢰를 수행하게 됩니다.
                  처음에는 간단한 수익성 분석부터 시작하여, 점점 복잡한 기업 인수 타당성 분석까지 도전해보세요.
                </Typography>
                <Typography paragraph>
                  성공적인 분석을 통해 경험치와 보수를 얻고, 더 높은 레벨의 의뢰를 수행할 수 있습니다.
                  사무실도 점점 업그레이드하며 전문 회계사로 성장해보세요!
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  주요 기능
                </Typography>
                <ul>
                  <li>
                    <Typography paragraph>
                      <b>재무제표 분석:</b> 기업의 재무상태표, 손익계산서, 현금흐름표를 분석하세요
                    </Typography>
                  </li>
                  <li>
                    <Typography paragraph>
                      <b>다양한 미션:</b> 수익성 분석, 안정성 분석, 성장성 분석 등 다양한 미션에 도전하세요
                    </Typography>
                  </li>
                  <li>
                    <Typography paragraph>
                      <b>레벨 시스템:</b> 경험을 쌓아 레벨을 올리고 더 복잡한 미션에 도전하세요
                    </Typography>
                  </li>
                  <li>
                    <Typography paragraph>
                      <b>사무실 업그레이드:</b> 성공적인 미션 수행으로 얻은 보수로 사무실을 업그레이드하세요
                    </Typography>
                  </li>
                </ul>
              </Box>
            </Grid>
            
            <Grid item xs={12} textAlign="center">
              <Button 
                variant="contained" 
                size="large" 
                onClick={handleStartGame}
                sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }}
              >
                게임 시작하기
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      
      {/* 이름 입력 다이얼로그 */}
      <Dialog open={showNameDialog} onClose={() => setShowNameDialog(false)}>
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
          <Button onClick={handleNameSubmit} variant="contained">시작하기</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IntroScreen;