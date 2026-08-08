import streamlit as st
from datetime import datetime


def load_css():
    with open("styles.css", "r", encoding="utf-8") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)


def nav_bar(show_back=True, back_label="Back", back_page="landing"):
    c1, c2 = st.columns([6, 1])
    with c1:
        st.markdown('<div class="nav-logo">KisanMitra</div>', unsafe_allow_html=True)
    if show_back:
        with c2:
            if st.button(back_label, key=f"back_{back_page}_{st.session_state.page}"):
                st.session_state.page = back_page
                st.rerun()


def footer():
    st.markdown(
        '<div class="footer">KisanMitra - Built with Python and Streamlit</div>',
        unsafe_allow_html=True)


def day_name(date_str):
    try:
        return datetime.strptime(date_str, "%Y-%m-%d").strftime("%A")
    except Exception:
        return date_str