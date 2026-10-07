import os
import re
import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(
    page_title="DiabPredict — AI-Powered Diabetes Risk Assessment",
    page_icon="🩺",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# Streamlit's components.html() already creates an iframe.  Passing a complete
# <html> document to it can result in a blank iframe in some browsers.  We
# therefore extract the self-contained Vite CSS/JS and render only the fragment
# that belongs inside the iframe body.
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BUNDLE_PATH = os.path.join(BASE_DIR, "dist", "index.html")

if not os.path.isfile(BUNDLE_PATH):
    st.error("DiabPredict frontend bundle was not found. Run `npm run build` first.")
    st.stop()

with open(BUNDLE_PATH, "r", encoding="utf-8") as f:
    document = f.read()

# vite-plugin-singlefile puts the compiled CSS directly into <style> tags.
style_blocks = re.findall(
    r"<style(?:\s[^>]*)?>([\s\S]*?)</style>",
    document,
    flags=re.IGNORECASE,
)

# Only capture the actual Vite application script.  Do not use a generic
# <script> regex because the compiled JavaScript itself contains the text
# '<script>...</script>' in a React/DOM compatibility string.
script_match = re.search(
    r'<script\s+type=["\']module["\'][^>]*>([\s\S]*?)</script>',
    document,
    flags=re.IGNORECASE,
)

if not script_match:
    st.error("The compiled React application script was not found. Run `npm run build` again.")
    st.stop()

javascript = script_match.group(1)
css = "\n".join(style_blocks)

component_html = f"""
<style>
html, body {{
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    min-height: 100% !important;
    background: #0c1128 !important;
}}

body {{
    font-family: 'Outfit', system-ui, sans-serif;
    overflow-x: hidden;
}}

#root {{
    width: 100%;
    min-height: 100vh;
}}

{css}
</style>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

<div id="root"></div>

<script>
window.addEventListener('error', function (event) {{
    console.error('[DiabPredict] Runtime error:', event.error || event.message);
}});

try {{
{javascript}
}} catch (error) {{
    document.getElementById('root').innerHTML = `
        <div style="min-height:100vh;background:#0c1128;color:white;display:flex;align-items:center;justify-content:center;padding:40px;font-family:system-ui,sans-serif;text-align:center">
            <div>
                <h2 style="color:#00f0ff">DiabPredict failed to start</h2>
                <p style="color:#aaa">Open the browser console for the JavaScript error.</p>
                <pre style="color:#ff8080;white-space:pre-wrap;text-align:left">${{error}}</pre>
            </div>
        </div>`;
    console.error('[DiabPredict] Startup error:', error);
}}
</script>
"""

# Hide Streamlit chrome while keeping the component itself visible.
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
    </style>
    """,
    unsafe_allow_html=True,
)

components.html(component_html, height=1800, scrolling=True)
