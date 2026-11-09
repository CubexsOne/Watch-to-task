.PHONY: help package

VERSION := $(shell sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' manifest.json)

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

package: ## Package current extension for the Chrome Web Store
	@rm -f watch-to-task-*.zip && zip -r "watch-to-task-$(VERSION).zip" manifest.json background.js options.html options.js icons/ -x '*.DS_Store'
