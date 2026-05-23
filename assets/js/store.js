
const defaultProducts = [{"id": 1, "name": "Racing Helmet Pro", "category": "Safety", "price": 18500, "oldPrice": 22000, "stock": 12, "rating": 4.8, "image": "assets/images/helmet.svg"}, {"id": 2, "name": "LED Headlight Kit", "category": "Lighting", "price": 7600, "oldPrice": 9200, "stock": 8, "rating": 4.6, "image": "assets/images/light.svg"}, {"id": 3, "name": "Digital Speed Meter", "category": "Electronics", "price": 12500, "oldPrice": 14500, "stock": 5, "rating": 4.7, "image": "assets/images/meter.svg"}, {"id": 4, "name": "Performance Tool Set", "category": "Maintenance", "price": 9900, "oldPrice": 11800, "stock": 20, "rating": 4.5, "image": "assets/images/tools.svg"}, {"id": 5, "name": "Riding Gloves", "category": "Safety", "price": 4200, "oldPrice": 5100, "stock": 15, "rating": 4.4, "image": "assets/images/gloves.svg"}, {"id": 6, "name": "Chain Cleaning Brush", "category": "Maintenance", "price": 1850, "oldPrice": 2400, "stock": 30, "rating": 4.3, "image": "assets/images/chain.svg"}];
let products = JSON.parse(localStorage.getItem("bikeHubProducts") || JSON.stringify(defaultProducts));
let cart = JSON.parse(localStorage.getItem("bikeHubCart") || "{}");

// ===== WhatsApp Order Configuration =====
// Replace this number with your real shop WhatsApp number before publishing.
// Format: country code + number, without + sign. Example: 94771234567
const WHATSAPP_PHONE = "94770000000";

function getWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

function buildCartWhatsAppMessage() {
  const entries = Object.entries(cart);

  if (!entries.length) {
    return "Hello Bike Hub, I want to ask about your bike accessories.";
  }

  let lines = [];
  lines.push("Hello Bike Hub, I want to place an order.");
  lines.push("");
  lines.push("Order Items:");

  let totalAmount = 0;

  entries.forEach(([id, qty]) => {
    const product = products.find(item => item.id === Number(id));
    if (!product) return;

    const lineTotal = product.price * Number(qty);
    totalAmount += lineTotal;

    lines.push(`- ${product.name} x ${qty} = ${lkr(lineTotal)}`);
  });

  lines.push("");
  lines.push(`Total: ${lkr(totalAmount)}`);
  lines.push("");
  lines.push("Customer Name:");
  lines.push("Phone:");
  lines.push("Delivery Address:");
  lines.push("");
  lines.push("Please confirm availability and delivery details.");

  return lines.join("\n");
}

function openWhatsAppCartOrder() {
  window.open(getWhatsAppUrl(buildCartWhatsAppMessage()), "_blank");
}

function openWhatsAppProductOrder(product) {
  if (!product) return;

  const message = [
    "Hello Bike Hub, I want to order this item.",
    "",
    `Product: ${product.name}`,
    `Category: ${product.category}`,
    `Price: ${lkr(product.price)}`,
    `Stock: ${product.stock}`,
    "",
    "Customer Name:",
    "Phone:",
    "Delivery Address:",
    "",
    "Please confirm availability and delivery details."
  ].join("\n");

  window.open(getWhatsAppUrl(message), "_blank");
}

let activeCat = "All";
const grid=document.getElementById("grid"), pills=document.getElementById("pills"), search=document.getElementById("search"), sort=document.getElementById("sort"), drawer=document.getElementById("drawer"), overlay=document.getElementById("overlay"), items=document.getElementById("items"), total=document.getElementById("total"), cartCount=document.getElementById("cartCount"), checkoutModal=document.getElementById("checkoutModal");
function saveP(){localStorage.setItem("bikeHubProducts", JSON.stringify(products));}
function saveC(){localStorage.setItem("bikeHubCart", JSON.stringify(cart));}
function lkr(v){return "LKR "+Number(v).toLocaleString("en-LK",{maximumFractionDigits:0});}
function cats(){let cs=["All",...new Set(products.map(p=>p.category))];pills.innerHTML=cs.map(c=>`<button class="pill ${c===activeCat?'active':''}" onclick="activeCat='${c}';cats();render();">${c}</button>`).join("");}
function list(){let q=search.value.toLowerCase();let a=products.filter(p=>(p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q))&&(activeCat==="All"||p.category===activeCat));if(sort.value==="low")a.sort((x,y)=>x.price-y.price);if(sort.value==="high")a.sort((x,y)=>y.price-x.price);if(sort.value==="stock")a.sort((x,y)=>y.stock-x.stock);if(sort.value==="latest")a.sort((x,y)=>y.id-x.id);return a;}
function render(){let a=list();grid.innerHTML=a.length?a.map(p=>{let q=cart[p.id]||0;return `<article class="card"><div class="pic" onclick="openInspect(${p.id})"><span class="stock ${p.stock<=5?'low':''}">${p.stock<=5?'Low Stock':'In Stock'}</span><img src="${p.image}" alt="${p.name}"></div><div class="body"><div class="meta"><span class="cat">${p.category}</span><span class="rating">★ ${p.rating}</span></div><h3 class="title">${p.name}</h3><div><span class="price">${lkr(p.price)}</span><span class="old">${lkr(p.oldPrice)}</span></div>${q?`<div class="qty"><button onclick="qty(${p.id},-1)">−</button><span>${q}</span><button onclick="qty(${p.id},1)">+</button></div>`:`<div class="actions"><button class="add" onclick="add(${p.id})">Add to Cart</button><button class="icon" onclick="alert('${p.name}\\n${lkr(p.price)}\\nStock: ${p.stock}')">👁</button></div>`}</div></article>`}).join(""):'<p class="empty">No products found.</p>';updateCart();}
function add(id){cart[id]=1;saveC();render();}
function qty(id,n){let p=products.find(x=>x.id===id);let v=(cart[id]||0)+n;if(v<=0)delete cart[id];else if(v<=p.stock)cart[id]=v;saveC();render();}
function removeItem(id){delete cart[id];saveC();render();}
function updateCart(){let e=Object.entries(cart);cartCount.textContent=e.reduce((s,[,q])=>s+q,0);if(!e.length){items.innerHTML='<p class="empty">Your cart is empty.</p>';total.textContent='LKR 0';return}let t=0;items.innerHTML=e.map(([id,q])=>{let p=products.find(x=>x.id===Number(id));if(!p)return'';t+=p.price*q;return `<div class="cart-item"><img src="${p.image}"><div><h4>${p.name}</h4><p>${q} × ${lkr(p.price)}</p></div><button class="remove" onclick="removeItem(${p.id})">Remove</button></div>`}).join("");total.textContent=lkr(t);}
function cartTotal(){return Object.entries(cart).reduce((s,[id,q])=>{let p=products.find(x=>x.id===Number(id));return p?s+p.price*q:s},0);}

// ===== Product Inspect + Zoom Feature =====
let currentInspectProduct = null;
let zoomLevel = 1;

const inspectModal = document.getElementById("inspectModal");
const closeInspect = document.getElementById("closeInspect");
const zoomBox = document.getElementById("zoomBox");
const inspectImage = document.getElementById("inspectImage");
const zoomInBtn = document.getElementById("zoomInBtn");
const zoomOutBtn = document.getElementById("zoomOutBtn");
const zoomResetBtn = document.getElementById("zoomResetBtn");

function productDescription(product) {
  const descriptions = {
    Safety: "Designed for safer riding with strong build quality, comfortable use, and a premium Bike Hub finish.",
    Lighting: "Bright and stylish lighting accessory for improved road visibility and modern bike appearance.",
    Electronics: "Smart electronic upgrade for riders who want better information, convenience, and control.",
    Maintenance: "Useful maintenance accessory to keep your bike clean, smooth, and ready for daily riding."
  };

  return descriptions[product.category] || "Premium Bike Hub accessory with modern style, rider safety, and performance quality.";
}

function openInspect(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;

  currentInspectProduct = product;
  zoomLevel = 1;

  document.getElementById("inspectTitle").textContent = "Inspect Item";
  document.getElementById("inspectImage").src = product.image;
  document.getElementById("inspectCategory").textContent = product.category;
  document.getElementById("inspectName").textContent = product.name;
  document.getElementById("inspectPrice").textContent = lkr(product.price);
  document.getElementById("inspectOldPrice").textContent = lkr(product.oldPrice);
  document.getElementById("inspectStock").textContent = product.stock > 0 ? `Stock available: ${product.stock}` : "Out of stock";
  document.getElementById("inspectDescription").textContent = productDescription(product);

  inspectImage.style.transform = "scale(1)";
  inspectImage.style.transformOrigin = "center center";
  zoomBox.classList.remove("zoomed");

  inspectModal.classList.add("open");
  overlay.classList.add("show");
}

function closeInspectModal() {
  inspectModal.classList.remove("open");
  overlay.classList.remove("show");
  currentInspectProduct = null;
  zoomLevel = 1;
}

function applyZoom() {
  inspectImage.style.transform = `scale(${zoomLevel})`;
  zoomBox.classList.toggle("zoomed", zoomLevel > 1);
}

function resetZoom() {
  zoomLevel = 1;
  inspectImage.style.transformOrigin = "center center";
  applyZoom();
}

function changeZoom(amount) {
  zoomLevel = Math.max(1, Math.min(3, zoomLevel + amount));
  applyZoom();
}

if (zoomBox) {
  zoomBox.addEventListener("mousemove", (event) => {
    if (zoomLevel <= 1) return;

    const rect = zoomBox.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    inspectImage.style.transformOrigin = `${x}% ${y}%`;
  });

  zoomBox.addEventListener("mouseenter", () => {
    if (zoomLevel === 1) {
      zoomLevel = 1.8;
      applyZoom();
    }
  });

  zoomBox.addEventListener("mouseleave", () => {
    resetZoom();
  });

  zoomBox.addEventListener("click", () => {
    zoomLevel = zoomLevel > 1 ? 1 : 2.2;
    applyZoom();
  });
}

if (closeInspect) closeInspect.addEventListener("click", closeInspectModal);
if (zoomInBtn) zoomInBtn.addEventListener("click", () => changeZoom(0.4));
if (zoomOutBtn) zoomOutBtn.addEventListener("click", () => changeZoom(-0.4));
if (zoomResetBtn) zoomResetBtn.addEventListener("click", resetZoom);

const inspectAddBtn = document.getElementById("inspectAddBtn");
if (inspectAddBtn) {
  inspectAddBtn.addEventListener("click", () => {
    if (!currentInspectProduct) return;
    add(currentInspectProduct.id);
    closeInspectModal();
    drawer.classList.add("open");
    overlay.classList.add("show");
  });
}

document.getElementById("openCart").onclick=()=>{drawer.classList.add("open");overlay.classList.add("show")};
document.getElementById("closeCart").onclick=()=>{drawer.classList.remove("open");overlay.classList.remove("show")};
overlay.onclick=()=>{drawer.classList.remove("open");overlay.classList.remove("show");checkoutModal.classList.remove("open"); if (inspectModal) inspectModal.classList.remove("open");};
document.getElementById("checkoutBtn").onclick=()=>{if(!Object.keys(cart).length)return alert("Cart is empty.");document.getElementById("checkoutTotal").textContent=lkr(cartTotal());drawer.classList.remove("open");checkoutModal.classList.add("open");overlay.classList.add("show")};
document.getElementById("closeCheckout").onclick=()=>{checkoutModal.classList.remove("open");overlay.classList.remove("show")};
document.querySelectorAll('input[name="payment"]').forEach(r=>r.onchange=()=>{document.querySelectorAll(".pay").forEach(p=>p.classList.remove("active"));r.closest(".pay").classList.add("active");document.getElementById("cardbox").classList.toggle("open",r.value==="CARD_DEMO")}); 
document.getElementById("cardNumber").oninput=e=>{let v=e.target.value.replace(/\D/g,"").slice(0,16);e.target.value=v.replace(/(.{4})/g,"$1 ").trim()};
document.getElementById("checkoutForm").onsubmit=e=>{e.preventDefault();let pay=document.querySelector('input[name="payment"]:checked').value;let last4="";if(pay==="CARD_DEMO"){let cn=document.getElementById("cardNumber").value.replace(/\D/g,"");if(cn.length<16)return document.getElementById("msg").textContent="Enter valid demo card details.";last4=cn.slice(-4)}let order={id:Date.now(),date:new Date().toISOString(),customerName:customerName.value,phone:phone.value,email:email.value,address:address.value,note:note.value,paymentMethod:pay,paymentStatus:pay==="CARD_DEMO"?"Paid Demo":"Pending COD",cardLast4:last4,status:"New",total:cartTotal(),items:Object.entries(cart).map(([id,q])=>{let p=products.find(x=>x.id===Number(id));return{id:p.id,name:p.name,qty:Number(q),price:p.price,lineTotal:p.price*q,image:p.image}})};let orders=JSON.parse(localStorage.getItem("bikeHubOrders")||"[]");orders.unshift(order);localStorage.setItem("bikeHubOrders",JSON.stringify(orders));products=products.map(p=>{let i=order.items.find(x=>x.id===p.id);return i?{...p,stock:Math.max(0,p.stock-i.qty)}:p});saveP();cart={};saveC();alert("Order placed. ID #"+order.id);location.reload();};

const whatsappFloat = document.getElementById("whatsappFloat");
const whatsappCartBtn = document.getElementById("whatsappCartBtn");

if (whatsappFloat) {
  whatsappFloat.addEventListener("click", (event) => {
    event.preventDefault();
    openWhatsAppCartOrder();
  });
}

if (whatsappCartBtn) {
  whatsappCartBtn.addEventListener("click", openWhatsAppCartOrder);
}

const inspectWhatsAppBtn = document.getElementById("inspectWhatsAppBtn");
if (inspectWhatsAppBtn) {
  inspectWhatsAppBtn.addEventListener("click", () => {
    if (!currentInspectProduct) return;
    openWhatsAppProductOrder(currentInspectProduct);
  });
}

search.oninput=render;sort.onchange=render;cats();render();
