local lspconfig = require('lspconfig')

-- Terraform
lspconfig.terraformls.setup {}

-- Ansible
lspconfig.ansiblels.setup {}

-- Yaml
lspconfig.yamlls.setup {}

-- Python
lspconfig.pyright.setup {}

-- Bash
lspconfig.bashls.setup {}

-- Json
lspconfig.jsonls.setup {}

-- HTML
lspconfig.html.setup {}

-- CSS
lspconfig.cssls.setup {}

-- Docker
lspconfig.dockerls.setup {}

-- TypeScript/JavaScript
lspconfig.tsserver.setup {}

-- Emmet
lspconfig.emmet_ls.setup {}

-- ESLint
lspconfig.eslint.setup {}