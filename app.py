import streamlit as st
from utils import load_css

# ── Page config ────────────────────────────────────────────
st.set_page_config(
    page_title="KisanMitra – Smart Farming Advisor",
    page_icon="🌾",
    layout="wide",
    initial_sidebar_state="collapsed",
)

load_css()

# ── Default page ───────────────────────────────────────────
if "page" not in st.session_state:
    st.session_state.page = "landing"

# ── Import all section modules ─────────────────────────────
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

# ── Router ─────────────────────────────────────────────────
p = st.session_state.page

if   p == "landing":    landing.show()
elif p == "menu":       menu.show()
elif p == "advisor":    advisor.show()
elif p == "harvest":    harvest.show()
elif p == "hyperlocal": hyperlocal.show()
elif p == "alerts":     alerts.show()
elif p == "satellite":  satellite.show()
elif p == "soil":       soil.show()
elif p == "market":     market.show()
else:
    st.session_state.page = "landing"
    st.rerun()