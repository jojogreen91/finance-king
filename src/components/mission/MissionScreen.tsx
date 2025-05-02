import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Button, 
  Stepper, 
  Step, 
  StepLabel, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel,
  TextField,
  Checkbox,
  FormGroup,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useGame, GamePhase } from '../../contexts/GameContext';
import FinancialStatementViewer from '../analysis/FinancialStatementViewer';


const MissionScreen: React.FC = () => {
  const { 
    currentMission, 
    getCompanyById, 
    setGamePhase, 
    currentAnswers, 
    setAnswer,
    completeMission,
    user
  } = useGame();
  const [activeStep, setActiveStep] = useState(0);
  const [hintsOpen, setHintsOpen] = useState(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [missingAnswers, setMissingAnswers] = useState<string[]>([]);

  if (!currentMission) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>
          미션 정보를 찾을 수 없습니다.
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

  // 미션 관련 회사 불러오기
  const companies = currentMission.companyIds.map(id => getCompanyById(id)).filter(Boolean);
  const currentCompany = companies[0];
  
  if (!currentCompany) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>
          회사 정보를 찾을 수 없습니다.
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

  // 다음 질문으로 이동
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // 이전 질문으로 이동
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // 답변 처리
  const handleSingleChoice = (questionId: string, value: string) => {
    setAnswer(questionId, value);
  };

  const handleMultiChoice = (questionId: string, value: string, checked: boolean) => {
    const currentSelection = currentAnswers[questionId] || [];
    let newSelection;
    
    if (checked) {
      newSelection = [...currentSelection, value];
    } else {
      newSelection = currentSelection.filter((item: string) => item !== value);
    }
    
    setAnswer(questionId, newSelection);
  };

  const handleNumericInput = (questionId: string, value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setAnswer(questionId, numericValue);
    } else if (value === '') {
      setAnswer(questionId, '');
    }
  };

  const handleTextInput = (questionId: string, value: string) => {
    setAnswer(questionId, value);
  };

  // 미션 제출 처리
  const handleSubmitMission = () => {
    // 모든 질문에 답변했는지 확인
    const unansweredQuestions = currentMission.questions
      .filter(q => !currentAnswers[q.id] || 
        (Array.isArray(currentAnswers[q.id]) && currentAnswers[q.id].length === 0))
      .map(q => q.id);
    
    if (unansweredQuestions.length > 0) {
      setMissingAnswers(unansweredQuestions);
      return;
    }
    
    setSubmitDialogOpen(true);
  };

  // 미션 완료 처리
  const handleFinishMission = () => {
    // 정답 확인 및 점수 계산
    let totalPoints = 0;
    let earnedPoints = 0;
    
    currentMission.questions.forEach(question => {
      totalPoints += question.points;
      
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
      }
    });
    
    // 모든 질문에 정답을 맞춰야 성공
    const success = earnedPoints === totalPoints; // 모든 질문 맞춰야 성공
    
    // 미션 완료 처리
    completeMission(currentMission.id, success, earnedPoints);
  };

  // 현재 질문
  const currentQuestion = currentMission.questions[activeStep];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 상단 헤더 */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => setGamePhase(GamePhase.MISSION_SELECT)}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentMission.title}
          </Typography>
        </Box>
      </Box>

      {/* 진행 상태 표시 */}
      <Box sx={{ px: 3, pt: 3, bgcolor: 'background.paper' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {currentMission.questions.map((question, index) => (
            <Step key={question.id}>
              <StepLabel>질문 {index + 1}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* 메인 콘텐츠 - 두 컬럼 레이아웃 */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          {/* 왼쪽: 재무제표 */}
          <Grid item xs={12} md={7} lg={8} sx={{ height: '100%' }}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', overflow: 'auto' }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" gutterBottom>
                  {currentCompany.name} 재무제표
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentCompany.description}
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              <FinancialStatementViewer company={currentCompany} />
            </Paper>
          </Grid>
          
          {/* 오른쪽: 질문 */}
          <Grid item xs={12} md={5} lg={4} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Paper elevation={3} sx={{ p: 3, mb: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h5" gutterBottom>
                  질문 {activeStep + 1}: {currentQuestion.text}
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ my: 2, flexGrow: 1 }}>
                {/* 어드민 계정인 경우 정답 표시 */}
                {user?.isAdmin && (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="subtitle2">정답: </Typography>
                    {Array.isArray(currentQuestion.correctAnswer) 
                      ? currentQuestion.correctAnswer.join(", ")
                      : String(currentQuestion.correctAnswer)
                    }
                  </Alert>
                )}
                
                {/* 질문 유형에 따른 UI 렌더링 */}
                {currentQuestion.type === 'SINGLE_CHOICE' && (
                  <FormControl component="fieldset" sx={{ width: '100%' }}>
                    <FormLabel component="legend">답변 선택</FormLabel>
                    <RadioGroup
                      value={currentAnswers[currentQuestion.id] || ''}
                      onChange={(e) => handleSingleChoice(currentQuestion.id, e.target.value)}
                    >
                      {currentQuestion.options?.map((option, index) => (
                        <FormControlLabel
                          key={index}
                          value={option}
                          control={<Radio />}
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
                
                {currentQuestion.type === 'MULTI_CHOICE' && (
                  <FormControl component="fieldset" sx={{ width: '100%' }}>
                    <FormLabel component="legend">해당하는 항목 모두 선택 (복수 선택 가능)</FormLabel>
                    <FormGroup>
                      {currentQuestion.options?.map((option, index) => (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              checked={(currentAnswers[currentQuestion.id] || []).includes(option)}
                              onChange={(e) => handleMultiChoice(currentQuestion.id, option, e.target.checked)}
                            />
                          }
                          label={option}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                )}
                
                {currentQuestion.type === 'NUMERIC' && (
                  <FormControl fullWidth>
                    <FormLabel component="legend">숫자 입력</FormLabel>
                    <TextField
                      type="number"
                      value={currentAnswers[currentQuestion.id] || ''}
                      onChange={(e) => handleNumericInput(currentQuestion.id, e.target.value)}
                      InputProps={{ 
                        inputProps: { 
                          step: "0.01"
                        } 
                      }}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />
                  </FormControl>
                )}
                
                {currentQuestion.type === 'TEXT' && (
                  <FormControl fullWidth>
                    <FormLabel component="legend">답변 입력</FormLabel>
                    <TextField
                      value={currentAnswers[currentQuestion.id] || ''}
                      onChange={(e) => handleTextInput(currentQuestion.id, e.target.value)}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      multiline
                      rows={4}
                    />
                  </FormControl>
                )}
              </Box>
              
              {missingAnswers.includes(currentQuestion.id) && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  이 질문에 대한 답변을 입력해주세요.
                </Alert>
              )}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto', pt: 2 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  이전 질문
                </Button>
                
                <Box>
                  {/* 어드민 계정을 위한 자동 입력 버튼 */}
                  {user?.isAdmin && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setAnswer(currentQuestion.id, currentQuestion.correctAnswer)}
                      sx={{ mr: 1 }}
                    >
                      정답 입력
                    </Button>
                  )}
                  
                  {activeStep < currentMission.questions.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                    >
                      다음 질문
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmitMission}
                    >
                      분석 제출하기
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
            
            <Paper elevation={2} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  {activeStep + 1} / {currentMission.questions.length} 질문
                </Typography>
                <Box sx={{ width: '60%', mx: 2 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={(activeStep + 1) / currentMission.questions.length * 100} 
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {Math.round((activeStep + 1) / currentMission.questions.length * 100)}%
                </Typography>
              </Box>
              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<HelpOutlineIcon />}
                onClick={() => setHintsOpen(true)}
                sx={{ mt: 2 }}
              >
                힌트 보기
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* 힌트 다이얼로그 */}
      <Dialog
        open={hintsOpen}
        onClose={() => setHintsOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>분석 힌트</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            재무 분석에 도움이 될 수 있는 힌트입니다:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            {currentMission.hints.map((hint, index) => (
              <Box component="li" key={index} sx={{ mb: 1 }}>
                <Typography variant="body2">{hint}</Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHintsOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>

      {/* 제출 확인 다이얼로그 */}
      <Dialog
        open={submitDialogOpen}
        onClose={() => setSubmitDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>분석 제출 확인</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            분석 결과를 제출하시겠습니까?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            한 번 제출한 분석은 수정할 수 없습니다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubmitDialogOpen(false)}>취소</Button>
          <Button 
            onClick={handleFinishMission} 
            variant="contained"
            color="primary"
          >
            제출하기
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MissionScreen;