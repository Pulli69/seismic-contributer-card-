/* =========================
   GLOBAL STORAGE
========================= */

const STORAGE_KEY = "seismic_card";

/* =========================
   STEP NAV (GLOBAL – ALWAYS AVAILABLE)
========================= */

window.nextStep = function (id) {
  document.querySelectorAll(".step").forEach(step =>
    step.classList.remove("active")
  );
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
};

/* =========================
   BUILDER PAGE LOGIC
========================= */

const steps = document.querySelectorAll(".step");

let formData = {
  name: "",
  x: "",
  time: "",
  discord: 1,
  xcontent: 1,
  art: 1,
  role: "",
  photo: ""
};

if (steps.length > 0) {

  /* ---------- IDENTITY ---------- */
  document.getElementById("nameInput")?.addEventListener("input", e => {
    formData.name = e.target.value;
  });

  document.getElementById("xInput")?.addEventListener("input", e => {
    formData.x = e.target.value;
  });

  /* ---------- PHOTO ---------- */
  window.setPhoto = function (e) {
    if (!e.target.files || !e.target.files[0]) return;
    const reader = new FileReader();
    reader.onload = () => {
      formData.photo = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  /* ---------- TIME ---------- */
  window.setTime = function (time) {
    formData.time = time;
    nextStep("step-discord");
  };

  /* ---------- SLIDERS ---------- */
  document.getElementById("discordRange")?.addEventListener("input", e => {
    formData.discord = e.target.value;
    document.getElementById("discordValue").innerText =
      e.target.value + "k messages";
  });

  document.getElementById("xRange")?.addEventListener("input", e => {
    formData.xcontent = e.target.value;
    document.getElementById("xValue").innerText =
      e.target.value + " posts";
  });

  document.getElementById("artRange")?.addEventListener("input", e => {
    formData.art = e.target.value;
    document.getElementById("artValue").innerText =
      e.target.value + " works";
  });

  /* ---------- ROLE ---------- */
  window.setRole = function (role) {
    formData.role = role;

    // Save EVERYTHING
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

    nextStep("step-result");
  };
}

/* =========================
   CARD PAGE LOGIC
========================= */

const accent = document.getElementById("cardAccent");
const roleImg = document.getElementById("roleImage");

if (accent && roleImg) {

  const savedRaw = localStorage.getItem(STORAGE_KEY);

  if (savedRaw) {
    const saved = JSON.parse(savedRaw);

    /* ---------- TEXT ---------- */
    document.getElementById("nameText").innerText = saved.name || "";
    document.getElementById("xText").innerText = saved.x ? "@" + saved.x : "";
    document.getElementById("timeText").innerText = saved.time || "";
    document.getElementById("discordText").innerText = saved.discord + "k msgs";
    document.getElementById("xContentText").innerText = saved.xcontent;
    document.getElementById("artText").innerText = saved.art;

    /* ---------- PHOTO ---------- */
    if (saved.photo) {
      document.getElementById("profilePhoto").src = saved.photo;
    }

    /* ---------- RESET ACCENT ---------- */
    accent.className = "card-accent";

    /* ---------- ROLE ---------- */
    if (saved.role === "leader") {
      roleImg.src = "assets/images/magnitudes/leader.png";
      accent.classList.add("role-leader");

    } else if (saved.role === "mod") {
      roleImg.src = "assets/images/magnitudes/mod.png";
      accent.classList.add("role-mod");

    } else if (saved.role.startsWith("mag")) {
      roleImg.src =
        "assets/images/magnitudes/" + saved.role + ".png";

      const m = parseInt(saved.role.replace("mag", ""), 10);

      if (m <= 3) accent.classList.add("role-mag-low");
      else if (m <= 5) accent.classList.add("role-mag-mid");
      else accent.classList.add("role-mag-" + m);
    }
  }
}

