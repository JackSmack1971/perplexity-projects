import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import numpy as np

# Load the data
df = pd.read_csv("youtube_shorts_content_strategies.csv")

# Create a list to store processed data
processed_data = []

# Process each row to find the maximum percentage increase
for index, row in df.iterrows():
    strategy = row['strategy']
    max_increase = 0
    
    # Check all metric columns for percentage values
    for col in df.columns[1:]:  # Skip the strategy column
        if pd.notna(row[col]) and isinstance(row[col], str) and '%' in row[col]:
            # Extract percentage value
            percentage = float(row[col].replace('%', ''))
            max_increase = max(max_increase, percentage)
    
    if max_increase > 0:
        processed_data.append({
            'strategy': strategy,
            'effectiveness_increase': max_increase
        })

# Create DataFrame from processed data
chart_df = pd.DataFrame(processed_data)

# Sort by effectiveness increase and take top 8
chart_df = chart_df.sort_values('effectiveness_increase', ascending=False).head(8)

# Create abbreviated strategy names (15 char limit)
chart_df['strategy_abbrev'] = chart_df['strategy'].apply(lambda x: 
    x[:15] if len(x) <= 15 else x[:12] + '...')

# Create horizontal bar chart
fig = go.Figure()

# Create gradient colors from light to dark using the brand colors
colors = ['#1FB8CD', '#FFC185', '#ECEBD5', '#5D878F', '#D2BA4C', '#B4413C', '#964325', '#944454']

# Add bars with gradient effect
fig.add_trace(go.Bar(
    y=chart_df['strategy_abbrev'],
    x=chart_df['effectiveness_increase'],
    orientation='h',
    marker=dict(
        color=chart_df['effectiveness_increase'],
        colorscale=[[0, colors[7]], [0.2, colors[6]], [0.4, colors[5]], [0.6, colors[4]], 
                   [0.8, colors[3]], [1, colors[0]]],
        showscale=False
    ),
    text=[f"{val}%" for val in chart_df['effectiveness_increase']],
    textposition='outside',
    cliponaxis=False
))

# Update layout
fig.update_layout(
    title="Most Effective YouTube Shorts Strategies",
    xaxis_title="Effectiveness %",
    yaxis_title="Strategy",
    showlegend=False
)

# Save the chart
fig.write_image("youtube_shorts_strategies_chart.png")

print("Chart created successfully!")
print(f"Top 8 strategies with their effectiveness increases:")
for i, row in chart_df.iterrows():
    print(f"{row['strategy']}: {row['effectiveness_increase']}%")