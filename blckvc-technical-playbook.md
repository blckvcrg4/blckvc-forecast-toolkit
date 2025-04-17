# BLCK VC Technical Playbook for Budgeting & Revenue Forecasting

## Overview of the Forecasting Framework

This playbook outlines the technical structure, methodology, and best practices for BLCK VC's driver-based revenue and budget forecasting system. The framework is designed to transform financial planning from reactive to proactive by providing a clear view of revenue opportunities, cost structures, and financial sustainability.

### Core Principles

1. **Driver-Based Modeling**: Forecasts are built from granular activity drivers rather than simple extrapolations.
2. **Rolling Forecast**: The model maintains a 9-month forward view that updates monthly.
3. **Scenario Planning**: Multiple scenarios allow for stress-testing and opportunity analysis.
4. **Decision Triggers**: Clear thresholds define when action is needed.
5. **Interconnected Metrics**: Revenue, costs, and cash flow are linked to show impacts of changes.

## Driver-Based Revenue Modeling Approach

### The Driver-Based Advantage

Traditional revenue forecasting often uses simple growth assumptions applied to historical totals. Our driver-based approach instead breaks down revenue into its component activities and influencing factors, allowing for:

- More accurate forecasts based on real-world activity
- Sensitivity analysis to identify high-impact variables
- Early warning signals when drivers deviate from expectations
- Clear accountability for specific revenue levers

### Revenue Driver Framework

Each revenue stream in the BLCK VC portfolio follows this structure:

```
Revenue = Base Unit × Volume × Probability × Timing
```

Where:
- **Base Unit**: The fundamental value unit (ticket price, sponsor fee, etc.)
- **Volume**: Number of units (attendees, sponsors, cohort size)
- **Probability**: Likelihood of closing (especially for pipeline items)
- **Timing**: Month when the revenue is expected to be realized

### Revenue Stream Categories

The model breaks down BLCK VC's revenue into these streams:

1. **BVI Program Revenue**
   - Tuition revenue: `Seats_Forecast × Tuition_Per_Seat × Program_Timing`
   - Sponsorship revenue: `Sponsor_Count × Sponsor_Amount × Program_Timing`

2. **State of Black Venture Report**
   - Lead sponsor: `Lead_Sponsor_Fee × Lead_Sponsor_Probability%`
   - Secondary sponsors: `Secondary_Sponsors × Secondary_Sponsor_Fee × Secondary_Sponsor_Probability%`

3. **Gala Revenue**
   - Ticket sales: `Tickets_Forecast × Avg_Ticket_Price × Scheduled`
   - Table sales: `Table_Sales × Table_Price × Scheduled`

4. **Fundraising Dinners**
   - Revenue per dinner: `Dinner_Date × Avg_Pledge × Pledge_Probability%`

5. **Corporate & Foundation**
   - Pipeline items individually tracked: `Amount × Probability%`

6. **Other Revenue**
   - Merchandise: Monthly recurring
   - Curriculum licensing: `License_Count × License_Fee × License_Probability%`
   - Investment income: `Cash_Balance × Money_Market_Rate / 12`

### Pipeline Weighted Forecasting

For less predictable revenue streams (corporate, foundation, etc.), the model uses a weighted pipeline approach:

1. Each opportunity is assigned a probability percentage
2. Revenue impact = Amount × Probability%
3. Pipeline coverage ratio = Total weighted pipeline / Target

## Cost Structure Logic

### Cost Categorization

The model categorizes costs into three types:

1. **Variable Costs**: Directly tied to revenue generation
   - Example: BVI program instructor costs, gala venue costs based on attendance
   - Formula: `Revenue × COGS_Percentage`

2. **Semi-Fixed Costs**: Can scale but not directly tied to revenue
   - Example: Contractor costs that may increase with overall organization size
   - Typically set at specific levels with step functions when thresholds are reached

3. **Fixed Costs**: Relatively constant regardless of activity
   - Example: Core staff, office costs, subscriptions
   - Budgeted as monthly amounts with inflation adjustments

### Program Contribution Analysis

For each revenue stream, the model calculates:

- **Gross Margin**: `(Revenue - Variable Costs) / Revenue`
- **Contribution Margin**: `(Revenue - Variable Costs - Allocated Semi-Fixed) / Revenue`
- **Break-Even Point**: `Fixed Costs / Gross Margin%`

This allows for program-level ROI analysis and resource allocation decisions.

### Cash Flow Projection

The model ties revenue and expenses to cash flow impacts:

1. Starting cash balance
2. Plus: Revenue (with timing adjustments for collection)
3. Minus: Expenses (with timing adjustments for payment)
4. Equals: Ending cash balance

From this, the model calculates critical metrics:
- Monthly burn rate (rolling 3-month average)
- Runway (months of cash remaining at current burn rate)
- Burn multiple (burn rate divided by revenue)

## Scenario Planning Capabilities

### Scenario Structure

The model supports three core scenarios:

1. **Base Case**: Most likely outcomes, aligned with internal targets
2. **Optimistic Case**: Upside potential if key drivers exceed expectations
3. **Conservative Case**: Downside risk if key drivers underperform

### Scenario Variables

Key variables that change across scenarios:

- BVI enrollment rates (32 Base / 38 Optimistic / 25 Conservative)
- Gala attendance (275 / 350 / 225)
- Corporate close rates (40% / 60% / 30%)
- Foundation close rates (30% / 50% / 20%)
- Dinner pledge fulfillment (60% / 75% / 45%)

### Scenario Activation

A single toggle cell switches all driver assumptions between scenarios, allowing for quick impact analysis and visualization of different future states.

## Key Performance Indicators to Track

### Revenue KPIs

- **Revenue by Stream**: Monthly and cumulative
- **Revenue Gap**: Actual vs target
- **Pipeline Coverage**: Weighted pipeline / Revenue target
- **Pipeline Velocity**: Close rate and time-to-close

### Program KPIs

- **Enrollment Rate**: Actual vs capacity
- **Sponsor Attachment Rate**: Sponsors per program
- **Contribution Margin**: By program
- **Breakeven Analysis**: Percent of capacity to break even

### Financial Sustainability KPIs

- **Cash Runway**: Months of operating cash at current burn
- **Burn Multiple**: Burn rate / Revenue
- **Break-Even Timing**: Month projected to reach profitability
- **Minimum Cash Balance**: Lowest projected cash position

### Dashboard Visualization

The KPI dashboard provides visual alerts when metrics cross warning or critical thresholds:

- **Green**: Meeting or exceeding targets
- **Yellow**: Below target but above warning threshold
- **Orange**: Below warning threshold
- **Red**: Below critical threshold

## Technical Implementation Considerations

### Data Organization

The model is structured across interconnected sheets:

1. **Drivers**: Contains all editable assumptions
2. **Rev-Model**: Revenue calculations from drivers
3. **Cost-Model**: Expense calculations from drivers
4. **Forecast**: P&L and cash flow summary
5. **Case-Switch**: Scenario toggle mechanism
6. **Targets**: Target metrics and thresholds
7. **Dashboard**: Visualizations and KPI tracking

### Calculated vs. Manual Data

- Driver data is manually entered based on the latest information
- All calculations are formula-driven to maintain data integrity
- No "hardcoded" values in calculation sheets

### Protection and Review

- Key formulas are protected to prevent accidental modification
- Data validation is applied to driver inputs
- Monthly review process includes verification of driver accuracy

## Next Steps

1. Follow the implementation guide to set up your forecast model
2. Establish a monthly update rhythm with your team
3. Use the decision-making framework to take action on insights
4. Review and refine driver assumptions as more data becomes available

This technical playbook provides the foundation for a robust, data-driven approach to financial planning at BLCK VC. By implementing this framework, you'll shift from reactive financial management to proactive strategic decision-making.
