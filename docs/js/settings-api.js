"use strict";(self.webpackChunk_4trocket_dashboard=self.webpackChunk_4trocket_dashboard||[]).push([[87],{609:(e,t,o)=>{var r=o(328);window.addEventListener("DOMContentLoaded",(()=>{(0,r.GI)();const e=document.querySelector("#copy"),t=document.querySelector(".copy");e.addEventListener("click",(e=>{var t;t=document.querySelector("#key").textContent,navigator.clipboard.writeText(t).then(u,(function(e){console.error("Async: Could not copy text: ",e)}))}));const o=document.querySelector("#keyInput"),n=o.closest(".textfield"),c=n.querySelector(".helper-text"),s=document.querySelector("#createKey");s.addEventListener("click",(e=>{return o.value?o.value.length<3?(n.classList.add("error"),void(c.textContent="Вы ввели менее 3-х символов")):(n.classList.contains("error")&&n.classList.remove("error"),r=o.value,document.querySelector("#key").textContent=r,t.style.display="flex",s.setAttribute("disabled",!0),void(o.value="")):(n.classList.add("error"),void(c.textContent="Нужно ввести название ключа"));var r}));const d=document.querySelector("#modal"),l=new r.u_,a=l.modal.querySelector("#delete");function u(){const e=document.querySelector(".copy__done");e.textContent="Ключ скопирован",e.classList.add("show"),setTimeout((()=>{e.classList.remove("show")}),3e3)}d.addEventListener("click",(e=>{e.stopPropagation(),l.open(),a.addEventListener("click",(()=>{l.close(),t.style.display="none"}))}))}))}},e=>{e(e.s=609)}]);