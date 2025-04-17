# BLCK VC Forecast Implementation: Step-by-Step Guide

This guide provides detailed instructions for implementing your driver-based rolling forecast model in Google Sheets, with specific examples tailored to BLCK VC's revenue streams and financial structure.

## Step 1: Setting Up Your Google Sheets Workbook

1. Create a new Google Sheets workbook named "BLCK VC Revenue Forecast (Apr-Dec 2025)"
2. Create the following sheets (tabs):
   - **Drivers** - All editable assumptions
   - **Rev-Model** - Revenue calculations
   - **Cost-Model** - Expense calculations
   - **Forecast** - P&L and cash flow summary
   - **Case-Switch** - Scenario toggle mechanism
   - **Targets** - Target metrics and thresholds
   - **Dashboard** - Visualizations and KPI tracking

## Step 2: Building the Drivers Tab

The Drivers tab is the "control center" where all assumptions are stored and can be adjusted.

1. **Create Column Headers:**
   - Cell A1: "Category"
   - Cell B1: "Driver"
   - Cells C1-K1: "Apr-25" through "Dec-25"
   - Cell L1: "Notes"

2. **Add BVI Program Drivers:**
   - Create rows for:
     - Seats_Max (40)
     - Seats_Forecast (32 in base case)
     - Tuition_Per_Seat ($2,500)
     - Sponsor_Count (5)
     - Sponsor_Amount ($10,000)
     - Program_Timing (1 in September, 0 in other months)
     - COGS_Percentage (60%)
     - Fixed_Costs ($10,000 per month)

3. **Add State of Black Venture Report Drivers:**
   - Create rows for:
     - Lead_Sponsor_Fee ($50,000 in April)
     - Lead_Sponsor_Probability (50%)
     - Secondary_Sponsors (3 in April)
     - Secondary_Sponsor_Fee ($25,000)
     - Secondary_Sponsor_Probability (40%)
     - COGS_Percentage (40%)

4. **Add Gala Drivers:**
   - Create rows for:
     - Scheduled (1 in June, 0 in other months)
     - Tickets_Max (400)
     - Tickets_Forecast (275 in base case)
     - Avg_Ticket_Price ($500)
     - Table_Sales (5)
     - Table_Price ($15,000)
     - COGS_Percentage (50%)
     - Fixed_Costs ($20,000 when scheduled)

5. **Add Dinner Fundraiser Drivers:**
   - Create rows for each dinner location (LA, SF, NY, MIA):
     - LA_Dinner_Date (1 in May, 0 in other months)
     - SF_Dinner_Date (1 in July, 0 in other months)
     - NY_Dinner_Date (1 in August, 0 in other months)
     - MIA_Dinner_Date (1 in September, 0 in other months)
     - Avg_Pledge ($25,000)
     - Pledge_Probability (60%)
     - COGS_Percentage (20%)

6. **Add Corporate Sponsorship Pipeline:**
   - Add rows for each major prospect:
     - Salesforce_Grant ($100,000 in May)
     - Salesforce_Probability (40%)
     - Google_DEI_Grant ($75,000 in June)
     - Google_DEI_Probability (60%)
     - Morgan_Stanley ($50,000 in July)
     - Morgan_Stanley_Probability (50%)
     - Deloitte_Sponsorship ($100,000 in August)
     - Deloitte_Probability (30%)
     - Delta_Sponsorship ($50,000 in September)
     - Delta_Probability (30%)

7. **Add Foundation Grant Pipeline:**
   - Add rows for each foundation prospect:
     - Kapor_Grant ($75,000 in June)
     - Kapor_Probability (40%)
     - MacArthur_Grant ($250,000 in August)
     - MacArthur_Probability (20%)

8. **Add Merchandise and Curriculum Licensing:**
   - Add rows for:
     - Monthly_Revenue ($1,250 per month)
     - COGS_Percentage (70%)
     - License_Count (1 in alternating months)
     - License_Fee ($10,000)
     - License_Probability (50%)

9. **Add General Financial Drivers:**
   - Add rows for:
     - Money_Market_Rate (3.9% annual)
     - Initial_Cash_Balance ($1,800,000 in April)
     - Contractor costs (BD, Marketing, Programs, Individual Giving)
     - Software_Subscriptions ($2,500 monthly)
     - Professional_Fees ($5,000 monthly)
     - Overhead ($7,500 monthly)
     - Salaries (CEO and Operations)
     - Benefits_Percentage (20%)

10. **Add Scenario Toggle:**
    - Create a dropdown cell using Data Validation
    - List options: 1 (Optimistic), 2 (Base), 3 (Conservative)
    - Default to 2 (Base)

## Step 3: Building the Revenue Model Tab

The Rev-Model tab calculates revenue based on the drivers.

1. **Create Column Headers:**
   - Cell A1: "Revenue_Stream"
   - Cell B1: "Formula"
   - Cells C1-K1: "Apr-25" through "Dec-25"
   - Cell L1: "Notes"

2. **Set Up BVI Revenue Calculations:**
   - BVI_Revenue: `=IF(Drivers!F24=1, Drivers!F19*Drivers!F20, 0)`
   - BVI_Sponsorship: `=IF(Drivers!F24=1, Drivers!F21*Drivers!F22, 0)`

3. **Set Up SOBVR Revenue Calculations:**
   - SOBVR_Lead: `=Drivers!C27*Drivers!C28/100`
   - SOBVR_Secondary: `=Drivers!C29*Drivers!C30*Drivers!C31/100`

4. **Set Up Gala Revenue Calculations:**
   - Gala_Tickets: `=IF(Drivers!E34=1, Drivers!E36*Drivers!E37, 0)`
   - Gala_Tables: `=IF(Drivers!E34=1, Drivers!E38*Drivers!E39, 0)`

5. **Set Up Dinner Revenue Calculations:**
   - LA_Dinner: `=IF(Drivers!D43=1, Drivers!D47*Drivers!D48/100, 0)`
   - SF_Dinner: `=IF(Drivers!F44=1, Drivers!F47*Drivers!F48/100, 0)`
   - NY_Dinner: `=IF(Drivers!G45=1, Drivers!G47*Drivers!G48/100, 0)`
   - MIA_Dinner: `=IF(Drivers!H46=1, Drivers!H47*Drivers!H48/100, 0)`

6. **Set Up Corporate and Foundation Revenue Calculations:**
   - Salesforce: `=Drivers!D52*Drivers!D53/100`
   - Google_DEI: `=Drivers!E54*Drivers!E55/100`
   - Morgan_Stanley: `=Drivers!F56*Drivers!F57/100`
   - Deloitte: `=Drivers!G58*Drivers!G59/100`
   - Delta: `=Drivers!H60*Drivers!H61/100`
   - Kapor: `=Drivers!E64*Drivers!E65/100`
   - MacArthur: `=Drivers!G66*Drivers!G67/100`

7. **Set Up Other Revenue Streams:**
   - Merchandise: `=Drivers!C70`
   - Curriculum_Licensing: `=Drivers!C73*Drivers!C74*Drivers!C75/100`

8. **Calculate Money Market Returns:**
   - Formula: `=Forecast!C9*(Drivers!C77/100/12)`
   - This references the Cash_Balance from the Forecast tab

9. **Add Total Revenue Row:**
   - Sum all revenue streams for each month

## Step 4: Building the Cost Model Tab

The Cost-Model tab breaks down expenses by type and timing.

1. **Create Column Headers:**
   - Cell A1: "Expense_Category"
   - Cell B1: "Type" (Fixed, Semi-Fixed, or Variable)
   - Cells C1-K1: "Apr-25" through "Dec-25"
   - Cell L1: "Notes"

2. **Set Up BVI Program Costs:**
   - BVI_COGS (Variable): `=IF(Rev_Model!H4>0, Rev_Model!H4*Drivers!H25/100, 0)`
   - BVI_Fixed (Fixed): `=Drivers!C26`

3. **Set Up SOBVR Costs:**
   - SOBVR_COGS (Variable): `=(Rev_Model!C6+Rev_Model!C7)*Drivers!C32/100`

4. **Set Up Gala Costs:**
   - Gala_COGS (Variable): `=IF((Rev_Model!E8+Rev_Model!E9)>0, (Rev_Model!E8+Rev_Model!E9)*Drivers!E40/100, 0)`
   - Gala_Fixed (Fixed): `=IF(Drivers!E34=1, Drivers!E41, 0)`

5. **Set Up Dinner Costs:**
   - Dinner_COGS (Variable): `=(Rev_Model!D10+Rev_Model!F11+Rev_Model!G12+Rev_Model!H13)*Drivers!D49/100`

6. **Set Up Merchandise Costs:**
   - Merchandise_COGS (Variable): `=Rev_Model!C20*Drivers!C71/100`

7. **Set Up Fixed and Semi-Fixed Costs:**
   - BD_Contractor (Semi-Fixed): `=Drivers!C79`
   - Marketing_Contractor (Semi-Fixed): `=Drivers!C80`
   - Programs_Contractor (Semi-Fixed): `=Drivers!C81`
   - Ind_Giving_Contractor (Semi-Fixed): `=Drivers!C82`
   - Software_Subscriptions (Semi-Fixed): `=Drivers!C83`
   - Professional_Fees (Fixed): `=Drivers!C84`
   - Overhead (Fixed): `=Drivers!C85`
   - CEO_Salary (Fixed): `=Drivers!C86`
   - Operations_Salary (Fixed): `=Drivers!C87`
   - Benefits (Fixed): `=(Drivers!C86+Drivers!C87)*Drivers!C88/100`

8. **Add Total Expenses Row:**
   - Sum all expenses for each month

9. **Add Subtotals by Cost Type:**
   - Fixed_Expenses: Sum of all expenses marked "Fixed"
   - Semi_Fixed_Expenses: Sum of all expenses marked "Semi-Fixed"
   - Variable_Expenses: Sum of all expenses marked "Variable"

## Step 5: Building the Forecast Tab

The Forecast tab pulls everything together into a P&L and cash flow summary.

1. **Create Column Headers:**
   - Cell A1: "Metric"
   - Cell B1: "Formula"
   - Cells C1-K1: "Apr-25" through "Dec-25"
   - Cell L1: "Notes"

2. **Set Up Key Financial Metrics:**
   - Total_Revenue: `=Rev_Model!C23` (linked to Rev-Model total)
   - Total_Expenses: `=Cost_Model!C23` (linked to Cost-Model total)
   - Net_Income: `=C3-C4`
   - Beginning_Cash: `=IF(C2=3, Drivers!C78, E6)` (use initial balance in first month, previous month's ending balance thereafter)
   - Net_Burn: `=IF(C5<0, C5, 0)` (only record negative months)
   - Cash_Balance: `=C6+C5` (beginning cash plus net income)
   - Runway_Months: `=IF(C7<0, C8/ABS(C7*-1), 999)` (cash ÷ burn rate, 999 if profitable)

3. **Set Up Performance Metrics:**
   - Contribution_Margin_%: `=(C3-Cost_Model!C24)/C3*100` (revenue minus variable costs, divided by revenue)
   - Burn_Multiple: `=IF(C7<0, ABS(C7)/C3, 0)` (burn ÷ revenue, 0 if profitable)

## Step 6: Building the Case-Switch Tab

The Case-Switch tab allows toggling between scenarios.

1. **Create Column Headers:**
   - Cell A1: "Driver"
   - Cell B1: "Optimistic"
   - Cell C1: "Base"
   - Cell D1: "Conservative"
   - Cell E1: "Current"
   - Cell F1: "Notes"

2. **Add Key Scenario Drivers:**
   - BVI_Seats_Forecast: 40 / 32 / 24
   - Sponsor_Close_%: 70% / 50% / 30%
   - Gala_Tickets_Forecast: 400 / 275 / 150
   - Event_COGS_%: 45% / 50% / 55%
   - Pledge_Probability: 80% / 60% / 40%
   - Foundation_Probability: 60% / 40% / 20%

3. **Create Toggle Formula:**
   ```
   =IF(Drivers!C103=1, B3, IF(Drivers!C103=2, C3, D3))
   ```
   This formula returns the value from the appropriate scenario column based on the toggle setting in the Drivers tab.

4. **Add Trigger Outcome Row:**
   - Optimistic: "No Pivot"
   - Base: "Evaluate Pivot"
   - Conservative: "Initiate Pivot"

## Step 7: Setting Up the Targets Tab

The Targets tab establishes goals and minimum thresholds.

1. **Create Column Headers:**
   - Cell A1: "Metric"
   - Cell B1: "Target"
   - Cells C1-K1: "Apr-25" through "Dec-25"
   - Cell L1: "Notes"

2. **Add Target Metrics:**
   - Revenue_Target: Monthly goals ($75k for most months, $275k for June, $175k for September)
   - Runway_Minimum: 9 months for all periods
   - Burn_Multiple_Cap: 2 for all periods
   - Cash_Balance_Minimum: Starting at $1.5M, decreasing by $50k per month
   - Required_Growth: `=C3-Rev_Model!C23` (gap between target and current revenue)

3. **Add Program-Specific Targets:**
   - Sponsor_Close_%_Target: 50%
   - BVI_Gross_Margin_Target: 35%
   - SoBV_Gala_Break_Even: 40% (ticket percentage needed for break-even)

## Step 8: Creating the Dashboard Tab

The Dashboard tab visualizes key metrics using charts and conditional formatting.

1. **Create KPI Section:**
   - Current Cash Balance (with conditional formatting based on minimum threshold)
   - Current Runway (with conditional formatting based on 9-month minimum)
   - YTD Revenue vs. Target (with variance percentage)
   - Burn Multiple (with conditional formatting based on 2x cap)

2. **Create Cash and Runway Chart:**
   - Line chart showing cash balance and runway by month
   - Add horizontal line for minimum runway threshold (9 months)
   - Add horizontal line for minimum cash threshold

3. **Create Revenue Bridge Chart:**
   - Stacked column chart showing revenue contribution by stream
   - Include target revenue line

4. **Create Gap Analysis Chart:**
   - Column chart showing gap between target and actual revenue
   - Use conditional formatting to highlight months with large gaps

5. **Create Contribution Margin Chart:**
   - Bar chart showing contribution margin by program
   - Include target margin line (35%)

6. **Create Pipeline Table:**
   - List top opportunities with potential value, probability, and weighted value
   - Sort by weighted value (highest to lowest)
   - Include action required column

7. **Add Scenario Toggle Control:**
   - Data validation dropdown linked to Drivers tab
   - Include visual indicator of current scenario

## Step 9: Setting Up Conditional Formatting

Apply conditional formatting to highlight important metrics:

1. **Cash Balance Warning:**
   ```
   Format cells if... Cell value is less than...
   =Targets!C7
   ```
   Format: Red background

2. **Runway Warning:**
   ```
   Format cells if... Cell value is less than...
   =9
   ```
   Format: Red background

3. **Burn Multiple Warning:**
   ```
   Format cells if... Cell value is greater than...
   =2
   ```
   Format: Red background

4. **Revenue Gap Warning:**
   ```
   Format cells if... Custom formula is...
   =AND(C10>0, C10>150000)
   ```
   Format: Red background

## Step 10: Monthly Review Process Implementation

Establish a routine for monthly updates:

1. **Pre-Meeting Preparation:**
   - Kareema updates previous month's actuals by the 3rd of each month
   - Team updates all probability weights based on latest pipeline information
   - Dashboard is refreshed with latest data

2. **Monthly Review Meeting Agenda:**
   - Review KPIs against targets
   - Identify revenue gaps and opportunities to close them
   - Review program contribution margins
   - Discuss any trigger points requiring action
   - Assign action items for addressing gaps

3. **Documentation:**
   - Record all assumption changes in a change log
   - Document decisions made based on forecast data
   - Track forecast accuracy over time

## Implementation Timeline

Week 1:
- Set up Drivers and Rev-Model tabs
- Import initial data from revenue strategy document
- Validate formula logic

Week 2:
- Complete Cost-Model and Forecast tabs
- Set up Case-Switch and Targets tabs
- Run initial forecasts

Week 3:
- Build Dashboard visualizations
- Set up conditional formatting
- Conduct team training session

Week 4:
- Run first monthly review meeting
- Document process for future updates
- Gather feedback and refine model

This implementation guide provides a systematic approach to building your driver-based rolling forecast model for BLCK VC. By following these steps, you'll create a powerful financial planning tool that provides real-time visibility into your organization's financial trajectory and supports data-driven decision-making.

## Appendix: Sample Goal Seek Analysis

To determine critical thresholds for financial sustainability, use the Solver add-on in Google Sheets:

Example 1: Minimum BVI Seats Required for Program Profitability
1. Objective: Set Contribution_Margin_% (for September) >= 35%
2. By changing: BVI_Seats_Forecast
3. Subject to constraints: BVI_Seats_Forecast <= 40

Example 2: Minimum Sponsor Close % Needed to Meet Annual Revenue Goal
1. Objective: Set December Cash_Balance >= $1.5M
2. By changing: Sponsor_Close_% (for all corporate and foundation prospects)
3. Subject to constraints: 20% <= Sponsor_Close_% <= 70%

These analyses will help identify the key leverage points in your financial model to focus your team's efforts for maximum impact.
