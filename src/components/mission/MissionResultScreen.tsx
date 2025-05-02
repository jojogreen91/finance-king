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
import InfoIcon from '@mui/icons-material/Info';
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

  // 정답 설명 표시 (정답 여부와 관계 없이 제공)
  const handleShowExplanation = (questionId: string, explanation: string) => {
    // 모든 문항에 설명 표시 (정답/오답 모두)
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
    
    // 모든 문항에 설명 제공 (상태에 정답 여부도 저장)
    setCurrentExplanation({ 
      questionId, 
      explanation: explanation + (
        !isCorrect 
          ? "\n\n정답 힌트: " + (completedMission?.hints[0] || "관련 계산식과 재무제표 항목을 다시 확인해보세요.") 
          : ""
      )
    });
    setShowExplanation(true);
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
      {/* 상단 헤더 - 제목만 포함 */}
      <Box 
        sx={{ 
          p: 2, 
          bgcolor: 'primary.main', 
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" gutterBottom>
          의뢰 결과
        </Typography>
      </Box>

      {/* 메인 콘텐츠 */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        flexGrow: 1, 
        position: 'relative',
        overflow: 'hidden' // 전체 컨테이너 오버플로우 제어
      }}>
        {/* 비서 캐릭터 대화창과 결과 요약을 나란히 배치 */}
        <Box 
          sx={{ 
            width: '100%',
            bgcolor: '#f9f9f9',
            borderBottom: '1px solid',
            borderColor: 'divider',
            p: 2,
            mb: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%', 
            maxWidth: '1100px',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3
          }}>
            {/* 결과 요약 */}
            <Paper elevation={2} sx={{ 
              p: 3, 
              bgcolor: success ? 'success.light' : 'warning.light',
              color: '#fff', 
              width: { xs: '100%', md: '60%' },
              borderRadius: 2
            }}>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
                {success ? '의뢰 완료' : '의뢰 실패'}
              </Typography>
              <Typography variant="h6">
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
                      fontSize: '0.9rem', 
                      py: 1,
                      px: 1
                    }} 
                  />
                </Box>
              )}
            </Paper>
            
            {/* 비서 캐릭터 */}
            <Box sx={{ width: { xs: '100%', md: '40%' }, maxWidth: '450px' }}>
              <CharacterDialog
                character={{...CHARACTERS.ASSISTANT, position: 'right'}}
                message={assistantMessage}
                showContinueButton={false}
              />
            </Box>
          </Box>
        </Box>
        
        {/* 스크롤 가능한 메인 콘텐츠 영역 */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3, pb: 5 }}>
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
                            <IconButton 
                              edge="end" 
                              onClick={() => handleShowExplanation(question.id, question.explanation)}
                            >
                              <HelpOutlineIcon />
                            </IconButton>
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
                                {!isCorrect && (
                                  <Typography 
                                    variant="body2" 
                                    component="span" 
                                    sx={{ 
                                      display: 'block', 
                                      mt: 1, 
                                      color: 'error.main',
                                      fontSize: '0.85rem'
                                    }}
                                  >
                                    <strong>힌트:</strong> 설명 버튼을 클릭하여 자세한 정답 힌트를 확인하세요
                                  </Typography>
                                )}
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
      </Box>

      {/* 하단 액션 버튼 */}
      <Box sx={{ 
        p: 2, 
        borderTop: 1, 
        borderColor: 'divider', 
        textAlign: 'center',
        bgcolor: 'background.paper', // 배경색 추가
        position: 'sticky', // 하단에 고정
        bottom: 0,
        zIndex: 2 // 스크롤해도 항상 위에 표시
      }}>
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
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { 
            overflow: 'visible',
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
          }
        }}
      >
        {/* 다이얼로그 헤더 */}
        <DialogTitle 
          sx={{ 
            bgcolor: currentExplanation.explanation.includes('정답 힌트') ? 'warning.main' : 'success.main', 
            color: 'white',
            py: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {currentExplanation.explanation.includes('정답 힌트') ? (
              <>
                <HelpOutlineIcon sx={{ mr: 1.5, fontSize: '1.8rem' }} />
                <Typography variant="h6" component="div">문제 해설 및 정답 힌트</Typography>
              </>
            ) : (
              <>
                <CheckCircleIcon sx={{ mr: 1.5, fontSize: '1.8rem' }} />
                <Typography variant="h6" component="div">정답입니다! 상세 설명</Typography>
              </>
            )}
          </Box>
          <IconButton 
            onClick={() => setShowExplanation(false)} 
            sx={{ color: 'white', ml: 2 }}
            aria-label="닫기"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 5, px: { xs: 3, md: 4 }, pb: 4 }}>
          {/* 상태 메시지 박스 */}
          {!currentExplanation.explanation.includes('정답 힌트') ? (
            <Box sx={{ 
              mb: 4, 
              p: 3, 
              mt: 2,
              bgcolor: 'success.light', 
              color: 'white', 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'success.main',
              boxShadow: '0 2px 10px rgba(0,180,0,0.1)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2
            }}>
              <CheckCircleIcon sx={{ mt: 0.5, fontSize: '2rem' }} />
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  축하합니다! 정확한 재무 분석을 완료하셨습니다.
                </Typography>
                <Typography variant="body1">
                  아래에서 정답에 대한 상세한 설명과 계산 과정을 확인하실 수 있습니다.
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box sx={{ 
              mb: 4, 
              p: 3, 
              mt: 2,
              bgcolor: 'warning.light', 
              color: 'warning.contrastText', 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'warning.main',
              boxShadow: '0 2px 10px rgba(255,180,0,0.1)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2
            }}>
              <HelpOutlineIcon sx={{ mt: 0.5, fontSize: '2rem' }} />
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  아쉽게도 정답이 아닙니다.
                </Typography>
                <Typography variant="body1">
                  아래에서 문제에 대한 상세한 설명과 힌트를 확인하고 다음 번에 도전해보세요.
                </Typography>
              </Box>
            </Box>
          )}
          
          {/* 문제 정보 */}
          {(() => {
            const questionId = currentExplanation.questionId;
            const question = completedMission?.questions.find(q => q.id === questionId);
            
            if (question) {
              return (
                <Box sx={{ 
                  mb: 4, 
                  p: 3,
                  bgcolor: 'background.paper', 
                  border: '1px solid', 
                  borderColor: 'divider',
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <Typography 
                    variant="subtitle1" 
                    fontWeight="bold"
                    gutterBottom
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      color: 'text.primary'
                    }}
                  >
                    <InfoIcon sx={{ mr: 1.5, fontSize: '1.2rem', color: 'primary.main' }} />
                    문제 내용
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mt: 1,
                      pl: 3.5,
                      borderLeft: '3px solid',
                      borderLeftColor: 'primary.light',
                      py: 1
                    }}
                  >
                    {question.text}
                  </Typography>
                </Box>
              );
            }
            return null;
          })()}
          
          {/* 섹션 제목 */}
          <Box sx={{ 
            mb: 3, 
            pb: 1.5,
            borderBottom: '2px solid',
            borderColor: currentExplanation.explanation.includes('정답 힌트') ? 'warning.main' : 'success.main',
            display: 'flex',
            alignItems: 'center'
          }}>
            {currentExplanation.explanation.includes('정답 힌트') ? (
              <InfoIcon sx={{ mr: 1.5, color: 'warning.main', fontSize: '1.3rem' }} />
            ) : (
              <InfoIcon sx={{ mr: 1.5, color: 'success.main', fontSize: '1.3rem' }} />
            )}
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              {currentExplanation.explanation.includes('정답 힌트') ? '문제 설명 및 정답 힌트' : '계산 방법 및 해설'}
            </Typography>
          </Box>
          
          {/* 설명 내용 */}
          <Paper elevation={2} sx={{ 
            p: 3, 
            bgcolor: 'background.paper', 
            border: '1px solid', 
            borderColor: 'divider',
            borderRadius: 2
          }}>
            <Typography 
              variant="body1" 
              component="div" 
              sx={{ 
                whiteSpace: 'pre-line',
                lineHeight: 1.7,
                color: 'text.primary'
              }}
            >
              {currentExplanation.explanation.split('정답 힌트:')[0]}
            </Typography>
            
            {/* 추가 힌트 (오답인 경우만) */}
            {currentExplanation.explanation.includes('정답 힌트') && (
              <Box sx={{ 
                mt: 4, 
                p: 3, 
                borderTop: '1px dashed', 
                borderColor: 'divider',
                bgcolor: 'rgba(255, 244, 229, 0.5)',
                borderRadius: 2
              }}>
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                  color: 'warning.dark'
                }}>
                  <HelpOutlineIcon sx={{ mr: 1.5, fontSize: '1.3rem' }} />
                  정답 힌트
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    pl: 4,
                    borderLeft: '3px solid',
                    borderLeftColor: 'warning.main',
                    py: 1
                  }}
                >
                  {currentExplanation.explanation.split('정답 힌트:')[1]}
                </Typography>
                
                <Box sx={{ 
                  mt: 3, 
                  pt: 2, 
                  px: 2,
                  pb: 2,
                  borderTop: '1px dashed', 
                  borderColor: 'divider',
                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: 1
                }}>
                  <Typography variant="body2" sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 'medium',
                    color: 'text.secondary'
                  }}>
                    <InfoIcon sx={{ mr: 1, color: 'info.main', fontSize: '1rem' }} />
                    도움말
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, pl: 3 }}>
                    재무 분석 문제를 풀 때는 재무제표를 자세히 검토하고, 관련 공식과 계산식을 정확히 적용하는 것이 중요합니다. 
                    다양한 재무 비율의 의미를 이해하고 적절히 해석해보세요.
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>
          
          {/* 재무제표 도움말 연결 */}
          <Box sx={{ 
            mt: 4, 
            p: 3,
            bgcolor: 'primary.light', 
            color: 'primary.contrastText',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <Typography variant="body2">
              더 자세한 재무제표 분석과 관련 지표를 확인하고 싶으신가요?
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              size="small"
              onClick={() => setShowExplanation(false)}
              sx={{ ml: 2, bgcolor: 'primary.dark' }}
            >
              재무제표 보기
            </Button>
          </Box>
        </DialogContent>
        
        {/* 버튼 영역 */}
        <DialogActions sx={{ 
          p: 3, 
          bgcolor: 'background.default', 
          borderTop: '1px solid', 
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Button 
            onClick={() => setShowExplanation(false)} 
            variant="contained" 
            size="large"
            sx={{ 
              px: 4, 
              py: 1.2,
              minWidth: '200px',
              fontWeight: 'bold'
            }}
            color={currentExplanation.explanation.includes('정답 힌트') ? 'warning' : 'success'}
            startIcon={currentExplanation.explanation.includes('정답 힌트') ? 
              <HelpOutlineIcon /> : <CheckCircleIcon />}
          >
            {currentExplanation.explanation.includes('정답 힌트') ? 
              '이해했습니다' : '확인했습니다'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MissionResultScreen;