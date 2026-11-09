const formatDate = (date) => {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const escapeTitle = (title) => title.replace(/([\[\]])/g, "\\$1");

const escapeUrl = (url) => url.replaceAll("(", "%28").replaceAll(")", "%29");

const buildEntry = (tab) =>
  `- [ ] [${escapeTitle(tab.title || tab.url)}](${escapeUrl(tab.url)}) - ${formatDate(new Date())}`;

const showBadge = (tabId, text, color) => {
  chrome.action.setBadgeText({ text, tabId });
  chrome.action.setBadgeBackgroundColor({ color, tabId });
  setTimeout(() => chrome.action.setBadgeText({ text: "", tabId }), 1500);
};

chrome.action.onClicked.addListener(async (tab) => {
  const { vault, file } = await chrome.storage.sync.get(["vault", "file"]);

  if (!vault || !file) {
    chrome.runtime.openOptionsPage();
    return;
  }

  const obsidianUrl =
    `obsidian://new?vault=${encodeURIComponent(vault)}` +
    `&file=${encodeURIComponent(file)}` +
    `&content=${encodeURIComponent(buildEntry(tab))}&append=true`;

  try {
    await chrome.tabs.update(tab.id, { url: obsidianUrl });
    showBadge(tab.id, "✓", "#2e7d32");
  } catch (e) {
    showBadge(tab.id, "!", "#c62828");
    console.error("Watch to Task:", e);
  }
});
