// The Vite single-file plugin already creates dist/index.html with all
// JavaScript and CSS inlined. Streamlit reads that file directly from app.py.
// This file is kept only for backwards compatibility with older checkouts.
console.log('DiabPredict: Vite single-file build is used directly; no post-processing required.')
