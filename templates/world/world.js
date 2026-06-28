/*
  /superlearning reward world (no dependencies).
  Reads the learner's progress and draws a growing isometric settlement on a <canvas>:
    - every MASTERED concept becomes one building, placed on an isometric grid;
    - the building's height grows with the number of earned blocks for that concept;
    - the town climbs through tiers: plot -> room -> house -> village -> city
      (roofs appear at house+, trees scatter at village+, roads appear at city);
    - clicking a building names the concept it stands for -- the town is a memory palace,
      so the spatial layout is itself a recall cue.

  Data source, in order of preference (so the page works double-clicked from disk OR served):
    1. an inline  <script type="application/json" id="world-data"> ... </script>
    2. a fetch of ../progress-state.json (the live vault file, when served over http)
    3. an empty plot (nothing learned yet)

  Schema consumed (see reference/workspace.md):
    { topic, xp, streak,
      masteredConcepts: [{ id, channel }],
      world: { tier, blocks: [{ conceptId, kind, earned }] },
      concepts?: [{ id, title, channel, oneLine }]   // optional display labels
    }
*/
(function () {
  "use strict";

  var TIERS = ["plot", "room", "house", "village", "city"];
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // channel -> [topFace, leftFace, rightFace] colors for the building body
  var CHANNEL_COLORS = {
    visual:      ["#5b8cf7", "#2f5fc0", "#3d72db"],
    auditory:    ["#a079f0", "#6e44c0", "#8456db"],
    narrative:   ["#34bda9", "#1f7e72", "#279488"],
    kinesthetic: ["#f0824a", "#c0521f", "#db6630"],
    humor:       ["#f0c850", "#c0901f", "#dbab30"],
    "default":   ["#9aa7b4", "#67727d", "#7e8a96"]
  };
  var DECOR_COLORS = {
    lamp: "#ffd34d", tree: "#3fa05a", door: "#5a3a22",
    shop: "#e0685f", window: "#bfe0ff", flag: "#f0a429", floor: "#b9c2cc"
  };

  // ---- load state ----------------------------------------------------------
  function readInline() {
    var el = document.getElementById("world-data");
    if (!el) return null;
    var raw = (el.textContent || "").trim();
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  function start(state) {
    var safe = state && typeof state === "object" ? state : {};
    render(safe);
    window.addEventListener("resize", function () { render(safe); });
  }

  var inline = readInline();
  if (inline) {
    start(inline);
  } else if (window.fetch) {
    fetch("../progress-state.json")
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { start(d || {}); })
      .catch(function () { start({}); });
  } else {
    start({});
  }

  // ---- derive the building list from earned blocks -------------------------
  function buildingsFrom(state) {
    var world = state.world || {};
    var blocks = Array.isArray(world.blocks) ? world.blocks : [];
    var mastered = {};
    (state.masteredConcepts || []).forEach(function (m) { if (m && m.id) mastered[m.id] = m; });
    var labels = {};
    (state.concepts || []).forEach(function (c) { if (c && c.id) labels[c.id] = c; });

    var order = [];
    var byConcept = {};
    blocks.forEach(function (b) {
      if (!b || b.earned !== true || !b.conceptId) return;
      if (!byConcept[b.conceptId]) { byConcept[b.conceptId] = []; order.push(b.conceptId); }
      byConcept[b.conceptId].push(b);
    });

    return order.map(function (id) {
      var blocksFor = byConcept[id];
      var label = labels[id] || {};
      var channel = label.channel || (mastered[id] && mastered[id].channel) || "default";
      var kinds = blocksFor.map(function (b) { return b.kind; }).filter(function (k) { return k && k !== "floor"; });
      return {
        id: id,
        title: label.title || id,
        oneLine: label.oneLine || "",
        channel: channel,
        count: blocksFor.length,
        decor: kinds
      };
    });
  }

  // ---- the accessible text mirror ------------------------------------------
  function renderSummary(state, buildings) {
    var el = document.querySelector(".world-summary");
    if (!el) return;
    var tier = (state.world && state.world.tier) || "plot";
    var parts = [];
    parts.push("<h2>마을 현황</h2>");
    if (buildings.length === 0) {
      parts.push('<p class="empty">아직 빈 땅입니다. 첫 개념을 익히면 첫 건물이 들어섭니다.</p>');
    } else {
      parts.push("<p>주제 <b>" + esc(state.topic || "?") + "</b> &middot; 단계 <b>" + esc(cap(tier)) +
        "</b> &middot; 건물 " + buildings.length + "채 &middot; XP " + (state.xp || 0) +
        " &middot; 연속 " + (state.streak || 0) + "일</p>");
      parts.push("<ul>");
      buildings.forEach(function (b) {
        parts.push("<li><b>" + esc(b.title) + "</b> (" + esc(b.channel) + " 채널, 블록 " + b.count + "개)" +
          (b.oneLine ? " &mdash; " + esc(b.oneLine) : "") + "</li>");
      });
      parts.push("</ul>");
    }
    el.innerHTML = parts.join("");
  }

  function renderStats(state, buildings) {
    var tier = (state.world && state.world.tier) || "plot";
    set(".stat-chip.tier b", cap(tier));
    set("[data-stat-buildings]", String(buildings.length));
    set("[data-stat-xp]", String(state.xp || 0));
    set("[data-stat-streak]", String(state.streak || 0));
    var topic = document.querySelector(".world-head .topic");
    if (topic) topic.textContent = state.topic || "내 마을";
  }

  // ---- canvas isometric renderer -------------------------------------------
  var hitboxes = []; // {x,y,w,h, building} for click detection

  function render(state) {
    var buildings = buildingsFrom(state);
    renderStats(state, buildings);
    renderSummary(state, buildings);

    var stage = document.querySelector(".world-stage");
    if (!stage) return;
    var canvas = stage.querySelector("canvas");
    if (!canvas) { canvas = document.createElement("canvas"); stage.appendChild(canvas); }

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var cssW = stage.clientWidth || 800;
    var cssH = Math.max(420, Math.round(cssW * 0.55));
    canvas.style.height = cssH + "px";
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var tier = (state.world && state.world.tier) || "plot";
    var tierIdx = Math.max(0, TIERS.indexOf(tier));

    // grid sized to hold the buildings, with a little breathing room
    var n = Math.max(1, buildings.length);
    var cols = Math.max(2, Math.ceil(Math.sqrt(n)));
    var rows = Math.max(2, Math.ceil(n / cols));
    var pad = 1; // ring of empty grass around the town
    var GC = cols + pad * 2;
    var GR = rows + pad * 2;

    var TW = Math.min(96, Math.max(40, Math.floor((cssW * 0.9) / (GC + GR) * 2)));
    var TH = TW / 2;
    var originX = cssW / 2;
    var originY = cssH / 2 - ((GC + GR) * TH) / 4 + TH * 2;

    function iso(gx, gy) {
      return { x: originX + (gx - gy) * (TW / 2), y: originY + (gx + gy) * (TH / 2) };
    }

    // ground: grass tiles; roads at city tier
    for (var gy = 0; gy < GR; gy++) {
      for (var gx = 0; gx < GC; gx++) {
        var p = iso(gx, gy);
        var isRoad = tierIdx >= 4 && (gx % 2 === 0 || gy % 2 === 0) &&
          !(gx >= pad && gx < pad + cols && gy >= pad && gy < pad + rows && (gx - pad) % 1 === 0);
        var checker = (gx + gy) % 2 === 0;
        var fill = isRoad ? "#9aa7b4" : (checker ? "#bfe3a8" : "#b2dc9b");
        tile(ctx, p.x, p.y, TW, TH, fill, "#a6d18d");
      }
    }

    // scatter trees on empty grass once the town is a village+
    if (tierIdx >= 3) {
      var spots = [[0, 0], [GC - 1, 0], [0, GR - 1], [GC - 1, GR - 1], [Math.floor(GC / 2), 0]];
      spots.forEach(function (s, i) {
        var p = iso(s[0], s[1]);
        decoration(ctx, p.x, p.y, TW, TH, "tree", 1 + (i % 2));
      });
    }

    // place buildings row-major inside the padded core, sorted back-to-front
    var placed = buildings.map(function (b, i) {
      var cx = pad + (i % cols);
      var cy = pad + Math.floor(i / cols);
      return { b: b, gx: cx, gy: cy, depth: cx + cy };
    });
    placed.sort(function (a, c) { return a.depth - c.depth || a.gx - c.gx; });

    hitboxes = [];
    placed.forEach(function (pl) {
      var p = iso(pl.gx, pl.gy);
      drawBuilding(ctx, p.x, p.y, TW, TH, pl.b, tierIdx);
    });

    // celebrate the most recent earned block
    toastLatest(state, buildings, stage);
    wireClicks(canvas, cssW, cssH, dpr);
  }

  // draw a flat isometric tile (the ground)
  function tile(ctx, x, y, tw, th, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x, y - th / 2);
    ctx.lineTo(x + tw / 2, y);
    ctx.lineTo(x, y + th / 2);
    ctx.lineTo(x - tw / 2, y);
    ctx.closePath();
    ctx.fillStyle = fill; ctx.fill();
    ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke();
  }

  // draw one isometric box of height h sitting on the tile centered at (x,y)
  function box(ctx, x, y, tw, th, h, top, left, right) {
    // left face
    ctx.beginPath();
    ctx.moveTo(x - tw / 2, y - h);
    ctx.lineTo(x, y - h + th / 2);
    ctx.lineTo(x, y + th / 2);
    ctx.lineTo(x - tw / 2, y);
    ctx.closePath(); ctx.fillStyle = left; ctx.fill();
    // right face
    ctx.beginPath();
    ctx.moveTo(x + tw / 2, y - h);
    ctx.lineTo(x, y - h + th / 2);
    ctx.lineTo(x, y + th / 2);
    ctx.lineTo(x + tw / 2, y);
    ctx.closePath(); ctx.fillStyle = right; ctx.fill();
    // top face
    ctx.beginPath();
    ctx.moveTo(x, y - h - th / 2);
    ctx.lineTo(x + tw / 2, y - h);
    ctx.lineTo(x, y - h + th / 2);
    ctx.lineTo(x - tw / 2, y - h);
    ctx.closePath(); ctx.fillStyle = top; ctx.fill();
  }

  // draw a pyramid roof capping a box top at height h
  function roof(ctx, x, y, tw, th, h, color, dark) {
    var apexY = y - h - th * 1.1;
    // left slope
    ctx.beginPath();
    ctx.moveTo(x - tw / 2, y - h); ctx.lineTo(x, y - h - th / 2); ctx.lineTo(x, apexY);
    ctx.closePath(); ctx.fillStyle = dark; ctx.fill();
    // right slope (front-left visible)
    ctx.beginPath();
    ctx.moveTo(x, y - h - th / 2); ctx.lineTo(x + tw / 2, y - h); ctx.lineTo(x, apexY);
    ctx.closePath(); ctx.fillStyle = color; ctx.fill();
    // front-bottom slopes
    ctx.beginPath();
    ctx.moveTo(x - tw / 2, y - h); ctx.lineTo(x, y - h + th / 2); ctx.lineTo(x, apexY);
    ctx.closePath(); ctx.fillStyle = dark; ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + tw / 2, y - h); ctx.lineTo(x, y - h + th / 2); ctx.lineTo(x, apexY);
    ctx.closePath(); ctx.fillStyle = color; ctx.fill();
  }

  function drawBuilding(ctx, x, y, tw, th, b, tierIdx) {
    var pal = CHANNEL_COLORS[b.channel] || CHANNEL_COLORS["default"];
    var baseH = th * 0.5;
    var bodyH = Math.min(th * 3.2, th * 0.9 + b.count * th * 0.55);

    // stone base platform
    box(ctx, x, y, tw, th, baseH, "#cdd6df", "#8d99a4", "#a4afba");
    // the channel-colored body, lifted onto the base
    var by = y - baseH;
    box(ctx, x, by, tw, th, bodyH, pal[0], pal[1], pal[2]);

    // a door on the front-right face so it reads as a dwelling
    ctx.fillStyle = "#3c2a1a";
    ctx.fillRect(x + tw * 0.14, by - baseH * 0.2 - th * 0.1, tw * 0.16, bodyH * 0.45);

    // roof once the town is a house or bigger
    if (tierIdx >= 2) roof(ctx, x, by, tw, th, bodyH, "#d6604d", "#a8412f");

    // decorations earned for this concept, clustered at the base
    var dx = -tw * 0.36;
    b.decor.slice(0, 3).forEach(function (kind) {
      decoration(ctx, x + dx, y + th * 0.28, tw, th, kind, 1);
      dx += tw * 0.30;
    });

    // floating signboard naming the concept (memory-palace tag)
    label(ctx, x, by - bodyH - th * (tierIdx >= 2 ? 1.5 : 0.6), b.title);

    // remember where it is, for clicks (a loose bounding box over the whole building)
    hitboxes.push({
      x: x - tw / 2, y: by - bodyH - th * 1.6,
      w: tw, h: bodyH + baseH + th * 2.2, building: b
    });
  }

  function decoration(ctx, x, y, tw, th, kind, scale) {
    var s = (scale || 1);
    if (kind === "tree") {
      ctx.fillStyle = "#7a4a25";
      ctx.fillRect(x - tw * 0.03, y - th * 0.5 * s, tw * 0.06, th * 0.5 * s);
      box(ctx, x, y - th * 0.45 * s, tw * 0.34 * s, th * 0.34 * s, th * 0.5 * s, "#5cc06f", "#2f8a45", "#3fa05a");
      return;
    }
    var c = DECOR_COLORS[kind] || "#cccccc";
    var sz = tw * 0.18 * s;
    box(ctx, x, y, sz * 2, sz, th * 0.5 * s, lighten(c), darken(c), c);
  }

  function label(ctx, x, y, text) {
    ctx.font = "600 12px ui-sans-serif, system-ui, sans-serif";
    var w = Math.min(160, ctx.measureText(text).width + 16);
    ctx.fillStyle = "rgba(20,32,44,0.86)";
    roundRect(ctx, x - w / 2, y - 10, w, 20, 6); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(clip(text, 22), x, y);
    ctx.textAlign = "start";
  }

  // ---- interaction ---------------------------------------------------------
  function wireClicks(canvas, cssW, cssH, dpr) {
    canvas.onclick = function (ev) {
      var rect = canvas.getBoundingClientRect();
      var px = (ev.clientX - rect.left) * (cssW / rect.width);
      var py = (ev.clientY - rect.top) * (cssH / rect.height);
      for (var i = hitboxes.length - 1; i >= 0; i--) {
        var h = hitboxes[i];
        if (px >= h.x && px <= h.x + h.w && py >= h.y && py <= h.y + h.h) {
          showPanel(h.building); return;
        }
      }
    };
    canvas.style.cursor = "pointer";
  }

  function showPanel(b) {
    var panel = document.querySelector(".world-panel");
    if (!panel) return;
    panel.innerHTML =
      '<span class="channel">' + esc(b.channel) + '</span>' +
      "<h2>" + esc(b.title) + "</h2>" +
      "<p>" + (b.oneLine ? esc(b.oneLine) : "여기서 배운 개념입니다. 넘어가기 전에 기억만으로 한 번 다시 설명해 보세요.") + "</p>" +
      '<p style="opacity:.7">이 개념으로 블록 ' + b.count + "개를 얻었습니다.</p>";
  }

  function toastLatest(state, buildings, stage) {
    var old = stage.querySelector(".world-toast");
    if (old) old.remove();
    if (!buildings.length) return;
    var last = buildings[buildings.length - 1];
    var t = document.createElement("div");
    t.className = "world-toast";
    t.textContent = "새 건물: " + last.title + "!";
    stage.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.remove(); }, 2600);
  }

  // ---- tiny helpers --------------------------------------------------------
  function set(sel, text) { var el = document.querySelector(sel); if (el) el.textContent = text; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function cap(s) { s = String(s || ""); return s.charAt(0).toUpperCase() + s.slice(1); }
  function clip(s, n) { s = String(s || ""); return s.length > n ? s.slice(0, n - 1) + "…" : s; }
  function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function hexToRgb(h) { h = h.replace("#", ""); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
  function clamp(v) { return Math.max(0, Math.min(255, Math.round(v))); }
  function shade(hex, f) { var c = hexToRgb(hex); return "rgb(" + clamp(c[0] * f) + "," + clamp(c[1] * f) + "," + clamp(c[2] * f) + ")"; }
  function lighten(hex) { return shade(hex, 1.25); }
  function darken(hex) { return shade(hex, 0.7); }
})();
