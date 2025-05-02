import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { GameProvider } from './contexts/GameContext';
import MainGame from './components/MainGame';

// 세련된 블랙 & 화이트 테마 생성
const theme = createTheme({
  typography: {
    fontFamily: [
      '"Noto Sans KR"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#2A2A2A', // 부드러운 검정색을 기본 컬러로
      light: '#505050',
      dark: '#1A1A1A',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#424242', // 어두운 회색을 보조 컬러로
      light: '#6d6d6d',
      dark: '#1b1b1b',
      contrastText: '#ffffff',
    },
    error: {
      main: '#CF6679', // 약간 어두운 핑크 색상
    },
    warning: {
      main: '#B1A296', // 어두운 베이지
    },
    info: {
      main: '#81A4CD', // 어두운 푸른색
    },
    success: {
      main: '#4E937A', // 어두운 초록색
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#121212',
      secondary: '#424242',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 24px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        },
        elevation4: {
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GameProvider>
        <MainGame />
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;