.PHONY: help package

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

package: ## Package current add-on
	@rm -f watch-to-task-*.zip && zip -r "watch-to-task-$$(python3 -c "import json;print(json.load(open('manifest.json'))['version'])").zip" manifest.json background.js options.html options.js icons/