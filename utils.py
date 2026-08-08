import os
import streamlit as st
from datetime import datetime

def load_css():
    """Reads styles.css using encoding='utf-8' explicitly to prevent Windows UnicodeDecodeError."""
    css_path = os.path.join(os.path.dirname(__file__), "styles.css")
    if os.path.exists(css_path):
        with open(css_path, "r", encoding="utf-8") as f:
            css = f.read()
        st.markdown(f"<style>{css}</style>", unsafe_allow_html=True)
    else:
        st.warning("styles.css not found in project directory.")

def nav_bar(current_page="landing"):
    """Renders top header / back navigation bar for feature pages."""
    col1, col2 = st.columns([6, 2])
    with col1:
        st.markdown("""
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:15px;">
            <span style="font-family:'Fraunces',serif; font-size:1.6rem; font-weight:700; color:#1F3D2B;">KisanMitra 🌾</span>
            <span style="background:#E8F0E9; color:#1F3D2B; font-size:0.8rem; font-weight:600; padding:3px 10px; border-radius:12px;">Maharashtra Farm Advisor</span>
        </div>
        """, unsafe_allow_html=True)
    with col2:
        if current_page != "landing":
            if st.button("🏠 Home Landing Page", key=f"nav_home_{current_page}", use_container_width=True):
                st.session_state.page = "landing"
                st.rerun()
        if current_page != "menu":
            if st.button("📋 All 7 Features", key=f"nav_menu_{current_page}", use_container_width=True):
                st.session_state.page = "menu"
                st.rerun()

def render_footer():
    """Renders global clean footer at the bottom of the page."""
    st.markdown("""
    <footer class="km-global-footer">
        <div style="text-align:center; padding: 24px 0 16px; border-top: 1px solid #E2D9C8; margin-top:40px;">
            <div style="font-family:'Fraunces',serif; font-size:1.1rem; font-weight:600; color:#1F3D2B; margin-bottom:6px;">
                KisanMitra 🌾 &nbsp;•&nbsp; Smart Agriculture Platform for Maharashtra
            </div>
            <div style="font-size:0.85rem; color:#6C7C70; margin-bottom:8px;">
                Powered by OpenWeatherMap API &nbsp;|&nbsp; Streamlit &nbsp;|&nbsp; Python 3.10+
            </div>
            <div style="font-size:0.78rem; color:#8C9C90;">
                © 2026 KisanMitra Project. Designed for precision yield optimization & weather risk mitigation.
            </div>
        </div>
    </footer>
    """, unsafe_allow_html=True)

def day_name(date_str):
    """Converts a YYYY-MM-DD string to day of week (e.g., Monday)."""
    try:
        dt = datetime.strptime(date_str, "%Y-%m-%d")
        return dt.strftime("%A")
    except Exception:
        return date_str
