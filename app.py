from pathlib import Path

import streamlit as st

st.set_page_config(
    page_title="DiabPredict — AI-Powered Diabetes Risk Assessment",
    page_icon="🩺",
    layout="wide",
    initial_sidebar_state="collapsed",
)

BASE_DIR = Path(__file__).resolve().parent
FRONTEND = BASE_DIR / "dist" / "index.html"

if not FRONTEND.is_file():
    st.error(
        "DiabPredict frontend bundle was not found. "
        "Run `npm install` followed by `npm run build`, then start Streamlit again."
    )
    st.stop()

# Hide Streamlit chrome. The React app is rendered as a real local HTML iframe
# using Streamlit's current iframe API. This avoids the legacy components.html()
# wrapper, which was the source of the blank page on Streamlit Cloud.
st.markdown(
    """
    <style>
        #MainMenu, header, footer,
        [data-testid="stToolbar"],
        [data-testid="stDecoration"],
        [data-testid="stStatusWidget"],
        [data-testid="stHeader"] {
            display: none !important;
            visibility: hidden !important;
        }

        .stApp {
            background: #0c1128 !important;
        }

        .block-container {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
        }

        [data-testid="stAppViewContainer"] {
            padding: 0 !important;
        }
    </style>
    """,
    unsafe_allow_html=True,
)

# Streamlit >= 1.56 supports local HTML files directly. The HTML file contains
# the complete Vite single-file React build, including its CSS and JavaScript.
st.iframe(FRONTEND, height=1800)
