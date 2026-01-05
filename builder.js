const STORAGE_KEY = "seismicCardData";

const formData = { name:"", x:"", time:"", discord:1, xcontent:1, art:1, role:"mag1", photo:"" };

function nextStep(id) {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  document.getElementById(id)?.classList.add("active");

  if (id === "step-result") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    document.getElementById("cardFrame").src = "card.html#t=" + Date.now();
  }
}

document.getElementById("nameInput")?.addEventListener("input", e => formData.name = e.target.value);
document.getElementById("xInput")?.addEventListener("input", e => formData.x = e.target.value);

window.setPhoto = e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => formData.photo = ev.target.result;
  reader.readAsDataURL(file);
};

window.setTime = time => { formData.time = time; nextStep("step-discord"); };

document.getElementById("discordRange")?.addEventListener("input", e => {
  formData.discord = e.target.value;
  document.getElementById("discordValue").innerText = e.target.value + "k messages";
});

document.getElementById("xRange")?.addEventListener("input", e => {
  formData.xcontent = e.target.value;
  document.getElementById("xValue").innerText = e.target.value + " posts";
});

document.getElementById("artRange")?.addEventListener("input", e => {
  formData.art = e.target.value;
  document.getElementById("artValue").innerText = e.target.value + " works";
});

window.setRole = role => {
  formData.role = role;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  nextStep("step-result");
};
