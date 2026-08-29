"use client";

import { ChangeEvent, useMemo, useState } from "react";
const motions = ["Subtle portrait", "Slow orbit", "Handheld energy", "Dolly in"];

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("A quiet inhale, natural eye movement, soft film grain");
  const [motion, setMotion] = useState(motions[0]);
  const [duration, setDuration] = useState("5 seconds");
  const [status, setStatus] = useState<"idle" | "rendering" | "ready">("idle");
  const previewStyle = useMemo(() => (image ? { backgroundImage: `url(${image})` } : undefined), [image]);
  function selectImage(event: ChangeEvent<HTMLInputElement>) { const file = event.target.files?.[0]; if (file) { setImage(URL.createObjectURL(file)); setStatus("idle"); } }
  function createMotion() { if (!image || status === "rendering") return; setStatus("rendering"); window.setTimeout(() => setStatus("ready"), 1350); }
  const label = status === "rendering" ? "Rendering…" : status === "ready" ? "Render another" : "Create motion";
  return <main className="studio-shell">
    <aside className="sidebar"><a className="brand" href="#top"><span>◒</span> KINETIC</a><nav aria-label="Workspace navigation"><a className="active" href="#create">Create</a><a href="#library">Library <span>12</span></a><a href="#settings">Settings</a></nav><div className="side-note"><i /> Local workspace<br /><small>Your source media stays on this device.</small></div></aside>
    <section className="workspace" id="top"><header><div><p className="eyebrow">Image → Motion</p><h1>Bring a still frame forward.</h1></div><button className="account" aria-label="Open account menu">AW</button></header>
      <div className="editor" id="create"><section className="canvas-column"><div className={`preview ${image ? "has-image" : ""}`} style={previewStyle}>{!image && <div className="empty-state"><span className="empty-icon">↑</span><strong>Drop an image here</strong><p>PNG, JPG, or WEBP · up to 20 MB</p></div>}{image && <div className="preview-tag">Source frame</div>}</div><label className="upload-button">{image ? "Replace image" : "Choose image"}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={selectImage} /></label>{status === "ready" && <div className="result-card"><span>✓</span><div><strong>Motion draft is ready</strong><p>{motion} · {duration} · 1080p</p></div><button>Export</button></div>}</section>
        <section className="controls" aria-label="Animation controls"><div className="control-head"><p className="eyebrow">01 / Direction</p><span>Draft mode</span></div><label className="field-label" htmlFor="prompt">Motion prompt</label><textarea id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} /><div className="field-row"><span className="field-label">Motion language</span><button className="text-button">Guide</button></div><div className="pills">{motions.map((item) => <button key={item} className={motion === item ? "selected" : ""} onClick={() => setMotion(item)}>{item}</button>)}</div><div className="divider" /><div className="split-fields"><label><span className="field-label">Duration</span><select value={duration} onChange={(e) => setDuration(e.target.value)}><option>3 seconds</option><option>5 seconds</option><option>8 seconds</option></select></label><label><span className="field-label">Format</span><select defaultValue="16:9"><option>16:9</option><option>9:16</option><option>1:1</option></select></label></div><label className="range-label"><span>Motion strength</span><b>42</b><input type="range" min="0" max="100" defaultValue="42" /></label><button className="create-button" onClick={createMotion} disabled={!image || status === "rendering"}>{label}<span>↗</span></button>{!image && <p className="helper">Add a source image to start a render.</p>}</section></div>
      <section className="recent" id="library"><div><p className="eyebrow">Recent studies</p><h2>Continue shaping</h2></div><a href="#library">View library →</a><div className="studies"><article className="study one"><span>PORTRAIT / 01</span></article><article className="study two"><span>LANDSCAPE / 02</span></article><article className="study three"><span>OBJECT / 03</span></article></div></section>
    </section></main>;
}
