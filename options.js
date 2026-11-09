const vaultInput = document.getElementById("vault");
const fileInput = document.getElementById("file");
const status = document.getElementById("status");

chrome.storage.sync.get(["vault", "file"]).then(({ vault, file }) => {
  vaultInput.value = vault || "";
  fileInput.value = file || "";
});

document.getElementById("save").addEventListener("click", async () => {
  await chrome.storage.sync.set({
    vault: vaultInput.value.trim(),
    file: fileInput.value.trim(),
  });
  status.textContent = "Gespeichert ✓";
  setTimeout(() => (status.textContent = ""), 1500);
});
