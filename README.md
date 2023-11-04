<div align="center">
  <p>
    <a href="https://postimg.cc/3W6yhNds">
      <img src="https://i.postimg.cc/Dyf1qbFw/pngimg-com-skeleton-PNG42640.png">
    </a>
  </p>

  <h1>NestJS API documentation skeleton</h1>

  <p>
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
    <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white">
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
    <img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white">
  </p>
</div>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Environment](#environment)
    * [Running the app](#running-the-app)
* [Documentation](#documentation)

<!-- GETTING STARTED -->
## Getting Started

This is an instructions on setting up the project locally.

### Prerequisites
Install **npm**
```bash
$ npm install 18.2.2
```
Install **make** (optional)
```bash
$ apt-get update
```
```bash
$ apt-get install make
```
_or_
```bash
$ apt-get install --reinstall make
```

### Installation

1. Clone repository
```bash
$ git clone https://github.com/crissancar/nestjs-skeleton-api-documentation.git
```
2. Install dependencies
```bash
$ make deps
```
_or_
```bash
$ npm install
```

### Environment
Create an `.env` file with these variables in the root directory
```
ENV_KEY=
NODE_ENV=
SKELETON_API_DOCUMENTATION_env_show=
SKELETON_API_DOCUMENTATION_logger_level=
SKELETON_API_DOCUMENTATION_api_port=
SKELETON_API_DOCUMENTATION_api_url=
SKELETON_API_DOCUMENTATION_api_documentation_url=
SKELETON_API_DOCUMENTATION_api_documentation_title=
SKELETON_API_DOCUMENTATION_api_documentation_favicon=
SKELETON_API_DOCUMENTATION_api_documentation_auth_enabled=
SKELETON_API_DOCUMENTATION_api_documentation_auth_user=
SKELETON_API_DOCUMENTATION_api_documentation_auth_password=
SKELETON_API_DOCUMENTATION_api_documentation_logo_url=
SKELETON_API_DOCUMENTATION_api_documentation_logo_href=
SKELETON_API_DOCUMENTATION_api_documentation_logo_altText=
SKELETON_API_DOCUMENTATION_api_documentation_fetch_url=
SKELETON_API_DOCUMENTATION_api_documentation_fetch_apiKey=
```

### Running the app
```bash
$ make start
```
_or_
```bash
$ npm run start:dev
```

<!-- DOCUMENTATION -->
## Documentation
-  [NestJS](https://docs.nestjs.com/)

