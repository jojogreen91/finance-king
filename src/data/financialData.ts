export interface Company {
  id: string;
  name: string;
  industry: string;
  description: string;
  financialStatements: FinancialStatement[];
}

export interface FinancialStatement {
  year: number;
  quarter: number;
  balanceSheet: BalanceSheet;
  incomeStatement: IncomeStatement;
  cashFlow: CashFlow;
}

export interface BalanceSheet {
  assets: {
    currentAssets: {
      cash: number;
      shortTermInvestments: number;
      receivables: number;
      inventory: number;
      otherCurrentAssets: number;
    };
    nonCurrentAssets: {
      propertyPlantEquipment: number;
      intangibleAssets: number;
      longTermInvestments: number;
      otherNonCurrentAssets: number;
    };
  };
  liabilities: {
    currentLiabilities: {
      accountsPayable: number;
      shortTermDebt: number;
      otherCurrentLiabilities: number;
    };
    nonCurrentLiabilities: {
      longTermDebt: number;
      otherNonCurrentLiabilities: number;
    };
  };
  equity: {
    commonStock: number;
    retainedEarnings: number;
    treasuryStock: number;
    otherEquity: number;
  };
}

export interface IncomeStatement {
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  operatingExpenses: {
    researchAndDevelopment: number;
    sellingGeneralAdministrative: number;
    otherOperatingExpenses: number;
  };
  operatingIncome: number;
  nonOperatingIncome: number;
  interestExpense?: number;
  incomeBeforeTax: number;
  incomeTax: number;
  netIncome: number;
  depreciation?: number;
  amortization?: number;
}

export interface CashFlow {
  operatingActivities: {
    netIncome: number;
    depreciation: number;
    changesInWorkingCapital: number;
    otherOperatingActivities: number;
  };
  investingActivities: {
    capitalExpenditures: number;
    investments: number;
    otherInvestingActivities: number;
  };
  financingActivities: {
    debtPayments: number;
    dividendsPaid: number;
    stockIssuance: number;
    otherFinancingActivities: number;
  };
  netChangeInCash: number;
}

// 재무 비율 계산을 위한 함수들
export const calculateFinancialRatios = (statement: FinancialStatement) => {
  const { balanceSheet, incomeStatement, cashFlow } = statement;
  
  // 총 자산 계산
  const totalCurrentAssets = 
    balanceSheet.assets.currentAssets.cash +
    balanceSheet.assets.currentAssets.shortTermInvestments +
    balanceSheet.assets.currentAssets.receivables +
    balanceSheet.assets.currentAssets.inventory +
    balanceSheet.assets.currentAssets.otherCurrentAssets;
  
  const totalNonCurrentAssets = 
    balanceSheet.assets.nonCurrentAssets.propertyPlantEquipment +
    balanceSheet.assets.nonCurrentAssets.intangibleAssets +
    balanceSheet.assets.nonCurrentAssets.longTermInvestments +
    balanceSheet.assets.nonCurrentAssets.otherNonCurrentAssets;
  
  const totalAssets = totalCurrentAssets + totalNonCurrentAssets;
  
  // 총 부채 계산
  const totalCurrentLiabilities = 
    balanceSheet.liabilities.currentLiabilities.accountsPayable +
    balanceSheet.liabilities.currentLiabilities.shortTermDebt +
    balanceSheet.liabilities.currentLiabilities.otherCurrentLiabilities;
  
  const totalNonCurrentLiabilities = 
    balanceSheet.liabilities.nonCurrentLiabilities.longTermDebt +
    balanceSheet.liabilities.nonCurrentLiabilities.otherNonCurrentLiabilities;
  
  const totalLiabilities = totalCurrentLiabilities + totalNonCurrentLiabilities;
  
  // 총 자본 계산
  const totalEquity = 
    balanceSheet.equity.commonStock +
    balanceSheet.equity.retainedEarnings +
    balanceSheet.equity.treasuryStock +
    balanceSheet.equity.otherEquity;
  
  // EBITDA 계산
  const depreciation = incomeStatement.depreciation || 0;
  const amortization = incomeStatement.amortization || 0;
  const EBITDA = incomeStatement.operatingIncome + depreciation + amortization;
  
  // 이자비용
  const interestExpense = incomeStatement.interestExpense || 
    (incomeStatement.nonOperatingIncome < 0 ? Math.abs(incomeStatement.nonOperatingIncome) : 0);
  
  // 주요 재무 비율 계산
  return {
    // 유동성 비율
    currentRatio: totalCurrentAssets / totalCurrentLiabilities,
    quickRatio: (totalCurrentAssets - balanceSheet.assets.currentAssets.inventory) / totalCurrentLiabilities,
    cashRatio: balanceSheet.assets.currentAssets.cash / totalCurrentLiabilities,
    
    // 수익성 비율
    grossProfitMargin: incomeStatement.grossProfit / incomeStatement.revenue,
    operatingProfitMargin: incomeStatement.operatingIncome / incomeStatement.revenue,
    netProfitMargin: incomeStatement.netIncome / incomeStatement.revenue,
    returnOnAssets: incomeStatement.netIncome / totalAssets,
    returnOnEquity: incomeStatement.netIncome / totalEquity,
    EBITDAMargin: EBITDA / incomeStatement.revenue,
    
    // 안정성 비율
    debtToEquityRatio: totalLiabilities / totalEquity,
    debtToAssetsRatio: totalLiabilities / totalAssets,
    interestCoverageRatio: interestExpense ? incomeStatement.operatingIncome / interestExpense : null,
    
    // 활동성 비율
    assetTurnover: incomeStatement.revenue / totalAssets,
    inventoryTurnover: incomeStatement.costOfRevenue / balanceSheet.assets.currentAssets.inventory,
    receivablesTurnover: incomeStatement.revenue / balanceSheet.assets.currentAssets.receivables,
    
    // 현금흐름 비율
    operatingCashFlowRatio: (cashFlow.operatingActivities.netIncome + 
                             cashFlow.operatingActivities.depreciation + 
                             cashFlow.operatingActivities.changesInWorkingCapital + 
                             cashFlow.operatingActivities.otherOperatingActivities) / totalCurrentLiabilities,
    cashFlowToDebtRatio: (cashFlow.operatingActivities.netIncome + 
                          cashFlow.operatingActivities.depreciation + 
                          cashFlow.operatingActivities.changesInWorkingCapital + 
                          cashFlow.operatingActivities.otherOperatingActivities) / totalLiabilities,
    
    // 기타 유용한 지표
    totalAssets,
    totalLiabilities,
    totalEquity,
    workingCapital: totalCurrentAssets - totalCurrentLiabilities,
    EBITDA
  };
};

// 샘플 기업 데이터
export const sampleCompanies: Company[] = [
  {
    id: "company1",
    name: "테크이노베이션",
    industry: "IT 서비스",
    description: "클라우드 컴퓨팅과 인공지능 솔루션을 제공하는 IT 기업",
    financialStatements: [
      {
        year: 2023,
        quarter: 4,
        balanceSheet: {
          assets: {
            currentAssets: {
              cash: 120000000,
              shortTermInvestments: 85000000,
              receivables: 45000000,
              inventory: 30000000,
              otherCurrentAssets: 15000000
            },
            nonCurrentAssets: {
              propertyPlantEquipment: 200000000,
              intangibleAssets: 150000000,
              longTermInvestments: 100000000,
              otherNonCurrentAssets: 50000000
            }
          },
          liabilities: {
            currentLiabilities: {
              accountsPayable: 40000000,
              shortTermDebt: 30000000,
              otherCurrentLiabilities: 20000000
            },
            nonCurrentLiabilities: {
              longTermDebt: 250000000,
              otherNonCurrentLiabilities: 50000000
            }
          },
          equity: {
            commonStock: 100000000,
            retainedEarnings: 280000000,
            treasuryStock: -25000000,
            otherEquity: 50000000
          }
        },
        incomeStatement: {
          revenue: 500000000,
          costOfRevenue: 300000000,
          grossProfit: 200000000,
          operatingExpenses: {
            researchAndDevelopment: 50000000,
            sellingGeneralAdministrative: 70000000,
            otherOperatingExpenses: 10000000
          },
          operatingIncome: 70000000,
          nonOperatingIncome: -15000000,
          interestExpense: 15000000,
          incomeBeforeTax: 55000000,
          incomeTax: 15000000,
          netIncome: 40000000,
          depreciation: 25000000,
          amortization: 10000000
        },
        cashFlow: {
          operatingActivities: {
            netIncome: 40000000,
            depreciation: 35000000,
            changesInWorkingCapital: -10000000,
            otherOperatingActivities: 5000000
          },
          investingActivities: {
            capitalExpenditures: -40000000,
            investments: -20000000,
            otherInvestingActivities: -5000000
          },
          financingActivities: {
            debtPayments: -15000000,
            dividendsPaid: -10000000,
            stockIssuance: 0,
            otherFinancingActivities: -5000000
          },
          netChangeInCash: -25000000
        }
      }
    ]
  },
  {
    id: "company2",
    name: "제조솔루션",
    industry: "제조업",
    description: "산업용 장비 및 자동화 솔루션을 제공하는 제조 기업",
    financialStatements: [
      {
        year: 2023,
        quarter: 4,
        balanceSheet: {
          assets: {
            currentAssets: {
              cash: 80000000,
              shortTermInvestments: 20000000,
              receivables: 90000000,
              inventory: 120000000,
              otherCurrentAssets: 30000000
            },
            nonCurrentAssets: {
              propertyPlantEquipment: 350000000,
              intangibleAssets: 70000000,
              longTermInvestments: 50000000,
              otherNonCurrentAssets: 40000000
            }
          },
          liabilities: {
            currentLiabilities: {
              accountsPayable: 70000000,
              shortTermDebt: 80000000,
              otherCurrentLiabilities: 40000000
            },
            nonCurrentLiabilities: {
              longTermDebt: 300000000,
              otherNonCurrentLiabilities: 60000000
            }
          },
          equity: {
            commonStock: 150000000,
            retainedEarnings: 150000000,
            treasuryStock: -30000000,
            otherEquity: 50000000
          }
        },
        incomeStatement: {
          revenue: 600000000,
          costOfRevenue: 420000000,
          grossProfit: 180000000,
          operatingExpenses: {
            researchAndDevelopment: 30000000,
            sellingGeneralAdministrative: 60000000,
            otherOperatingExpenses: 15000000
          },
          operatingIncome: 75000000,
          nonOperatingIncome: -20000000,
          interestExpense: 20000000,
          incomeBeforeTax: 55000000,
          incomeTax: 15000000,
          netIncome: 40000000,
          depreciation: 30000000,
          amortization: 5000000
        },
        cashFlow: {
          operatingActivities: {
            netIncome: 40000000,
            depreciation: 35000000,
            changesInWorkingCapital: 5000000,
            otherOperatingActivities: 0
          },
          investingActivities: {
            capitalExpenditures: -50000000,
            investments: -10000000,
            otherInvestingActivities: 0
          },
          financingActivities: {
            debtPayments: -20000000,
            dividendsPaid: -15000000,
            stockIssuance: 0,
            otherFinancingActivities: -5000000
          },
          netChangeInCash: -20000000
        }
      }
    ]
  },
  {
    id: "company3",
    name: "A 생명과학",
    industry: "제약/바이오",
    description: "혁신적인 의약품 개발에 중점을 둔 제약/바이오 기업",
    financialStatements: [
      {
        year: 2022,
        quarter: 4,
        balanceSheet: {
          assets: {
            currentAssets: {
              cash: 150000000,
              shortTermInvestments: 100000000,
              receivables: 60000000,
              inventory: 40000000,
              otherCurrentAssets: 20000000
            },
            nonCurrentAssets: {
              propertyPlantEquipment: 220000000,
              intangibleAssets: 180000000,
              longTermInvestments: 120000000,
              otherNonCurrentAssets: 60000000
            }
          },
          liabilities: {
            currentLiabilities: {
              accountsPayable: 50000000,
              shortTermDebt: 40000000,
              otherCurrentLiabilities: 30000000
            },
            nonCurrentLiabilities: {
              longTermDebt: 280000000,
              otherNonCurrentLiabilities: 70000000
            }
          },
          equity: {
            commonStock: 200000000,
            retainedEarnings: 250000000,
            treasuryStock: -20000000,
            otherEquity: 70000000
          }
        },
        incomeStatement: {
          revenue: 400000000,
          costOfRevenue: 200000000,
          grossProfit: 200000000,
          operatingExpenses: {
            researchAndDevelopment: 80000000,
            sellingGeneralAdministrative: 60000000,
            otherOperatingExpenses: 10000000
          },
          operatingIncome: 50000000,
          nonOperatingIncome: -10000000,
          interestExpense: 10000000,
          incomeBeforeTax: 40000000,
          incomeTax: 10000000,
          netIncome: 30000000,
          depreciation: 20000000,
          amortization: 15000000
        },
        cashFlow: {
          operatingActivities: {
            netIncome: 30000000,
            depreciation: 35000000,
            changesInWorkingCapital: -5000000,
            otherOperatingActivities: 0
          },
          investingActivities: {
            capitalExpenditures: -45000000,
            investments: -25000000,
            otherInvestingActivities: -5000000
          },
          financingActivities: {
            debtPayments: -20000000,
            dividendsPaid: -10000000,
            stockIssuance: 50000000,
            otherFinancingActivities: 0
          },
          netChangeInCash: 5000000
        }
      },
      {
        year: 2023,
        quarter: 4,
        balanceSheet: {
          assets: {
            currentAssets: {
              cash: 170000000,
              shortTermInvestments: 120000000,
              receivables: 70000000,
              inventory: 45000000,
              otherCurrentAssets: 25000000
            },
            nonCurrentAssets: {
              propertyPlantEquipment: 240000000,
              intangibleAssets: 200000000,
              longTermInvestments: 130000000,
              otherNonCurrentAssets: 70000000
            }
          },
          liabilities: {
            currentLiabilities: {
              accountsPayable: 55000000,
              shortTermDebt: 45000000,
              otherCurrentLiabilities: 35000000
            },
            nonCurrentLiabilities: {
              longTermDebt: 300000000,
              otherNonCurrentLiabilities: 80000000
            }
          },
          equity: {
            commonStock: 200000000,
            retainedEarnings: 290000000,
            treasuryStock: -20000000,
            otherEquity: 70000000
          }
        },
        incomeStatement: {
          revenue: 460000000,
          costOfRevenue: 230000000,
          grossProfit: 230000000,
          operatingExpenses: {
            researchAndDevelopment: 95000000,
            sellingGeneralAdministrative: 70000000,
            otherOperatingExpenses: 10000000
          },
          operatingIncome: 55000000,
          nonOperatingIncome: -12000000,
          interestExpense: 12000000,
          incomeBeforeTax: 43000000,
          incomeTax: 12000000,
          netIncome: 31000000,
          depreciation: 22000000,
          amortization: 18000000
        },
        cashFlow: {
          operatingActivities: {
            netIncome: 31000000,
            depreciation: 40000000,
            changesInWorkingCapital: -8000000,
            otherOperatingActivities: 0
          },
          investingActivities: {
            capitalExpenditures: -50000000,
            investments: -15000000,
            otherInvestingActivities: -5000000
          },
          financingActivities: {
            debtPayments: -25000000,
            dividendsPaid: -12000000,
            stockIssuance: 0,
            otherFinancingActivities: 0
          },
          netChangeInCash: -44000000
        }
      }
    ]
  },
  {
    id: "company4",
    name: "B 전자상거래",
    industry: "전자상거래",
    description: "온라인 쇼핑 및 물류 서비스를 제공하는 전자상거래 기업",
    financialStatements: [
      {
        year: 2022,
        quarter: 4,
        balanceSheet: {
          assets: {
            currentAssets: {
              cash: 80000000,
              shortTermInvestments: 40000000,
              receivables: 30000000,
              inventory: 60000000,
              otherCurrentAssets: 10000000
            },
            nonCurrentAssets: {
              propertyPlantEquipment: 150000000,
              intangibleAssets: 70000000,
              longTermInvestments: 50000000,
              otherNonCurrentAssets: 30000000
            }
          },
          liabilities: {
            currentLiabilities: {
              accountsPayable: 50000000,
              shortTermDebt: 30000000,
              otherCurrentLiabilities: 20000000
            },
            nonCurrentLiabilities: {
              longTermDebt: 120000000,
              otherNonCurrentLiabilities: 40000000
            }
          },
          equity: {
            commonStock: 100000000,
            retainedEarnings: 100000000,
            treasuryStock: -10000000,
            otherEquity: 30000000
          }
        },
        incomeStatement: {
          revenue: 300000000,
          costOfRevenue: 210000000,
          grossProfit: 90000000,
          operatingExpenses: {
            researchAndDevelopment: 20000000,
            sellingGeneralAdministrative: 40000000,
            otherOperatingExpenses: 5000000
          },
          operatingIncome: 25000000,
          nonOperatingIncome: -5000000,
          interestExpense: 5000000,
          incomeBeforeTax: 20000000,
          incomeTax: 5000000,
          netIncome: 15000000,
          depreciation: 10000000,
          amortization: 5000000
        },
        cashFlow: {
          operatingActivities: {
            netIncome: 15000000,
            depreciation: 15000000,
            changesInWorkingCapital: -5000000,
            otherOperatingActivities: 0
          },
          investingActivities: {
            capitalExpenditures: -20000000,
            investments: -10000000,
            otherInvestingActivities: 0
          },
          financingActivities: {
            debtPayments: -10000000,
            dividendsPaid: -5000000,
            stockIssuance: 0,
            otherFinancingActivities: 0
          },
          netChangeInCash: -20000000
        }
      },
      {
        year: 2023,
        quarter: 4,
        balanceSheet: {
          assets: {
            currentAssets: {
              cash: 100000000,
              shortTermInvestments: 50000000,
              receivables: 40000000,
              inventory: 75000000,
              otherCurrentAssets: 15000000
            },
            nonCurrentAssets: {
              propertyPlantEquipment: 190000000,
              intangibleAssets: 85000000,
              longTermInvestments: 60000000,
              otherNonCurrentAssets: 35000000
            }
          },
          liabilities: {
            currentLiabilities: {
              accountsPayable: 60000000,
              shortTermDebt: 35000000,
              otherCurrentLiabilities: 25000000
            },
            nonCurrentLiabilities: {
              longTermDebt: 150000000,
              otherNonCurrentLiabilities: 50000000
            }
          },
          equity: {
            commonStock: 100000000,
            retainedEarnings: 130000000,
            treasuryStock: -10000000,
            otherEquity: 30000000
          }
        },
        incomeStatement: {
          revenue: 375000000,
          costOfRevenue: 260000000,
          grossProfit: 115000000,
          operatingExpenses: {
            researchAndDevelopment: 25000000,
            sellingGeneralAdministrative: 50000000,
            otherOperatingExpenses: 5000000
          },
          operatingIncome: 35000000,
          nonOperatingIncome: -6000000,
          interestExpense: 6000000,
          incomeBeforeTax: 29000000,
          incomeTax: 7000000,
          netIncome: 22000000,
          depreciation: 12000000,
          amortization: 6000000
        },
        cashFlow: {
          operatingActivities: {
            netIncome: 22000000,
            depreciation: 18000000,
            changesInWorkingCapital: -8000000,
            otherOperatingActivities: 0
          },
          investingActivities: {
            capitalExpenditures: -45000000,
            investments: -12000000,
            otherInvestingActivities: 0
          },
          financingActivities: {
            debtPayments: -15000000,
            dividendsPaid: -7000000,
            stockIssuance: 30000000,
            otherFinancingActivities: 0
          },
          netChangeInCash: -17000000
        }
      }
    ]
  },
  {
    id: "company5",
    name: "C 에너지",
    industry: "에너지",
    description: "친환경 에너지 솔루션을 개발하는 신재생 에너지 기업",
    financialStatements: [
      {
        year: 2022,
        quarter: 4,
        balanceSheet: {
          assets: {
            currentAssets: {
              cash: 90000000,
              shortTermInvestments: 60000000,
              receivables: 40000000,
              inventory: 50000000,
              otherCurrentAssets: 20000000
            },
            nonCurrentAssets: {
              propertyPlantEquipment: 300000000,
              intangibleAssets: 80000000,
              longTermInvestments: 70000000,
              otherNonCurrentAssets: 40000000
            }
          },
          liabilities: {
            currentLiabilities: {
              accountsPayable: 45000000,
              shortTermDebt: 35000000,
              otherCurrentLiabilities: 25000000
            },
            nonCurrentLiabilities: {
              longTermDebt: 250000000,
              otherNonCurrentLiabilities: 60000000
            }
          },
          equity: {
            commonStock: 150000000,
            retainedEarnings: 120000000,
            treasuryStock: -15000000,
            otherEquity: 40000000
          }
        },
        incomeStatement: {
          revenue: 350000000,
          costOfRevenue: 230000000,
          grossProfit: 120000000,
          operatingExpenses: {
            researchAndDevelopment: 30000000,
            sellingGeneralAdministrative: 45000000,
            otherOperatingExpenses: 5000000
          },
          operatingIncome: 40000000,
          nonOperatingIncome: -15000000,
          interestExpense: 15000000,
          incomeBeforeTax: 25000000,
          incomeTax: 7000000,
          netIncome: 18000000,
          depreciation: 25000000,
          amortization: 5000000
        },
        cashFlow: {
          operatingActivities: {
            netIncome: 18000000,
            depreciation: 30000000,
            changesInWorkingCapital: -10000000,
            otherOperatingActivities: 0
          },
          investingActivities: {
            capitalExpenditures: -60000000,
            investments: -15000000,
            otherInvestingActivities: 0
          },
          financingActivities: {
            debtPayments: -20000000,
            dividendsPaid: -8000000,
            stockIssuance: 40000000,
            otherFinancingActivities: 0
          },
          netChangeInCash: -25000000
        }
      },
      {
        year: 2023,
        quarter: 4,
        balanceSheet: {
          assets: {
            currentAssets: {
              cash: 105000000,
              shortTermInvestments: 70000000,
              receivables: 50000000,
              inventory: 60000000,
              otherCurrentAssets: 25000000
            },
            nonCurrentAssets: {
              propertyPlantEquipment: 350000000,
              intangibleAssets: 95000000,
              longTermInvestments: 85000000,
              otherNonCurrentAssets: 45000000
            }
          },
          liabilities: {
            currentLiabilities: {
              accountsPayable: 55000000,
              shortTermDebt: 40000000,
              otherCurrentLiabilities: 30000000
            },
            nonCurrentLiabilities: {
              longTermDebt: 280000000,
              otherNonCurrentLiabilities: 70000000
            }
          },
          equity: {
            commonStock: 170000000,
            retainedEarnings: 145000000,
            treasuryStock: -15000000,
            otherEquity: 40000000
          }
        },
        incomeStatement: {
          revenue: 413000000,
          costOfRevenue: 268000000,
          grossProfit: 145000000,
          operatingExpenses: {
            researchAndDevelopment: 38000000,
            sellingGeneralAdministrative: 53000000,
            otherOperatingExpenses: 6000000
          },
          operatingIncome: 48000000,
          nonOperatingIncome: -17000000,
          interestExpense: 17000000,
          incomeBeforeTax: 31000000,
          incomeTax: 9000000,
          netIncome: 22000000,
          depreciation: 28000000,
          amortization: 7000000
        },
        cashFlow: {
          operatingActivities: {
            netIncome: 22000000,
            depreciation: 35000000,
            changesInWorkingCapital: -8000000,
            otherOperatingActivities: 0
          },
          investingActivities: {
            capitalExpenditures: -70000000,
            investments: -18000000,
            otherInvestingActivities: 0
          },
          financingActivities: {
            debtPayments: -25000000,
            dividendsPaid: -10000000,
            stockIssuance: 20000000,
            otherFinancingActivities: 0
          },
          netChangeInCash: -54000000
        }
      }
    ]
  },
  {
    id: "company6",
    name: "경영전략컨설팅",
    industry: "컨설팅",
    description: "기업 경영 전략 및 재무 컨설팅을 제공하는 서비스 기업",
    financialStatements: [
      {
        year: 2023,
        quarter: 4,
        balanceSheet: {
          assets: {
            currentAssets: {
              cash: 50000000,
              shortTermInvestments: 30000000,
              receivables: 70000000,
              inventory: 10000000,
              otherCurrentAssets: 15000000
            },
            nonCurrentAssets: {
              propertyPlantEquipment: 80000000,
              intangibleAssets: 60000000,
              longTermInvestments: 40000000,
              otherNonCurrentAssets: 20000000
            }
          },
          liabilities: {
            currentLiabilities: {
              accountsPayable: 30000000,
              shortTermDebt: 25000000,
              otherCurrentLiabilities: 20000000
            },
            nonCurrentLiabilities: {
              longTermDebt: 70000000,
              otherNonCurrentLiabilities: 30000000
            }
          },
          equity: {
            commonStock: 80000000,
            retainedEarnings: 100000000,
            treasuryStock: -5000000,
            otherEquity: 20000000
          }
        },
        incomeStatement: {
          revenue: 250000000,
          costOfRevenue: 125000000,
          grossProfit: 125000000,
          operatingExpenses: {
            researchAndDevelopment: 10000000,
            sellingGeneralAdministrative: 95000000,
            otherOperatingExpenses: 5000000
          },
          operatingIncome: 15000000,
          nonOperatingIncome: -3000000,
          interestExpense: 3000000,
          incomeBeforeTax: 12000000,
          incomeTax: 3000000,
          netIncome: 9000000,
          depreciation: 8000000,
          amortization: 5000000
        },
        cashFlow: {
          operatingActivities: {
            netIncome: 9000000,
            depreciation: 13000000,
            changesInWorkingCapital: -15000000,
            otherOperatingActivities: 0
          },
          investingActivities: {
            capitalExpenditures: -10000000,
            investments: -5000000,
            otherInvestingActivities: 0
          },
          financingActivities: {
            debtPayments: -8000000,
            dividendsPaid: -5000000,
            stockIssuance: 0,
            otherFinancingActivities: 0
          },
          netChangeInCash: -21000000
        }
      }
    ]
  },
  {
    id: "company7",
    name: "인수대상기업",
    industry: "통신",
    description: "무선 통신 및 네트워크 인프라 솔루션을 제공하는 통신 기업",
    financialStatements: [
      {
        year: 2023,
        quarter: 4,
        balanceSheet: {
          assets: {
            currentAssets: {
              cash: 200000000,
              shortTermInvestments: 100000000,
              receivables: 150000000,
              inventory: 80000000,
              otherCurrentAssets: 30000000
            },
            nonCurrentAssets: {
              propertyPlantEquipment: 700000000,
              intangibleAssets: 300000000,
              longTermInvestments: 150000000,
              otherNonCurrentAssets: 70000000
            }
          },
          liabilities: {
            currentLiabilities: {
              accountsPayable: 100000000,
              shortTermDebt: 80000000,
              otherCurrentLiabilities: 50000000
            },
            nonCurrentLiabilities: {
              longTermDebt: 400000000,
              otherNonCurrentLiabilities: 150000000
            }
          },
          equity: {
            commonStock: 500000000,
            retainedEarnings: 400000000,
            treasuryStock: -50000000,
            otherEquity: 100000000
          }
        },
        incomeStatement: {
          revenue: 1200000000,
          costOfRevenue: 700000000,
          grossProfit: 500000000,
          operatingExpenses: {
            researchAndDevelopment: 100000000,
            sellingGeneralAdministrative: 150000000,
            otherOperatingExpenses: 30000000
          },
          operatingIncome: 220000000,
          nonOperatingIncome: -20000000,
          interestExpense: 20000000,
          incomeBeforeTax: 200000000,
          incomeTax: 50000000,
          netIncome: 150000000,
          depreciation: 80000000,
          amortization: 40000000
        },
        cashFlow: {
          operatingActivities: {
            netIncome: 150000000,
            depreciation: 120000000,
            changesInWorkingCapital: -30000000,
            otherOperatingActivities: 10000000
          },
          investingActivities: {
            capitalExpenditures: -180000000,
            investments: -50000000,
            otherInvestingActivities: -10000000
          },
          financingActivities: {
            debtPayments: -100000000,
            dividendsPaid: -50000000,
            stockIssuance: 0,
            otherFinancingActivities: -20000000
          },
          netChangeInCash: -160000000
        }
      }
    ]
  },
  {
    id: "company8",
    name: "경쟁사A",
    industry: "통신",
    description: "통신 서비스 및 디지털 솔루션을 제공하는 통신 기업",
    financialStatements: [
      {
        year: 2023,
        quarter: 4,
        balanceSheet: {
          assets: {
            currentAssets: {
              cash: 300000000,
              shortTermInvestments: 150000000,
              receivables: 180000000,
              inventory: 70000000,
              otherCurrentAssets: 40000000
            },
            nonCurrentAssets: {
              propertyPlantEquipment: 900000000,
              intangibleAssets: 400000000,
              longTermInvestments: 200000000,
              otherNonCurrentAssets: 100000000
            }
          },
          liabilities: {
            currentLiabilities: {
              accountsPayable: 150000000,
              shortTermDebt: 100000000,
              otherCurrentLiabilities: 70000000
            },
            nonCurrentLiabilities: {
              longTermDebt: 600000000,
              otherNonCurrentLiabilities: 200000000
            }
          },
          equity: {
            commonStock: 600000000,
            retainedEarnings: 550000000,
            treasuryStock: -80000000,
            otherEquity: 150000000
          }
        },
        incomeStatement: {
          revenue: 1500000000,
          costOfRevenue: 850000000,
          grossProfit: 650000000,
          operatingExpenses: {
            researchAndDevelopment: 150000000,
            sellingGeneralAdministrative: 200000000,
            otherOperatingExpenses: 50000000
          },
          operatingIncome: 250000000,
          nonOperatingIncome: -30000000,
          interestExpense: 30000000,
          incomeBeforeTax: 220000000,
          incomeTax: 55000000,
          netIncome: 165000000,
          depreciation: 100000000,
          amortization: 50000000
        },
        cashFlow: {
          operatingActivities: {
            netIncome: 165000000,
            depreciation: 150000000,
            changesInWorkingCapital: -40000000,
            otherOperatingActivities: 15000000
          },
          investingActivities: {
            capitalExpenditures: -200000000,
            investments: -70000000,
            otherInvestingActivities: -20000000
          },
          financingActivities: {
            debtPayments: -120000000,
            dividendsPaid: -60000000,
            stockIssuance: 50000000,
            otherFinancingActivities: -30000000
          },
          netChangeInCash: -170000000
        }
      }
    ]
  }
];