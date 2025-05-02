import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Button, 
  Grid, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  Chip, 
  Card, 
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Collapse
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import { useGame, GamePhase } from '../../contexts/GameContext';
import CharacterDialog from '../common/CharacterDialog';
import { CHARACTERS, ASSISTANT_DIALOGS } from '../../data/characters';

const MissionResultScreen: React.FC = () => {
  const { user, gamePhase, setGamePhase, missions, currentAnswers, setAnswer, lastCompletedMissionId } = useGame();
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [success, setSuccess] = useState(false);
  const [levelUp, setLevelUp] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState<{ questionId: string, explanation: string }>({
    questionId: '',
    explanation: ''
  });
  
  // 비서 캐릭터 대화 관련 상태
  const [assistantMessage, setAssistantMessage] = useState<React.ReactNode>('');

  // 디버깅
  console.log("MissionResultScreen: Last completed mission ID:", lastCompletedMissionId);
  console.log("MissionResultScreen: User completed missions:", user?.completedMissions);
  
  // 완료한 미션 불러오기 (직접 lastCompletedMissionId 사용)
  const completedMission = missions.find(m => m.id === lastCompletedMissionId);

  useEffect(() => {
    if (completedMission) {
      // 점수 계산
      let earnedPoints = 0;
      let maxPoints = 0;
      let correctCount = 0;
      
      completedMission.questions.forEach(question => {
        maxPoints += question.points;
        
        const userAnswer = currentAnswers[question.id];
        const correctAnswer = question.correctAnswer;
        
        // 정답 비교
        let isCorrect = false;
        
        if (Array.isArray(correctAnswer) && Array.isArray(userAnswer)) {
          // 다중 선택 비교 (순서 무관)
          isCorrect = 
            correctAnswer.length === userAnswer.length && 
            correctAnswer.every(ans => userAnswer.includes(ans));
        } else {
          // 단일 선택, 숫자, 텍스트 비교
          isCorrect = userAnswer === correctAnswer;
        }
        
        if (isCorrect) {
          earnedPoints += question.points;
          correctCount++;
        }
      });
      
      setScore(earnedPoints);
      setTotalPoints(maxPoints);
      
      // 모든 질문에 정답을 맞춰야 성공 
      const missionSuccess = earnedPoints === maxPoints; // 모든 질문 맞춰야 성공
      setSuccess(missionSuccess);
      
      // 콘솔에 결과 기록 (디버깅용)
      console.log(`Mission completed: ${completedMission.title}`);
      const scorePercentage = (earnedPoints / maxPoints) * 100; // 로깅 용도로만 계산
      console.log(`Score: ${earnedPoints}/${maxPoints} (${scorePercentage.toFixed(2)}%)`);
      console.log(`Correct answers: ${correctCount}/${completedMission.questions.length}`);
      console.log(`Success: ${missionSuccess ? 'Yes' : 'No'}`);
      
      // 레벨업 확인
      const previousLevel = user?.level || 1;
      const currentLevel = user?.level || 1;
      const didLevelUp = currentLevel > previousLevel;
      
      if (didLevelUp) {
        setLevelUp(true);
        console.log(`Level up! ${previousLevel} -> ${currentLevel}`);
      }
      
      // 비서 메시지 설정
      const message = (
        <>
          {missionSuccess ? (
            <Typography paragraph>
              <b>축하합니다!</b> 의뢰를 성공적으로 완료했어요. {completedMission.reward.money.toLocaleString()}원의 보수와 {completedMission.reward.experience} 경험치를 획득했습니다.
            </Typography>
          ) : (
            <Typography paragraph>
              아쉽게도 의뢰 달성에 실패했어요. 하지만 걱정하지 마세요. 다음 기회에 더 잘할 수 있을 거예요!
            </Typography>
          )}
          
          {didLevelUp && (
            <Typography paragraph sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              레벨이 올랐어요! 이제 더 다양한 의뢰를 받을 수 있게 되었습니다.
            </Typography>
          )}
          
          <Typography>
            사무실로 돌아가서 다음 의뢰를 확인해보세요.
          </Typography>
        </>
      );
      
      setAssistantMessage(message);
      
    } else {
      // 완료된 미션이 없는 경우 (비정상적인 상황)
      console.error("No completed mission found!");
    }
    // 비서 메시지는 항상 표시
  }, [completedMission, currentAnswers, user]);

  // 정답 설명 표시 (정답인 경우에만 제공)
  const handleShowExplanation = (questionId: string, explanation: string) => {
    // 정답인 문항만 설명을 표시
    const question = completedMission?.questions.find(q => q.id === questionId);
    const userAnswer = currentAnswers[questionId];
    let isCorrect = false;
    
    if (question) {
      const correctAnswer = question.correctAnswer;
      if (Array.isArray(correctAnswer) && Array.isArray(userAnswer)) {
        isCorrect = correctAnswer.length === userAnswer.length && 
          correctAnswer.every(ans => userAnswer.includes(ans));
      } else {
        isCorrect = userAnswer === correctAnswer;
      }
    }
    
    // 정답인 경우에만 설명 표시
    if (isCorrect) {
      setCurrentExplanation({ questionId, explanation });
      setShowExplanation(true);
    }
  };

  if (!completedMission) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>
          결과 정보를 찾을 수 없습니다.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => setGamePhase(GamePhase.OFFICE)}
        >
          사무실로 돌아가기
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 상단 헤더 및 결과 요약 */}
      <Box 
        sx={{ 
          p: 4, 
          bgcolor: success ? 'success.light' : 'warning.light', 
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" gutterBottom>
          {success ? '의뢰 완료' : '의뢰 실패'}
        </Typography>
        <Typography variant="h5">
          점수: {score} / {totalPoints} ({Math.round((score / totalPoints) * 100)}%)
        </Typography>
        
        {levelUp && (
          <Box sx={{ mt: 2 }}>
            <Chip 
              icon={<EmojiEventsIcon />} 
              label="레벨 업!" 
              color="primary" 
              variant="filled" 
              sx={{ 
                bgcolor: 'primary.dark', 
                color: 'white', 
                fontSize: '1rem', 
                py: 2,
                px: 1
              }} 
            />
          </Box>
        )}
      </Box>

      {/* 메인 콘텐츠 */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3, position: 'relative' }}>
        {/* 비서 캐릭터 대화창 - 항상 표시 */}
        <Box sx={{ 
          position: 'absolute', 
          bottom: 80, 
          right: 40, 
          zIndex: 10, 
          maxWidth: '500px',
          width: '100%'
        }}>
          <CharacterDialog
            character={{...CHARACTERS.ASSISTANT, position: 'right'}}
            message={assistantMessage}
            showContinueButton={false}
          />
        </Box>
        <Container maxWidth="md">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  {completedMission.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {completedMission.description}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    보상
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            획득 금액
                          </Typography>
                          <Typography variant="h5" color="success.main">
                            {success ? completedMission.reward.money.toLocaleString() : 0}원
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            획득 경험치
                          </Typography>
                          <Typography variant="h5" color="primary.main">
                            {success ? completedMission.reward.experience : 0} XP
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom>
                  문항별 정답 확인
                </Typography>
                <List>
                  {completedMission.questions.map((question, index) => {
                    const userAnswer = currentAnswers[question.id];
                    const correctAnswer = question.correctAnswer;
                    
                    // 정답 비교
                    let isCorrect = false;
                    if (Array.isArray(correctAnswer) && Array.isArray(userAnswer)) {
                      isCorrect = 
                        correctAnswer.length === userAnswer.length && 
                        correctAnswer.every(ans => userAnswer.includes(ans));
                    } else {
                      isCorrect = userAnswer === correctAnswer;
                    }
                    
                    // 표시할 답변 텍스트
                    let answerDisplay = '';
                    if (Array.isArray(userAnswer)) {
                      answerDisplay = userAnswer.join(', ');
                    } else {
                      answerDisplay = userAnswer ? userAnswer.toString() : '(답변 없음)';
                    }
                    
                    return (
                      <ListItem 
                        key={question.id}
                        secondaryAction={
                          isCorrect ? (
                            <IconButton 
                              edge="end" 
                              onClick={() => handleShowExplanation(question.id, question.explanation)}
                            >
                              <HelpOutlineIcon />
                            </IconButton>
                          ) : null
                        }
                        sx={{ 
                          bgcolor: isCorrect ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 0, 0, 0.05)',
                          mb: 1,
                          borderRadius: 1
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {isCorrect ? 
                                <CheckCircleIcon color="success" sx={{ mr: 1 }} /> : 
                                <CancelIcon color="error" sx={{ mr: 1 }} />
                              }
                              <Typography variant="subtitle1">
                                {`질문 ${index + 1}: ${question.text}`}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" component="span" sx={{ display: 'block', mt: 1 }}>
                                <strong>나의 답변:</strong> {answerDisplay}
                              </Typography>
                              {/* 정답은 표시하지 않음 */}
                            </>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 하단 액션 버튼 */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
        <Button 
          variant="contained" 
          startIcon={<HomeIcon />} 
          onClick={() => {
            // 돌아가기 전에 답변 데이터 초기화
            if (completedMission) {
              completedMission.questions.forEach(q => {
                setAnswer(q.id, undefined);
              });
            }
            setGamePhase(GamePhase.OFFICE);
          }}
          size="large"
        >
          사무실로 돌아가기
        </Button>
      </Box>

      {/* 정답 설명 다이얼로그 */}
      <Dialog
        open={showExplanation}
        onClose={() => setShowExplanation(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>정답 설명</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {currentExplanation.explanation}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowExplanation(false)}>닫기</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MissionResultScreen;