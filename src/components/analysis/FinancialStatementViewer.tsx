import React, { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  Grid,
  Divider,
  Card,
  CardContent
} from '@mui/material';
import { Company, calculateFinancialRatios } from '../../data/financialData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`financial-tabpanel-${index}`}
      aria-labelledby={`financial-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// 통화 형식 함수 (백만원 단위)
function formatCurrency(value: number): string {
  // 백만원 단위로 변환
  const millionValue = value / 1000000;
  return new Intl.NumberFormat('ko-KR', { 
    style: 'decimal',
    maximumFractionDigits: 1,
    minimumFractionDigits: 0
  }).format(millionValue);
}

// 비율 형식 함수
function formatRatio(value: number): string {
  return value.toFixed(2);
}

// 백분율 형식 함수
function formatPercent(value: number): string {
  return (value * 100).toFixed(2) + '%';
}

// 아스키 아트 바 차트 생성
function createAsciiBarChart(data: { label: string, value: number }[], maxWidth = 50) {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return data.map((item, index) => {
    const barLength = Math.round((item.value / maxValue) * maxWidth);
    const bar = '█'.repeat(barLength);
    
    return (
      <Box key={index} sx={{ fontFamily: 'monospace', whiteSpace: 'pre', mb: 1 }}>
        <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{item.label.padEnd(15, ' ')}</span>
          <span>{item.value.toLocaleString().padStart(12, ' ')}</span>
        </Typography>
        <Typography variant="body2" color="primary">
          {bar || '▏'} 
        </Typography>
      </Box>
    );
  });
}

// 아스키 아트 원형 차트 (단순 표현)
function createAsciiPieChart(data: { label: string, value: number }[]) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <Box sx={{ fontFamily: 'monospace', whiteSpace: 'pre', textAlign: 'center', mb: 3 }}>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {`    .-"-.    `}<br />
        {`  .'     \`.  `}<br />
        {` /         \\ `}<br />
        {`|           |`}<br />
        {` \\         / `}<br />
        {`  \`._____.'  `}<br />
      </Typography>
      <Box sx={{ mt: 2 }}>
        {data.map((item, index) => (
          <Typography key={index} variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{item.label.padEnd(15, ' ')}</span>
            <span>{formatPercent(item.value / total)}</span>
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

interface FinancialStatementViewerProps {
  company: Company;
}

const FinancialStatementViewer: React.FC<FinancialStatementViewerProps> = ({ company }) => {
  const [tabValue, setTabValue] = useState(0);
  const [yearIndex, setYearIndex] = useState(company.financialStatements.length - 1); // 가장 최신 재무제표

  // 최신 재무제표 가져오기
  const financialStatement = company.financialStatements[yearIndex];
  const ratios = calculateFinancialRatios(financialStatement);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // 재무상태표 데이터
  const balanceSheetData = [
    { label: '자산', value: ratios.totalAssets },
    { label: '부채', value: ratios.totalLiabilities },
    { label: '자본', value: ratios.totalEquity }
  ];

  // 손익계산서 데이터
  const incomeStatementData = [
    { label: '매출', value: financialStatement.incomeStatement.revenue },
    { label: '매출원가', value: financialStatement.incomeStatement.costOfRevenue },
    { label: '매출총이익', value: financialStatement.incomeStatement.grossProfit },
    { label: '영업이익', value: financialStatement.incomeStatement.operatingIncome },
    { label: '당기순이익', value: financialStatement.incomeStatement.netIncome }
  ];

  // 수익성 비율 데이터
  const profitabilityData = [
    { label: '매출총이익률', value: ratios.grossProfitMargin },
    { label: '영업이익률', value: ratios.operatingProfitMargin },
    { label: '순이익률', value: ratios.netProfitMargin },
    { label: '자산수익률(ROA)', value: ratios.returnOnAssets },
    { label: '자본수익률(ROE)', value: ratios.returnOnEquity }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* 회사 정보 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {company.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          업종: {company.industry}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {company.description}
        </Typography>
      </Box>

      {/* 재무제표 기간 정보 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          {financialStatement.year}년 {financialStatement.quarter}분기 재무제표
        </Typography>
      </Box>

      {/* 재무제표 탭 */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="financial statement tabs">
          <Tab label="재무상태표" />
          <Tab label="손익계산서" />
          <Tab label="현금흐름표" />
          <Tab label="재무비율" />
          <Tab label="시각화" />
        </Tabs>
      </Box>

      {/* 재무상태표 탭 */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h6" gutterBottom>재무상태표</Typography>
        <TableContainer component={Paper} sx={{ maxHeight: 600, overflow: 'auto' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>항목</TableCell>
                <TableCell align="right">금액 (백만원)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell>자산</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow sx={{ '& > td': { fontWeight: 'bold', pl: 4 } }}>
                <TableCell>유동자산</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 6 }}>현금</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.assets.currentAssets.cash)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 6 }}>단기투자자산</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.assets.currentAssets.shortTermInvestments)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 6 }}>매출채권</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.assets.currentAssets.receivables)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 6 }}>재고자산</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.assets.currentAssets.inventory)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 6 }}>기타유동자산</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.assets.currentAssets.otherCurrentAssets)}</TableCell>
              </TableRow>
              
              <TableRow sx={{ '& > td': { fontWeight: 'bold', pl: 4 } }}>
                <TableCell>비유동자산</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 6 }}>유형자산</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.assets.nonCurrentAssets.propertyPlantEquipment)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 6 }}>무형자산</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.assets.nonCurrentAssets.intangibleAssets)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 6 }}>장기투자자산</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.assets.nonCurrentAssets.longTermInvestments)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 6 }}>기타비유동자산</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.assets.nonCurrentAssets.otherNonCurrentAssets)}</TableCell>
              </TableRow>
              
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell>자산총계</TableCell>
                <TableCell align="right">{formatCurrency(ratios.totalAssets)}</TableCell>
              </TableRow>
              
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell>부채</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow sx={{ '& > td': { fontWeight: 'bold', pl: 4 } }}>
                <TableCell>유동부채</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 6 }}>매입채무</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.liabilities.currentLiabilities.accountsPayable)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 6 }}>단기차입금</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.liabilities.currentLiabilities.shortTermDebt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 6 }}>기타유동부채</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.liabilities.currentLiabilities.otherCurrentLiabilities)}</TableCell>
              </TableRow>
              
              <TableRow sx={{ '& > td': { fontWeight: 'bold', pl: 4 } }}>
                <TableCell>비유동부채</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 6 }}>장기차입금</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.liabilities.nonCurrentLiabilities.longTermDebt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 6 }}>기타비유동부채</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.liabilities.nonCurrentLiabilities.otherNonCurrentLiabilities)}</TableCell>
              </TableRow>
              
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell>부채총계</TableCell>
                <TableCell align="right">{formatCurrency(ratios.totalLiabilities)}</TableCell>
              </TableRow>
              
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell>자본</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>자본금</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.equity.commonStock)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>이익잉여금</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.equity.retainedEarnings)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>자기주식</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.equity.treasuryStock)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>기타자본</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.balanceSheet.equity.otherEquity)}</TableCell>
              </TableRow>
              
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell>자본총계</TableCell>
                <TableCell align="right">{formatCurrency(ratios.totalEquity)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* 손익계산서 탭 */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom>손익계산서</Typography>
        <TableContainer component={Paper} sx={{ maxHeight: 600, overflow: 'auto' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>항목</TableCell>
                <TableCell align="right">금액 (백만원)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>매출액</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.incomeStatement.revenue)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>매출원가</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.incomeStatement.costOfRevenue)}</TableCell>
              </TableRow>
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell>매출총이익</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.incomeStatement.grossProfit)}</TableCell>
              </TableRow>
              
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell>영업비용</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>연구개발비</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.incomeStatement.operatingExpenses.researchAndDevelopment)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>판매관리비</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.incomeStatement.operatingExpenses.sellingGeneralAdministrative)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>기타영업비용</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.incomeStatement.operatingExpenses.otherOperatingExpenses)}</TableCell>
              </TableRow>
              
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell>영업이익</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.incomeStatement.operatingIncome)}</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell>영업외손익</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.incomeStatement.nonOperatingIncome)}</TableCell>
              </TableRow>
              
              {financialStatement.incomeStatement.interestExpense && (
                <TableRow>
                  <TableCell sx={{ pl: 4 }}>이자비용</TableCell>
                  <TableCell align="right">{formatCurrency(financialStatement.incomeStatement.interestExpense)}</TableCell>
                </TableRow>
              )}
              
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell>세전이익</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.incomeStatement.incomeBeforeTax)}</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell>법인세</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.incomeStatement.incomeTax)}</TableCell>
              </TableRow>
              
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell>당기순이익</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.incomeStatement.netIncome)}</TableCell>
              </TableRow>
              
              {financialStatement.incomeStatement.depreciation && (
                <TableRow>
                  <TableCell>감가상각비</TableCell>
                  <TableCell align="right">{formatCurrency(financialStatement.incomeStatement.depreciation)}</TableCell>
                </TableRow>
              )}
              
              {financialStatement.incomeStatement.amortization && (
                <TableRow>
                  <TableCell>무형자산상각비</TableCell>
                  <TableCell align="right">{formatCurrency(financialStatement.incomeStatement.amortization)}</TableCell>
                </TableRow>
              )}
              
              {ratios.EBITDA && (
                <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                  <TableCell>EBITDA</TableCell>
                  <TableCell align="right">{formatCurrency(ratios.EBITDA)}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* 현금흐름표 탭 */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" gutterBottom>현금흐름표</Typography>
        <TableContainer component={Paper} sx={{ maxHeight: 600, overflow: 'auto' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>항목</TableCell>
                <TableCell align="right">금액 (백만원)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell>영업활동 현금흐름</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>당기순이익</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.cashFlow.operatingActivities.netIncome)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>감가상각비</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.cashFlow.operatingActivities.depreciation)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>운전자본 변동</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.cashFlow.operatingActivities.changesInWorkingCapital)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>기타 영업활동</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.cashFlow.operatingActivities.otherOperatingActivities)}</TableCell>
              </TableRow>
              
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell>투자활동 현금흐름</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>자본적 지출</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.cashFlow.investingActivities.capitalExpenditures)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>투자자산 변동</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.cashFlow.investingActivities.investments)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>기타 투자활동</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.cashFlow.investingActivities.otherInvestingActivities)}</TableCell>
              </TableRow>
              
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell>재무활동 현금흐름</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>차입금 상환</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.cashFlow.financingActivities.debtPayments)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>배당금 지급</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.cashFlow.financingActivities.dividendsPaid)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>주식발행</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.cashFlow.financingActivities.stockIssuance)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ pl: 4 }}>기타 재무활동</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.cashFlow.financingActivities.otherFinancingActivities)}</TableCell>
              </TableRow>
              
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell>현금의 순증감</TableCell>
                <TableCell align="right">{formatCurrency(financialStatement.cashFlow.netChangeInCash)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* 재무비율 탭 */}
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h6" gutterBottom>재무비율</Typography>
        <TableContainer component={Paper} sx={{ maxHeight: 600, overflow: 'auto' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>비율</TableCell>
                <TableCell align="right">값</TableCell>
                <TableCell>설명</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell colSpan={3}>유동성 비율</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>유동비율</TableCell>
                <TableCell align="right">{formatRatio(ratios.currentRatio)}</TableCell>
                <TableCell>유동자산/유동부채, 기업의 단기채무 지급능력</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>당좌비율</TableCell>
                <TableCell align="right">{formatRatio(ratios.quickRatio)}</TableCell>
                <TableCell>(유동자산-재고자산)/유동부채, 즉각적인 채무상환능력</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>현금비율</TableCell>
                <TableCell align="right">{formatRatio(ratios.cashRatio)}</TableCell>
                <TableCell>현금/유동부채, 즉각적인 채무상환능력</TableCell>
              </TableRow>
              
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell colSpan={3}>수익성 비율</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>매출총이익률</TableCell>
                <TableCell align="right">{formatPercent(ratios.grossProfitMargin)}</TableCell>
                <TableCell>매출총이익/매출액, 제품 수익성</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>영업이익률</TableCell>
                <TableCell align="right">{formatPercent(ratios.operatingProfitMargin)}</TableCell>
                <TableCell>영업이익/매출액, 영업활동 수익성</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>순이익률</TableCell>
                <TableCell align="right">{formatPercent(ratios.netProfitMargin)}</TableCell>
                <TableCell>당기순이익/매출액, 전체 수익성</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>총자산수익률(ROA)</TableCell>
                <TableCell align="right">{formatPercent(ratios.returnOnAssets)}</TableCell>
                <TableCell>당기순이익/총자산, 자산 활용 효율성</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>자기자본수익률(ROE)</TableCell>
                <TableCell align="right">{formatPercent(ratios.returnOnEquity)}</TableCell>
                <TableCell>당기순이익/자기자본, 주주투자 수익성</TableCell>
              </TableRow>
              
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell colSpan={3}>재무구조 비율</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>부채비율</TableCell>
                <TableCell align="right">{formatPercent(ratios.debtToEquityRatio)}</TableCell>
                <TableCell>총부채/자기자본, 재무 레버리지</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>부채비중</TableCell>
                <TableCell align="right">{formatPercent(ratios.debtToAssetsRatio)}</TableCell>
                <TableCell>총부채/총자산, 타인자본 의존도</TableCell>
              </TableRow>
              {ratios.interestCoverageRatio && (
                <TableRow>
                  <TableCell>이자보상배율</TableCell>
                  <TableCell align="right">{formatRatio(ratios.interestCoverageRatio)}</TableCell>
                  <TableCell>영업이익/이자비용, 이자비용 부담능력</TableCell>
                </TableRow>
              )}
              
              <TableRow sx={{ '& > td': { fontWeight: 'bold' } }}>
                <TableCell colSpan={3}>활동성 비율</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>총자산회전율</TableCell>
                <TableCell align="right">{formatRatio(ratios.assetTurnover)}</TableCell>
                <TableCell>매출액/총자산, 자산 활용 효율성</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>재고자산회전율</TableCell>
                <TableCell align="right">{formatRatio(ratios.inventoryTurnover)}</TableCell>
                <TableCell>매출원가/재고자산, 재고 관리 효율성</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>매출채권회전율</TableCell>
                <TableCell align="right">{formatRatio(ratios.receivablesTurnover)}</TableCell>
                <TableCell>매출액/매출채권, 채권 회수 효율성</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* 시각화 탭 */}
      <TabPanel value={tabValue} index={4}>
        <Typography variant="h6" gutterBottom>재무제표 시각화</Typography>
        <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>재무상태표</Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    자산, 부채, 자본 구성
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {createAsciiBarChart(balanceSheetData)}
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>손익계산서</Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    매출 및 이익 구성
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {createAsciiBarChart(incomeStatementData)}
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>수익성 비율</Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    수익성 지표 분석
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                    <Box sx={{ flex: 1 }}>
                      {createAsciiBarChart(profitabilityData.map(item => ({ 
                        ...item, 
                        value: item.value * 100 
                      })))}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      {createAsciiPieChart(profitabilityData.map(item => ({ 
                        ...item, 
                        value: item.value
                      })))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default FinancialStatementViewer;