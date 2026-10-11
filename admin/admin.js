(() => {
  "use strict";
  const views = ["overview", "product", "campaign", "measurement"];
  const breadcrumbs = { overview: "VISIÓN GENERAL", product: "CATÁLOGO Y ENCAJA", campaign: "CAMPAÑAS", measurement: "MEDICIÓN Y EQUIPO" };
  const byId = id => document.getElementById(id);
  const euro = value => new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
  const value = id => byId(id).value.trim();
  const number = (id, min, max) => {
    const field = byId(id);
    const v = Number(field.value);
    return field.value.trim() !== "" && Number.isFinite(v) && v >= min && v <= max ? v : null;
  };
  let noticeTimer;
  function notice(message) {
    const node = byId("notice");
    node.textContent = message;
    node.hidden = false;
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => { node.hidden = true; }, 5000);
  }
  function view(name, updateHash = true) {
    if (!views.includes(name)) name = "overview";
    for (const current of views) {
      byId("view-" + current).hidden = current !== name;
    }
    for (const button of document.querySelectorAll("[data-view]")) {
      const selected = button.dataset.view === name;
      button.classList.toggle("is-active", selected);
      if (selected) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    }
    byId("breadcrumb").textContent = breadcrumbs[name];
    if (updateHash && location.hash.slice(1) !== name) history.replaceState(null, "", "#" + name);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function step(name) {
    if (!["identity", "rules", "preview"].includes(name)) return;
    for (const current of ["identity", "rules", "preview"]) {
      byId("step-" + current).hidden = current !== name;
    }
    for (const tab of document.querySelectorAll("[data-step]")) {
      const active = tab.dataset.step === name;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    }
    if (name === "preview") productPreview();
  }
  function fitMessage(title, message, bad) {
    const node = byId("fit-result");
    const strong = document.createElement("strong");
    strong.textContent = title;
    const p = document.createElement("p");
    p.textContent = message;
    node.replaceChildren(strong, p);
    node.classList.toggle("bad", bad);
  }
  const imageByCategory = {
    "Sofás": ["../assets/sofa014.jpg", "Fotografía de sofá del sitio DormiZen usada como referencia visual"],
    "Colchones": ["../assets/cama001.jpg", "Fotografía de cama del sitio DormiZen usada como referencia visual"],
    "Sillones relax": ["../assets/relax004.jpg", "Fotografía de sillón del sitio DormiZen usada como referencia visual"]
  };
  function productPreview() {
    const name = value("product-name") || "Producto ficticio sin nombre";
    const category = value("product-category");
    const image = imageByCategory[category] || imageByCategory["Sofás"];
    for (const img of [document.querySelector("#step-identity .context-card img"), document.querySelector("#step-preview .preview-product img")]) {
      img.src = image[0];
      img.alt = image[1] + "; no identifica este producto ficticio";
    }
    document.querySelector("#step-identity .context-card p").textContent = "La fotografía no identifica este artículo ficticio. Para vender hacen falta fotos y derechos confirmados por referencia.";
    byId("preview-name").textContent = name;
    byId("preview-category").textContent = category.toLocaleUpperCase("es-ES") + " · EJEMPLO";
    const price = number("product-price", 0, 50000);
    byId("preview-base-price").textContent = price === null ? "—" : euro(price);
    const surcharge = number("premium-surcharge", 0, 5000);
    const width = number("product-width", 30, 500);
    const depth = number("product-depth", 30, 500);
    const minDoor = number("minimum-door", 30, 300);
    const freeWidth = number("test-width", 30, 1000);
    const freeDepth = number("test-depth", 30, 1000);
    const door = number("test-door", 30, 300);
    const postcode = value("test-postcode");
    const zone = postcode.startsWith("46") ? "46" : postcode.startsWith("28") ? "28" : null;
    const shipping = zone ? number("shipping-" + zone, 0, 2000) : null;
    const item = price === null || surcharge === null ? null : price + (value("test-upholstery") === "premium" ? surcharge : 0);
    byId("quote-product").textContent = item === null ? "—" : euro(item);
    byId("quote-delivery").textContent = shipping === null ? "—" : euro(shipping);
    byId("quote-total").textContent = "—";
    if ([width, depth, minDoor, freeWidth, freeDepth, door, price, surcharge].some(v => v === null)) {
      fitMessage("Faltan datos válidos de ejemplo", "Introduce números dentro de los límites indicados para probar la regla.", true);
      return;
    }
    if (!/^\d{5}$/.test(postcode)) {
      fitMessage("Código postal incompleto", "Introduce cinco cifras; esta muestra solo calcula entrega para CP 28*** y 46***.", true);
      return;
    }
    if (shipping === null) {
      fitMessage("Sin regla de entrega de ejemplo", "Este CP no tiene una tarifa de muestra. Para la tienda real habría que acordar cobertura y coste antes del pago.", true);
      return;
    }
    const misses = [];
    if (freeWidth < width + 10) misses.push("ancho libre: se necesitan " + (width + 10) + " cm");
    if (freeDepth < depth + 10) misses.push("fondo libre: se necesitan " + (depth + 10) + " cm");
    if (door < minDoor) misses.push("paso estrecho: se necesitan " + minDoor + " cm");
    if (misses.length) {
      fitMessage("Prechequeo: revisar medidas", misses.join(" · ") + ". No se muestra total apto para compra.", true);
      return;
    }
    fitMessage("Prechequeo positivo de ejemplo", "Las medidas introducidas superan estas reglas simples. Embalaje, giros y montaje requieren comprobación real.", false);
    byId("quote-total").textContent = euro(item + shipping);
  }
  function breakdownLine(label, amount) {
    const line = document.createElement("span");
    const key = document.createElement("span");
    const val = document.createElement("strong");
    key.textContent = label;
    val.textContent = euro(amount);
    line.append(key, val);
    return line;
  }
  function campaignPreview() {
    byId("campaign-product-source").textContent = "Campaña sobre " + (value("product-name") || "producto ficticio") + " · precio base y entrega de la ficha de ejemplo";
    byId("ad-name").textContent = value("campaign-name") || "Campaña ficticia sin nombre";
    byId("ad-headline").textContent = value("campaign-headline") || "Titular de ejemplo pendiente";
    byId("ad-code").textContent = (value("campaign-code") || "SIN CÓDIGO").toLocaleUpperCase("es-ES");
    const discount = number("campaign-discount", 0, 70);
    byId("ad-discount").textContent = discount === null ? "—" : "−" + discount + "%";
    const base = number("product-price", 0, 50000);
    const shippingRevenue = number("shipping-46", 0, 2000);
    const cost = number("campaign-cost", 0, 50000);
    const deliveryCost = number("campaign-delivery-cost", 0, 5000);
    const acquisition = number("campaign-cac", 0, 5000);
    const output = byId("margin-value");
    const breakdown = byId("margin-breakdown");
    breakdown.replaceChildren();
    if ([discount, base, shippingRevenue, cost, deliveryCost, acquisition].some(v => v === null)) {
      output.textContent = "—";
      output.classList.remove("negative");
      byId("margin-summary").textContent = "Completa los valores ilustrativos válidos para calcular.";
      return;
    }
    const salePrice = base * (1 - discount / 100);
    const contribution = salePrice + shippingRevenue - cost - deliveryCost - acquisition;
    output.textContent = euro(contribution);
    output.classList.toggle("negative", contribution < 0);
    byId("margin-summary").textContent = "Simulación simplificada por pedido, antes de impuestos y comisiones. No es un resultado real.";
    breakdown.append(
      breakdownLine("Precio tras descuento", salePrice),
      breakdownLine("Entrega cobrada (CP 46*** de ejemplo)", shippingRevenue),
      breakdownLine("Coste producto supuesto", -cost),
      breakdownLine("Coste entrega supuesto", -deliveryCost),
      breakdownLine("Captación asignada supuesta", -acquisition)
    );
  }
  for (const button of document.querySelectorAll("[data-view]")) button.addEventListener("click", () => view(button.dataset.view));
  for (const button of document.querySelectorAll("[data-go]")) button.addEventListener("click", () => view(button.dataset.go));
  for (const button of document.querySelectorAll("[data-step]")) button.addEventListener("click", () => step(button.dataset.step));
  for (const button of document.querySelectorAll("[data-next]")) button.addEventListener("click", () => step(button.dataset.next));
  document.querySelector(".step-nav").addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    const tabs = [...document.querySelectorAll("[data-step]")];
    const current = tabs.indexOf(document.activeElement);
    if (current < 0) return;
    event.preventDefault();
    const next = tabs[(current + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
    next.focus();
    step(next.dataset.step);
  });
  for (const input of document.querySelectorAll("input,select")) {
    input.addEventListener("input", () => { productPreview(); campaignPreview(); });
    input.addEventListener("change", () => { productPreview(); campaignPreview(); });
  }
  byId("mock-publish").addEventListener("click", () => notice("Vista previa simulada. No se publica ni guarda ningún producto."));
  byId("campaign-preview-button").addEventListener("click", () => {
    campaignPreview();
    notice("Vista previa de campaña actualizada solo en esta sesión; no se guarda ni se lanza.");
  });
  window.addEventListener("hashchange", () => view(location.hash.slice(1), false));
  step("identity");
  productPreview();
  campaignPreview();
  view(location.hash.slice(1) || "overview", false);
})();
