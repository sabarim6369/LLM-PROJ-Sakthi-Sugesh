import { useState } from 'react';


export default function App() {
const [text, setText] = useState('');
const [result, setResult] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);


const fixGrammar = async () => {
setLoading(true);
setError(null);
setResult('');


try {
const res = await fetch('http://localhost:4000/api/fix-grammar', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ text })
});
const data = await res.json();
if (!res.ok) throw new Error(data.error || 'Server error');
setResult(data.corrected || JSON.stringify(data));
} catch (e) {
setError(e.message);
} finally {
setLoading(false);
}
};


return (
<div style={styles.container}>
<div style={styles.background}></div>
<div style={styles.card}>
<div style={styles.header}>
<h1 style={styles.title}>
✨ AI Grammar Fixer
</h1>
<p style={styles.subtitle}>Transform your text with AI-powered corrections</p>
</div>


<div style={styles.inputSection}>
<label style={styles.label}>Your Text</label>
<textarea
value={text}
onChange={e => setText(e.target.value)}
placeholder="Type or paste your text here..."
style={styles.textarea}
/>
<div style={styles.charCount}>{text.length} characters</div>
</div>


<button
onClick={fixGrammar}
disabled={loading || !text}
style={{
...styles.button,
...(loading || !text ? styles.buttonDisabled : {})
}}
>
{loading ? (
<>
<span style={styles.spinner}></span>
Fixing...
</>
) : (
<>
<span style={styles.buttonIcon}>🚀</span>
Fix Grammar
</>
)}
</button>


{error && (
<div style={styles.error}>
<span style={styles.errorIcon}>⚠️</span>
{error}
</div>
)}


{result && (
<div style={styles.result}>
<div style={styles.resultHeader}>
<h2 style={styles.resultTitle}>
<span style={styles.checkmark}>✓</span>
Corrected Text
</h2>
</div>
<pre style={styles.resultText}>{result}</pre>
<button
onClick={() => navigator.clipboard.writeText(result)}
style={styles.copyButton}
>
📋 Copy to Clipboard
</button>
</div>
)}
</div>
</div>
);
}


const styles = {
container: {
minHeight: '100vh',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
padding: '20px',
position: 'relative',
overflow: 'hidden',
fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
},
background: {
position: 'fixed',
top: 0,
left: 0,
right: 0,
bottom: 0,
// background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
background: 'black',

zIndex: -1,
},
card: {
background: 'rgba(255, 255, 255, 0.95)',
backdropFilter: 'blur(10px)',
borderRadius: '24px',
padding: '40px',
maxWidth: '800px',
width: '100%',
boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
animation: 'fadeIn 0.5s ease-in',
},
header: {
textAlign: 'center',
marginBottom: '32px',
},
title: {
fontSize: '42px',
fontWeight: '800',
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
WebkitBackgroundClip: 'text',
WebkitTextFillColor: 'transparent',
margin: '0 0 8px 0',
},
subtitle: {
color: '#666',
fontSize: '16px',
margin: 0,
},
inputSection: {
marginBottom: '24px',
},
label: {
display: 'block',
fontSize: '14px',
fontWeight: '600',
color: '#333',
marginBottom: '8px',
},
textarea: {
width: '100%',
minHeight: '180px',
padding: '16px',
fontSize: '16px',
border: '2px solid #e0e0e0',
borderRadius: '12px',
resize: 'vertical',
fontFamily: 'inherit',
transition: 'all 0.3s ease',
outline: 'none',
boxSizing: 'border-box',
},
charCount: {
fontSize: '12px',
color: '#999',
marginTop: '8px',
textAlign: 'right',
},
button: {
width: '100%',
padding: '16px 32px',
fontSize: '18px',
fontWeight: '600',
color: 'white',
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
border: 'none',
borderRadius: '12px',
cursor: 'pointer',
transition: 'all 0.3s ease',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
gap: '8px',
boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
},
buttonDisabled: {
opacity: 0.6,
cursor: 'not-allowed',
boxShadow: 'none',
},
buttonIcon: {
fontSize: '20px',
},
spinner: {
width: '16px',
height: '16px',
border: '2px solid rgba(255, 255, 255, 0.3)',
borderTop: '2px solid white',
borderRadius: '50%',
animation: 'spin 1s linear infinite',
display: 'inline-block',
},
error: {
marginTop: '20px',
padding: '16px',
background: '#fee',
border: '2px solid #fcc',
borderRadius: '12px',
color: '#c33',
display: 'flex',
alignItems: 'center',
gap: '8px',
fontSize: '14px',
},
errorIcon: {
fontSize: '20px',
},
result: {
marginTop: '32px',
padding: '24px',
background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
borderRadius: '16px',
animation: 'slideIn 0.4s ease-out',
},
resultHeader: {
marginBottom: '16px',
},
resultTitle: {
fontSize: '20px',
fontWeight: '700',
color: '#333',
margin: 0,
display: 'flex',
alignItems: 'center',
gap: '8px',
},
checkmark: {
color: '#10b981',
fontSize: '24px',
},
resultText: {
whiteSpace: 'pre-wrap',
wordBreak: 'break-word',
fontSize: '16px',
lineHeight: '1.6',
color: '#333',
background: 'white',
padding: '20px',
borderRadius: '12px',
margin: '0 0 16px 0',
fontFamily: 'inherit',
},
copyButton: {
padding: '10px 20px',
fontSize: '14px',
fontWeight: '600',
color: '#667eea',
background: 'white',
border: '2px solid #667eea',
borderRadius: '8px',
cursor: 'pointer',
transition: 'all 0.3s ease',
},
};


// Add this CSS to your index.css or create a style tag
const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes fadeIn {
from { opacity: 0; transform: translateY(20px); }
to { opacity: 1; transform: translateY(0); }
}
@keyframes slideIn {
from { opacity: 0; transform: translateY(10px); }
to { opacity: 1; transform: translateY(0); }
}
@keyframes spin {
to { transform: rotate(360deg); }
}
textarea:focus {
border-color: #667eea !important;
box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
}
button:not(:disabled):hover {
transform: translateY(-2px);
box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4) !important;
}
button:active {
transform: translateY(0);
}
`;
document.head.appendChild(styleSheet);