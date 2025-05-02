import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Avatar,
  Fade
} from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

interface CharacterDialogProps {
  character: {
    name: string;
    avatar: string;
    position?: 'left' | 'right';
  };
  message: string | React.ReactNode;
  onContinue?: () => void;
  continueText?: string;
  showContinueButton?: boolean;
}

const CharacterDialog: React.FC<CharacterDialogProps> = ({ 
  character, 
  message, 
  onContinue, 
  continueText = '계속',
  showContinueButton = true
}) => {
  return (
    <Fade in={true}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          width: '100%', 
          mb: 2
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: character.position === 'right' ? 'row-reverse' : 'row',
            alignItems: 'flex-end',
            mb: 1
          }}
        >
          <Avatar 
            sx={{ 
              width: 64, 
              height: 64, 
              border: '2px solid',
              borderColor: 'primary.main',
              boxShadow: 2,
              bgcolor: 'primary.main',
              mr: character.position === 'right' ? 0 : 2,
              ml: character.position === 'right' ? 2 : 0
            }}
          >
            <SupportAgentIcon fontSize="large" />
          </Avatar>
          <Box 
            sx={{ 
              backgroundColor: 'primary.main',
              color: 'white',
              py: 0.5,
              px: 2,
              borderRadius: 1,
              maxWidth: 'fit-content'
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {character.name}
            </Typography>
          </Box>
        </Box>
        
        <Paper 
          elevation={3} 
          sx={{ 
            p: 2,
            borderRadius: 2,
            position: 'relative',
            ml: character.position === 'right' ? 2 : 6,
            mr: character.position === 'right' ? 6 : 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderLeft: '4px solid',
            borderLeftColor: 'primary.main'
          }}
        >
          <Typography variant="body1" sx={{ mb: showContinueButton ? 2 : 0 }}>
            {message}
          </Typography>
          
          {showContinueButton && onContinue && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button 
                onClick={onContinue}
                variant="outlined"
                size="small"
              >
                {continueText}
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </Fade>
  );
};

export default CharacterDialog;