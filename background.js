const formatDate = (date) => {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const escapeTitle = (title) => title.replace(/([\[\]])/g, "\\$1");

const escapeUrl = (url) => url.replaceAll("(", "%28").replaceAll(")", "%29");

const buildEntry = (tab) =>
  `- [ ] [${escapeTitle(tab.title || tab.url)}](${escapeUrl(tab.url)}) - ${formatDate(new Date())}`;

const showBadge = (tabId, text, color) => {
  browser.action.setBadgeText({ text, tabId });
  browser.action.setBadgeBackgroundColor({ color, tabId });
  setTimeout(() => browser.action.setBadgeText({ text: "", tabId }), 1500);
};

browser.action.onClicked.addListener(async (tab) => {
  const { vault, file } = await browser.storage.sync.get(["vault", "file"]);

  if (!vault || !file) {
    browser.runtime.openOptionsPage();
    return;
  }

  const obsidianUrl =
    `obsidian://new?vault=${encodeURIComponent(vault)}` +
    `&file=${encodeURIComponent(file)}` +
    `&content=${encodeURIComponent(buildEntry(tab))}&append=true`;

  try {
    await browser.tabs.update(tab.id, { url: obsidianUrl });
    showBadge(tab.id, "✓", "#2e7d32");
  } catch (e) {
    showBadge(tab.id, "!", "#c62828");
    console.error("Watch to Task:", e);
  }
});
