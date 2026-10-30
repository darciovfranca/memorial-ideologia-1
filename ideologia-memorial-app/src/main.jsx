import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const TOTAL_STICKERS = 52;
const chapters = Array.from({length: 6}, (_,i) => ({
  id: i+1, title: `Capítulo ${i+1}`,
  text: "INSERIR AQUI O TEXTO DEFINITIVO DO CAPÍTULO. Este espaço está reservado para a narrativa histórica aprovada do Memorial do Rap."
}));
const albums = [1,2].map(n => ({
  id:n, title:`Álbum ${n}`,
  tracks:Array.from({length:13},(_,i)=>({id:(n-1)*13+i+1,title:`Faixa ${(n-1)*13+i+1}`,audio:""}))
}));
const stickers = Array.from({length:TOTAL_STICKERS},(_,i)=>({
  id:i+1, album:i<26?1:2, name:`Figurinha ${String(i+1).padStart(2,"0")}`,
  rarity:"A definir", hint:"Inserir a dica verdadeira desta figurinha.",
  keyword:`CHAVE${String(i+1).padStart(2,"0")}`
}));

function App(){
  const [tab,setTab]=useState("inicio");
  const [album,setAlbum]=useState(1);
  const [collected,setCollected]=useState(()=>JSON.parse(localStorage.getItem("ideologia-stickers")||"[]"));
  const [keys,setKeys]=useState({});
  const [message,setMessage]=useState("");
  const [chapter,setChapter]=useState(1);
  const [track,setTrack]=useState(null);
  const [audio,setAudio]=useState(null);
  const [admin,setAdmin]=useState(false);
  useEffect(()=>localStorage.setItem("ideologia-stickers",JSON.stringify(collected)),[collected]);
  const unlockedSongs=Math.floor(collected.length/2);
  const percent=Math.round(collected.length/TOTAL_STICKERS*100);
  const albumTracks=albums.find(a=>a.id===album).tracks;
  function submitKey(id){
    const item=stickers.find(s=>s.id===id);
    if((keys[id]||"").trim().toUpperCase()===item.keyword){
      if(!collected.includes(id)) setCollected(v=>[...v,id]);
      setMessage(`Figurinha ${id} desbloqueada!`);
    } else setMessage("Palavra-chave não confere. Verifique a dica e tente novamente.");
  }
  function playSong(song){
    if(song.id>unlockedSongs){setMessage(`Esta faixa será liberada quando você conquistar ${song.id*2} figurinhas.`);return;}
    setTrack(song);
    if(song.audio){setAudio(song.audio);}
    else {setAudio(null);setMessage("Faixa liberada. Adicione o arquivo de áudio definitivo no cadastro da música.");}
  }
  return <div className="app">
    <header><div className="brand">IDEOLOGIA <span>MEMORIAL DO RAP</span></div><button className="admin" onClick={()=>setAdmin(!admin)}>{admin?"Sair do modo edição":"Modo edição"}</button></header>
    <section className="hero"><p className="eyebrow">RIBEIRÃO PRETO • DESDE OS ANOS 1990</p><h1>A história continua<br/><em>na voz do povo.</em></h1><p>Memória, música e resistência. Uma trajetória contada em dois álbuns, figurinhas e seis capítulos.</p><div className="progress"><div><b>{collected.length}/52</b><span>figurinhas conquistadas</span></div><div><b>{unlockedSongs}/26</b><span>músicas desbloqueadas</span></div><div><b>{percent}%</b><span>coleção completa</span></div></div></section>
    <nav>{[["inicio","Início"],["figurinhas","Figurinhas"],["musicas","Álbuns e músicas"],["historia","História"]].map(([id,label])=><button className={tab===id?"active":""} onClick={()=>setTab(id)} key={id}>{label}</button>)}</nav>
    {message&&<div className="message"><span>{message}</span><button onClick={()=>setMessage("")}>×</button></div>}
    {tab==="inicio"&&<main className="intro"><h2>Um memorial vivo</h2><p>Explore a história do grupo, descubra as palavras-chave das figurinhas e desbloqueie as músicas. A coleção musical e a narrativa histórica têm progressos independentes.</p><div className="tiles"><button onClick={()=>setTab("figurinhas")}><strong>52</strong><span>figurinhas para descobrir</span></button><button onClick={()=>setTab("musicas")}><strong>26</strong><span>faixas em dois álbuns</span></button><button onClick={()=>setTab("historia")}><strong>06</strong><span>capítulos da trajetória</span></button></div><p className="rule">REGRA DE DESBLOQUEIO: a cada 2 figurinhas conquistadas, 1 música é liberada. A história não interfere nesse cálculo.</p></main>}
    {tab==="figurinhas"&&<main><div className="sectionhead"><div><p className="eyebrow">COLEÇÃO</p><h2>Figurinhas</h2></div><div className="count">{collected.length} de 52</div></div><div className="stickers">{stickers.map(s=><article className={`sticker ${collected.includes(s.id)?"won":""}`} key={s.id}><div className="sticker-art">{collected.includes(s.id)?"★":"?"}</div><b>{s.name}</b><small>{s.rarity} • Álbum {s.album}</small><p>{s.hint}</p>{!collected.includes(s.id)&&<div className="keyrow"><input aria-label={`Palavra-chave da figurinha ${s.id}`} placeholder="Palavra-chave" value={keys[s.id]||""} onChange={e=>setKeys(v=>({...v,[s.id]:e.target.value}))}/><button onClick={()=>submitKey(s.id)}>Enviar</button></div>}{collected.includes(s.id)&&<small className="wonlabel">CONQUISTADA</small>}</article>)}</div></main>}
    {tab==="musicas"&&<main><div className="sectionhead"><div><p className="eyebrow">TRILHA SONORA</p><h2>Dois álbuns. 26 faixas.</h2></div><div className="count">{unlockedSongs}/26 liberadas</div></div><div className="albumtabs">{albums.map(a=><button className={album===a.id?"selected":""} onClick={()=>setAlbum(a.id)} key={a.id}>{a.title} <small>13 faixas</small></button>)}</div><div className="tracks">{albumTracks.map(s=><div className="track" key={s.id}><span className="tracknum">{String(s.id).padStart(2,"0")}</span><div><b>{s.title}</b><small>{s.id<=unlockedSongs?"Disponível":"Bloqueada • "+(s.id*2)+" figurinhas necessárias"}</small></div><button disabled={s.id>unlockedSongs} onClick={()=>playSong(s)}>{s.id<=unlockedSongs?"▶ Ouvir":"🔒"}</button></div>)}</div>{audio&&<audio controls autoPlay src={audio}/ >}{track&&<p className="nowplaying">Selecionada: {track.title}</p>}</main>}
    {tab==="historia"&&<main><p className="eyebrow">MEMÓRIA E TRAJETÓRIA</p><h2>Seis capítulos</h2><p className="muted">O avanço da história é independente das figurinhas e do desbloqueio das músicas.</p><div className="storylayout"><div className="chapterlist">{chapters.map(c=><button className={chapter===c.id?"selected":""} onClick={()=>setChapter(c.id)} key={c.id}>0{c.id} — {c.title}</button>)}</div><article className="chapter"><p className="eyebrow">CAPÍTULO 0{chapter}</p><h3>{chapters[chapter-1].title}</h3><p>{chapters[chapter-1].text}</p></article></div></main>}
    {admin&&<aside className="adminnote"><b>Área de edição / configuração</b><p>Este pacote é a base independente do aplicativo. Os nomes, dicas, palavras-chave, textos históricos, capas e arquivos de áudio definitivos precisam ser inseridos nos arquivos de dados antes da publicação.</p><button onClick={()=>{setCollected([]);localStorage.removeItem("ideologia-stickers");setMessage("Progresso local reiniciado.");}}>Reiniciar progresso deste navegador</button></aside>}
    <footer>IDEOLOGIA — MEMORIAL DO RAP <span>Projeto independente • 2026</span></footer>
  </div>
}
createRoot(document.getElementById("root")).render(<App/>);
