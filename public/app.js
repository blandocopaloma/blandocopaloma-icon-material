const state = { category: "all", query: "" };

const $ = (s) => document.querySelector(s);

function normalize(s) {
  return (s || "").toLowerCase().replace(/\s/g, "");
}

function getFiltered() {
  const q = normalize(state.query);
  return MATERIALS.filter(item => {
    const categoryOk = state.category === "all" || item.category === state.category;
    const text = normalize([item.name, item.category, ...(item.tags || [])].join(" "));
    return categoryOk && (!q || text.includes(q));
  });
}

function setCategory(category) {
  state.category = category;
  document.querySelectorAll("[data-category]").forEach(el => {
    el.classList.toggle("active", el.dataset.category === category);
  });
  const cat = CATEGORIES.find(c => c.name === category);
  $("#resultTitle").textContent = category === "all" ? "すべての素材" : category;
  render();
}

function renderCategoryButtons() {
  const top = $("#categoryButtons");
  const side = $("#sidebarCategories");

  top.innerHTML = "";
  side.innerHTML = "";

  CATEGORIES.forEach(c => {
    const b = document.createElement("button");
    b.className = "category-chip";
    b.textContent = c.name;
    b.dataset.category = c.name;
    b.addEventListener("click", () => setCategory(c.name));
    top.appendChild(b);

    const s = document.createElement("button");
    s.className = "side-link";
    s.textContent = c.name;
    s.dataset.category = c.name;
    s.addEventListener("click", () => {
      setCategory(c.name);
      $("#sidebar").classList.remove("open");
    });
    side.appendChild(s);
  });
}

function render() {
  const items = getFiltered();
  const grid = $("#materialGrid");
  grid.innerHTML = "";
  $("#resultCount").textContent = `${items.length} 件`;

  $("#emptyState").hidden = items.length !== 0;

  items.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";

    const thumb = document.createElement("div");
    thumb.className = "thumb";

    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      img.loading = "lazy";
      img.onerror = () => {
        thumb.innerHTML = '<div class="placeholder">画像を<br>追加してください</div>';
      };
      thumb.appendChild(img);
    } else {
      thumb.innerHTML = '<div class="placeholder">素材<br>プレビュー</div>';
    }

    const info = document.createElement("div");
    info.className = "card-info";
    info.innerHTML = `
      <div class="card-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</div>
      <div class="card-category">${escapeHtml(item.category)}</div>
    `;

    if (item.image) {
      const a = document.createElement("a");
      a.className = "download";
      a.href = item.image;
      a.download = "";
      a.textContent = "PNGをダウンロード";
      info.appendChild(a);
    }

    card.append(thumb, info);
    grid.appendChild(card);
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[c]));
}

$("#searchInput").addEventListener("input", e => {
  state.query = e.target.value;
  render();
});

document.querySelector('[data-category="all"]').addEventListener("click", () => setCategory("all"));
$("#menuButton").addEventListener("click", () => $("#sidebar").classList.toggle("open"));

renderCategoryButtons();
render();
