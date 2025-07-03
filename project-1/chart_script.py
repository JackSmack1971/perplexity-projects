import pandas as pd
import plotly.graph_objects as go
import plotly.express as px

# Load the data
df = pd.read_csv("youtube_shorts_performance_comparison.csv")

# Display the data to understand its structure
print("Data structure:")
print(df.head())
print("\nColumns:", df.columns.tolist())

# Assume the data has columns for platform and CTR
# Let's check what columns exist and adapt accordingly
if 'Platform' in df.columns and 'CTR' in df.columns:
    platform_col = 'Platform'
    ctr_col = 'CTR'
elif 'platform' in df.columns and 'ctr' in df.columns:
    platform_col = 'platform'
    ctr_col = 'ctr'
else:
    # Try to find relevant columns
    platform_col = [col for col in df.columns if 'platform' in col.lower()][0]
    ctr_col = [col for col in df.columns if 'ctr' in col.lower() or 'click' in col.lower()][0]

print(f"\nUsing columns: {platform_col}, {ctr_col}")

# Create colors - YouTube Shorts gets standout color, others muted
colors = []
for platform in df[platform_col]:
    if 'YouTube' in platform or 'Shorts' in platform:
        colors.append('#DB4545')  # Standout red for YouTube Shorts
    else:
        colors.append('#5D878F')  # Muted cyan for others

# Create the bar chart
fig = go.Figure()

fig.add_trace(go.Bar(
    x=df[platform_col],
    y=df[ctr_col],
    marker_color=colors,
    text=[f"{val:.1f}%" for val in df[ctr_col]],
    textposition='outside',
    textfont=dict(size=12),
    cliponaxis=False
))

# Update layout
fig.update_layout(
    title="YouTube Shorts Dominate Click-Through Rates",
    xaxis_title="Platform",
    yaxis_title="CTR (%)",
    showlegend=False
)

# Update axes
fig.update_xaxes(tickangle=45)
fig.update_yaxes(range=[0, max(df[ctr_col]) * 1.1])

# Save the chart
fig.write_image("youtube_shorts_ctr_comparison.png")
print("\nChart saved as youtube_shorts_ctr_comparison.png")