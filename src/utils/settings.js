const SETTINGS_KEY = "taskme_settings";

const defaultSettings = {
  mode: "random",
  count: 3,
};

export function getSettings() {
  const raw = localStorage.getItem(SETTINGS_KEY);
  return raw ? JSON.parse(raw) : defaultSettings;
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
