import os
import streamlit as st
import streamlit.components.v1 as components

# ─────────────────────────────────────────────────────────────────────────────
# PAGE CONFIGURATION
# ─────────────────────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="DiabPredict — AI-Powered Diabetes Risk Assessment",
    page_icon="🩺",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# ─────────────────────────────────────────────────────────────────────────────
# STREAMLIT CHROME CLEANUP (Full viewport canvas)
# ─────────────────────────────────────────────────────────────────────────────
st.markdown(
    """
    <style>
        #MainMenu, header, footer,
        [data-testid="stToolbar"],
        [data-testid="stDecoration"],
        [data-testid="stStatusWidget"],
        [data-testid="stHeader"] {
            visibility: hidden !important;
            display: none !important;
            height: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
        }
        .stApp {
            background-color: #0c1128 !important;
            margin: 0 !important;
            padding: 0 !important;
        }
        .block-container {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
        }
        iframe {
            width: 100% !important;
            border: none !important;
            display: block !important;
            min-height: 100vh !important;
        }
    </style>
    """,
    unsafe_allow_html=True,
)

# ─────────────────────────────────────────────────────────────────────────────
# LOAD PIXEL-PERFECT SELF-CONTAINED REACT APPLICATION BUNDLE
# ─────────────────────────────────────────────────────────────────────────────
current_dir = os.path.dirname(os.path.abspath(__file__))
bundle_path = os.path.join(current_dir, "dist", "index_bundle.html")

if not os.path.exists(bundle_path):
    # Fallback to dist/index.html if bundle not found
    bundle_path = os.path.join(current_dir, "dist", "index.html")

if os.path.exists(bundle_path):
    with open(bundle_path, "r", encoding="utf-8") as f:
        app_html = f.read()
else:
    app_html = """
    <div style="color:white;background:#0c1128;padding:40px;text-align:center;font-family:sans-serif;">
        <h2>DiabPredict Application Bundle Initializing...</h2>
        <p>Please build the frontend using <code>npm run build && node bundle.js</code></p>
    </div>
    """

# Render the application
components.html(app_html, height=1350, scrolling=True)
