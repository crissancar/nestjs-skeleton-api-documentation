.PHONY = build deps start

# Build project
build:
	npm run build

# Install dependencies
deps:
	npm install

# Start app in dev environment
start:
	npm run start:dev:swc
