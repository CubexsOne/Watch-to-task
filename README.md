# Watch-to-task
Chrome-Erweiterung, um den aktuellen Tab als Checklisten-Eintrag in Obsidian zu speichern.

## Installation (Entwicklermodus)
1. `chrome://extensions` öffnen
2. Oben rechts **Entwicklermodus** aktivieren
3. **Entpackte Erweiterung laden** und diesen Ordner auswählen
4. In den Optionen der Erweiterung Vault-Name und Zieldatei eintragen

## Paket für den Chrome Web Store
```sh
make package
```
Erzeugt `watch-to-task-<version>.zip`, das im Chrome Web Store Developer Dashboard hochgeladen werden kann.
