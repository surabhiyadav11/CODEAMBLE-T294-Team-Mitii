import streamlit as st
from utils import load_css, render_footer

# ── Page config (must be first Streamlit call) ────────────────
st.set_page_config(
    page_title="KisanMitra – Smart Farming Advisor",
    page_icon="🌾",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# Load global CSS stylesheet with UTF-8 encoding
load_css()

# Initialize session state for navigation
if "page" not in st.session_state:
    st.session_state.page = "landing"

# Import all section modules from sections/
from sections import (
    landing,
    menu,
    advisor,
    harvest,
    hyperlocal,
    alerts,
    satellite,
    soil,
    market,
)

# ── Router ──────────────────────────────────────────────────
current_page = st.session_state.page

if current_page == "landing":
    landing.show()
elif current_page == "menu":
    menu.show()
elif current_page == "advisor":
    advisor.show()
elif current_page == "harvest":
    harvest.show()
elif current_page == "hyperlocal":
    hyperlocal.show()
elif current_page == "alerts":
    alerts.show()
elif current_page == "satellite":
    satellite.show()
elif current_page == "soil":
    soil.show()
elif current_page == "market":
    market.show()
else:
    st.session_state.page = "landing"
    st.rerun()

render_footer()
