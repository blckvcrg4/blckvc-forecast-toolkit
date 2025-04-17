# BLCK VC Formula Reference & Implementation Guide

This guide provides detailed explanations of the key formulas used in the BLCK VC Revenue Forecasting model, along with implementation instructions for Google Sheets, conditional formatting rules, and advanced tips for sensitivity analysis.

## Key Formulas with Explanations

### Revenue Calculations

#### 1. BVI Program Revenue
```
=IF(Drivers!F24=1, Drivers!F19*Drivers!F20, 0)
```
**Explanation**: Calculates tuition revenue for the BVI program by multiplying the number of seats forecast by the tuition per seat, but only if the program timing indicator is 1 for that month (meaning the program runs that month).

#### 2. BVI Sponsorship Revenue
```
=IF(Drivers!F24=1, Drivers!F21*Drivers!F22, 0)
```
**Explanation**: Calculates sponsorship revenue for the BVI program by multiplying the number of sponsors by the sponsorship amount, but only if the program timing indicator is 1 for that month.

#### 3. Weighted Pipeline Revenue
```
=Drivers!D52*Drivers!D53/100
```
**Explanation**: Calculates the expected revenue from a pipeline opportunity (like the Salesforce grant) by multiplying the amount by the probability percentage.

#### 4. Curriculum Licensing Revenue
```
=Drivers!C73*Drivers!C74*Drivers!C75/100
```
**Explanation**: Calculates expected curriculum licensing revenue by multiplying the number of licenses by the license fee and by the probability percentage.

#### 5. Money Market Returns
```
=Forecast!C9*(Drivers!C77/100/12)
```
**Explanation**: Calculates monthly interest earned on cash balance by multiplying the ending cash balance by the annual interest rate divided by 12 months.

### Expense Calculations

#### 6. Variable Cost of Goods Sold
```
=IF(Rev_Model!H4>0, Rev_Model!H4*Drivers!H25/100, 0)
```
**Explanation**: Calculates the variable costs for a revenue stream (like BVI) by multiplying the revenue by the COGS percentage, but only if revenue is greater than zero.

#### 7. Benefits Calculation
```
=(Drivers!C86+Drivers!C87)*Drivers!C88/100
```
**Explanation**: Calculates employee benefits by adding up salaries and multiplying by the benefits percentage.

### Financial Metrics

#### 8. Monthly Burn Rate (3-month rolling average)
```
=IF(AVERAGE(C11:E11)>0, AVERAGE(C11:E11), AVERAGE(OFFSET(C11,0,-3,1,3)))
```
**Explanation**: Calculates the 3-month rolling average of monthly cash burn. If the average of the current and next two months is positive, use that; otherwise, look back at the previous three months.

#### 9. Runway Calculation
```
=IF(C12>0, C9/C12, 999)
```
**Explanation**: Calculates how many months of runway remain by dividing the ending cash balance by the monthly burn rate. If burn rate is zero, returns 999 (essentially infinite runway).

#### 10. Break-Even Percentage
```
=(C4-C3)/C3*100
```
**Explanation**: Calculates the percentage by which expenses exceed (or are less than) revenue. Negative numbers mean the organization is profitable for that month.

#### 11. Burn Multiple
```
=IF(C3>0, C11/C3, 99)
```
**Explanation**: Calculates the burn multiple (efficiency ratio) by dividing monthly burn by monthly revenue. If revenue is zero, returns 99 (extremely inefficient).

#### 12. Cumulative Revenue Gap
```
=IF(C2="Apr-25", C14, B15+C14)
```
**Explanation**: Tracks the cumulative gap between target and actual revenue. For the first month, it's just that month's gap; for subsequent months, it adds the current month's gap to the previous cumulative total.

### Scenario Switching

#### 13. Scenario Parameter Switch
```
=IF(Drivers!C90=1, C3, IF(Drivers!C90=2, B3, D3))
```
**Explanation**: Switches parameter values based on the scenario toggle. If toggle=1, use optimistic; if toggle=2, use base case; otherwise use conservative case.

## Setup Instructions for Google Sheets

### 1. Initial Setup

1. Create a new Google Sheets document
2. Import the CSV files provided in this toolkit:
   - `drivers.csv`
   - `rev-model.csv`
   - `cost-model.csv`
   - `forecast.csv`
   - `case-switch.csv`
   - `targets.csv`

3. Rename each sheet accordingly:
   - Drivers
   - Rev-Model
   - Cost-Model
   - Forecast
   - Case-Switch
   - Targets
   - Dashboard (create a new blank sheet)

### 2. Formula Corrections

After importing the CSV files, you'll need to fix the formulas as Google Sheets may not properly interpret the CSV format:

1. In **Rev-Model** sheet:
   - For cells with formulas, replace the spaces with commas between function arguments
   - Example: Change `=IF(Drivers!F24=1 Drivers!F19*Drivers!F20 0)` to `=IF(Drivers!F24=1, Drivers!F19*Drivers!F20, 0)`

2. In **Forecast** sheet:
   - Fix IF statements with proper commas
   - Example: Change `=IF(C2="Apr-25" Drivers!C78 B9)` to `=IF(C2="Apr-25", Drivers!C78, B9)`

3. In **Case-Switch** sheet:
   - Fix nested IF statements with proper commas
   - Example: Change `=IF(Drivers!C90=1 C3 IF(Drivers!C90=2 B3 D3))` to `=IF(Drivers!C90=1, C3, IF(Drivers!C90=2, B3, D3))`

### 3. Add Data Validation

1. For the Scenario Toggle in Drivers sheet (cell C90):
   - Select the cell
   - Go to Data → Data validation
   - Set to "List from a range"
   - Enter criteria: 1, 2, 3
   - On invalid data: Show warning
   - Add help text: "1=Optimistic, 2=Base, 3=Conservative"

2. For Probability Percentages:
   - Select cells containing probabilities
   - Go to Data → Data validation
   - Set to "Number between"
   - Enter minimum: 0, maximum: 100
   - On invalid data: Reject input
   - Add help text: "Must be a percentage between 0 and 100"

### 4. Create Named Ranges

For easier formula references, create these named ranges:

1. Select Data → Named ranges
2. Create the following:
   - `MonthlyRevenue`: Select the range with monthly revenue totals
   - `MonthlyExpenses`: Select the range with monthly expense totals 
   - `CashBalance`: Select the range with ending cash balances
   - `Runway`: Select the range with runway calculations
   - `RevenueGap`: Select the range with monthly revenue gaps

## Conditional Formatting Rules

Apply these conditional formatting rules to highlight important insights:

### 1. Revenue Gap Highlighting

1. Select the revenue gap row in the Forecast sheet
2. Go to Format → Conditional formatting
3. Create three rules:
   - Format cells if: Cell is less than or equal to 0
     - Formatting style: Green background, dark green text
   - Format cells if: Cell is greater than 0 and less than Target cell's warning threshold
     - Formatting style: Yellow background, dark orange text
   - Format cells if: Cell is greater than or equal to Target cell's warning threshold
     - Formatting style: Light red background, dark red text

### 2. Runway Warning Indicators

1. Select the runway months row in the Forecast sheet
2. Go to Format → Conditional formatting
3. Create three rules:
   - Format cells if: Cell is greater than or equal to Target!B10 (target runway)
     - Formatting style: Green background, dark green text
   - Format cells if: Cell is less than Target!B10 and greater than Target!C10 (warning threshold)
     - Formatting style: Yellow background, dark orange text
   - Format cells if: Cell is less than or equal to Target!C10 (warning threshold)
     - Formatting style: Light red background, dark red text

### 3. Cash Balance Indicators

1. Select the ending cash balance row in the Forecast sheet
2. Go to Format → Conditional formatting
3. Create three rules:
   - Format cells if: Cell is greater than or equal to Target!B12 (target minimum)
     - Formatting style: Green background, dark green text
   - Format cells if: Cell is less than Target!B12 and greater than Target!C12 (warning threshold)
     - Formatting style: Yellow background, dark orange text
   - Format cells if: Cell is less than or equal to Target!C12 (warning threshold)
     - Formatting style: Light red background, dark red text

### 4. Burn Multiple Warning

1. Select the burn multiple row in the Forecast sheet
2. Go to Format → Conditional formatting
3. Create three rules:
   - Format cells if: Cell is less than or equal to Target!B11 (target multiple)
     - Formatting style: Green background, dark green text
   - Format cells if: Cell is greater than Target!B11 and less than Target!C11 (warning threshold)
     - Formatting style: Yellow background, dark orange text
   - Format cells if: Cell is greater than or equal to Target!C11 (warning threshold)
     - Formatting style: Light red background, dark red text

## Advanced Tips for Sensitivity Analysis

### 1. One-Variable Data Tables

Use data tables to analyze how a single driver impacts key metrics:

1. Set up a data table with the driver values in column A (e.g., different BVI enrollment numbers)
2. In cell B1, enter a formula that references your key metric (e.g., `=Forecast!E9` for June cash balance)
3. Select the entire table including headers
4. Go to Data → What-if analysis → Data table
5. Set the column input cell to your driver cell (e.g., `Drivers!F19` for BVI enrollment)
6. Leave the row input cell blank
7. Click OK

### 2. Two-Variable Data Tables

Use two-variable data tables to see how combinations of drivers impact metrics:

1. Set up a table with one driver values in column A (e.g., BVI enrollment)
2. Set up another driver values in row 1 (e.g., tuition price)
3. In cell A1, enter a formula that references your key metric (e.g., `=Forecast!H13` for Sep runway)
4. Select the entire table including headers
5. Go to Data → What-if analysis → Data table
6. Set column input cell to your first driver cell (e.g., `Drivers!F19` for enrollment)
7. Set row input cell to your second driver cell (e.g., `Drivers!F20` for tuition)
8. Click OK

### 3. Goal Seek for Break-Even Analysis

1. Select the cell containing the net income for a specific month
2. Go to Data → What-if analysis → Goal seek
3. Set the target value to 0 (break-even)
4. Set the changing cell to a specific driver (e.g., BVI enrollment)
5. Click OK to see what value that driver needs to be to break even

### 4. Solver for Multi-Variable Optimization

For more complex optimization:

1. Install the Solver add-on from Google Workspace Marketplace
2. Select the cell containing the metric you want to optimize (e.g., minimum cash balance)
3. Open Solver
4. Set the objective to maximize or minimize as appropriate
5. Select the cells containing drivers you can adjust
6. Add constraints (e.g., enrollment ≤ 40, runway ≥ 9 months)
7. Run Solver to find the optimal combination of driver values

### 5. Monte Carlo Simulation

For advanced risk analysis:

1. Install the Monte Carlo Simulation add-on
2. Define probability distributions for uncertain drivers:
   - Normal distribution for BVI enrollment
   - Triangle distribution for sponsor close rates
   - Uniform distribution for gala attendance
3. Run multiple simulations to get probability distributions of key metrics:
   - Cash runway
   - End of year cash balance
   - Cumulative revenue gap
4. Analyze results to understand the probability of hitting targets or falling below thresholds

## Implementation Best Practices

1. **Maintain driver accuracy**: Update driver values as soon as new information is available
2. **Version control**: Create a new version each month to track forecast evolution
3. **Documentation**: Use cell comments to explain complex formulas or assumptions
4. **Regular reviews**: Establish a monthly forecast review meeting with key stakeholders
5. **Scenario planning**: Regularly update scenarios based on changing conditions
6. **Audit formulas**: Periodically check for formula errors or circular references
7. **Protected ranges**: Protect formula cells to prevent accidental changes
8. **Change log**: Maintain a log of major assumption changes to understand forecast evolution

By following this implementation guide, you'll create a robust and flexible revenue forecasting system that provides actionable insights for strategic decision-making at BLCK VC.
