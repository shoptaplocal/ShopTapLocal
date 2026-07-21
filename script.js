const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav-links");
menuButton.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false");}));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target);}});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const productSelect=document.getElementById("productSelect");
document.querySelectorAll("[data-select]").forEach(link=>{
  link.addEventListener("click",()=>{
    const value=link.dataset.select;
    [...productSelect.options].forEach(option=>{if(option.text===value) productSelect.value=option.value;});
  });
});

document.getElementById("year").textContent=new Date().getFullYear();

const form=document.getElementById("orderForm");
const status=document.getElementById("formStatus");
form.addEventListener("submit",e=>{
  e.preventDefault();
  const data=new FormData(form);
  const subject=encodeURIComponent(`TapLocal Order Request - ${data.get("product")}`);
  const body=encodeURIComponent(
`Name: ${data.get("name")}
Business: ${data.get("business") || "Not provided"}
Email: ${data.get("email")}
Phone: ${data.get("phone") || "Not provided"}
Product: ${data.get("product")}
Destination: ${data.get("destination")}

Project details:
${data.get("details") || "No additional details"}`
  );
  status.textContent="Opening your email app...";
  window.location.href=`mailto:shop.taplocal@gmail.com?subject=${subject}&body=${body}`;
});
