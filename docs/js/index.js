"use strict";(self.webpackChunk_4trocket_dashboard=self.webpackChunk_4trocket_dashboard||[]).push([[826],{971:(e,t,n)=>{var o=n(328);function r(e){return`\n    <tr>\n      <td>${e.name??""}</td>\n      <td>${e.amount??""}</td>\n      <td>${e.price?e.price+" ₽":""}</td>\n      <td>${e.summary?e.summary+" ₽":""} </td>\n      <td>${e.volume??""}</td>\n      <td>${e.weight??""}</td>\n    </tr>\n  `}function c(e){return`\n    <tr>\n      <td>${e.created_at??""}</td>\n      <td>${e.event??""}</td>\n      <td>${e.created_by??""}</td>\n    </tr>\n  `}function d(e={},t){const n="checkout_table"===t.id?r:c,o=document.createElement("tbody");e.forEach((e=>{const t=n(e);o.insertAdjacentHTML("beforeend",t)})),console.dir(t),t.tBodies[0].replaceChildren(...o.children)}window.addEventListener("DOMContentLoaded",(()=>{(0,o.GI)(),(0,o.XA)(document.querySelectorAll("select")),document.querySelectorAll(".date-filter input").forEach(o.X8);const e=new o.u_("#order_details");document.querySelectorAll("table#orders .table__action a").forEach((e=>{e.addEventListener("click",a)}));const t=e.modal.querySelector("#cancel_trigger"),n=new o.u_("#cancel_modal");t.addEventListener("click",(()=>n.open()));const r=e.modal.querySelector("#note_trigger"),c=new o.u_("#note_modal");async function a(t){const n=await fetch("/assets/mock/orderData.json").then((async e=>await e.json()));e.modal.querySelector("#order_id").textContent=n.order_id;const o=e.modal.querySelector("#order_section").querySelectorAll(":scope .row > div:last-child > *"),r=Object.values(n.order);o.forEach(((e,t)=>{if(!r[t])return!1;e.textContent=r[t]}));const c=document.body.querySelector("#buyer_section").querySelectorAll(":scope .row > div:last-child > *"),a=Object.values(n.buyer);c.forEach(((e,t)=>{e.textContent=a[t]}));const l=e.modal.querySelector("#checkout_table"),s=e.modal.querySelector("#changes_table");d(n.checkout.positions,l),d(n.changes.positions,s),e.open()}r.addEventListener("click",(()=>{c.open()}))}))}},e=>{e(e.s=971)}]);