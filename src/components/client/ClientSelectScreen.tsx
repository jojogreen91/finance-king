import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Avatar, 
  Chip,
  IconButton,
  Divider,
  AppBar,
  Toolbar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GavelIcon from '@mui/icons-material/Gavel';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useGame, GamePhase } from '../../contexts/GameContext';
import { ClientType } from '../../data/gameModels';

const ClientSelectScreen: React.FC = () => {
  const { availableClients, setGamePhase, user, gamePhase } = useGame();

  if (!user) return null;

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

  // 미션 선택 화면으로 이동
  const handleClientSelect = (clientId: string) => {
    // 현재는 단순히 MISSION_SELECT 단계로 이동
    // 추후에는 선택한 클라이언트 ID를 저장하여 해당 클라이언트의 미션만 표시하도록 개선
    setGamePhase(GamePhase.MISSION_SELECT);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 상단 헤더 */}
      <AppBar position="static">
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => setGamePhase(GamePhase.OFFICE)}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            클라이언트 선택
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {user.name} | 레벨: {user.level} | 💰 {user.money.toLocaleString()}원
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 클라이언트 목록 */}
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f8fa', overflowY: 'auto' }}>
        <Container>
          <Typography variant="h5" gutterBottom>
            의뢰 가능한 클라이언트
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            아래 클라이언트 중 하나를 선택하여 의뢰를 받으세요. 각 클라이언트는 서로 다른 유형의 재무 분석 의뢰를 요청합니다.
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Grid container spacing={3}>
            {availableClients.map((client) => {
              const typeInfo = getClientTypeInfo(client.type);
              
              return (
                <Grid item xs={12} sm={6} md={4} key={client.id}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar 
                          sx={{ bgcolor: `${typeInfo.color}.main`, mr: 2 }}
                        >
                          {typeInfo.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" component="div">
                            {client.name}
                          </Typography>
                          <Chip 
                            size="small"
                            label={typeInfo.label}
                            color={typeInfo.color as any}
                            sx={{ height: 24 }}
                          />
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {client.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small" 
                        variant="contained"
                        fullWidth
                        onClick={() => handleClientSelect(client.id)}
                      >
                        의뢰 확인하기
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          
          {availableClients.length === 0 && (
            <Box sx={{ 
              py: 10, 
              textAlign: 'center',
              border: '1px dashed',
              borderColor: 'divider',
              borderRadius: 2
            }}>
              <Typography variant="h6" color="text.secondary">
                현재 레벨에서 이용 가능한 클라이언트가 없습니다.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                레벨을 올려서 더 많은 클라이언트를 만나보세요.
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
  );
};

export default ClientSelectScreen;