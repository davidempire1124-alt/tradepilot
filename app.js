const pages=document.querySelectorAll(".page"), tabs=document.querySelectorAll(".tab");
function showPage(id){pages.forEach(p=>p.classList.toggle("active",p.id===id));tabs.forEach(t=>t.classList.toggle("active",t.dataset.page===id));window.scrollTo(0,0)}
document.addEventListener("click",e=>{const b=e.target.closest("[data-page]");if(b)showPage(b.dataset.page)});
document.querySelectorAll(".toggle").forEach(t=>t.addEventListener("click",()=>t.classList.toggle("on")));

document.getElementById("speedRun").onclick=()=>{
  const status=document.querySelector("#speed .status"), processed=document.getElementById("processed"), digit=document.getElementById("digit"), pl=document.getElementById("pl");
  status.textContent="Simulation running…";
  let i=0,p=0;
  const timer=setInterval(()=>{i+=Math.floor(Math.random()*8)+1;digit.textContent=Math.floor(Math.random()*10);p+=(Math.random()>.5?.5:-.5);processed.textContent=i;pl.textContent=p.toFixed(2)},120);
  setTimeout(()=>{clearInterval(timer);status.textContent="Simulation complete — no live trade was placed."},2400);
};

document.getElementById("bulkRun").onclick=()=>{
  const n=Math.min(100000,Math.max(10,Number(document.getElementById("bulkTicks").value)||1000));
  const stake=Number(document.getElementById("bulkStake").value)||.5;
  let counts=Array(10).fill(0), wins=0;
  for(let i=0;i<n;i++){let d=Math.floor(Math.random()*10);counts[d]++;if((d%2===0) === (Math.random()>.5))wins++}
  const win=wins/n, loss=1-win, profit=(wins-(n-wins))*stake;
  document.getElementById("winPct").textContent=(win*100).toFixed(2)+"%";
  document.getElementById("lossPct").textContent=(loss*100).toFixed(2)+"%";
  document.getElementById("profit").textContent=(profit>=0?"+":"")+profit.toFixed(2);
  document.getElementById("edge").textContent=((win-.5)*100).toFixed(2)+"%";
  const dg=document.getElementById("digitGrid");dg.innerHTML=counts.map((c,i)=>`<div><b>${i}</b><br>${((c/n)*100).toFixed(1)}%</div>`).join("");
  const max=Math.max(...counts),bars=document.getElementById("bars");
  bars.innerHTML=counts.map((c,i)=>`<div class="bar"><i style="width:${(c/max)*100}%"></i><span>Digit ${i}: ${c}</span></div>`).join("");
  document.getElementById("bulkResult").classList.remove("hidden");
};

document.getElementById("downloadConfig").onclick=()=>{
  const cfg={name:document.getElementById("botName").value,version:1,type:"simulation-only",createdAt:new Date().toISOString()};
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(cfg,null,2)],{type:"application/json"}));a.download="bot-config.json";a.click();
};
document.getElementById("saveBot").onclick=()=>alert("Bot configuration saved locally in this demo.");
