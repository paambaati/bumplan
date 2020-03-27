# bumplan

[![WTFPL License](https://img.shields.io/badge/License-WTFPL-blue.svg)](LICENSE)

A simple program that finds the seating arrangement for passengers for a given custom airplane seat layout.

![Screenshot](SCREENSHOT.png)

<small> 📣 Note that this project was purpose-built for a coding challenge (see [problem statement](PROBLEM-STATEMENT.md)).</small>

### 🛠️ Setup

Before you run this app, make sure you have [Node.js](https://nodejs.org/en/) installed. [`yarn`](https://yarnpkg.com/lang/en/docs/install) is recommended, but can be used interchangeably with `npm`.

```bash
git clone https://github.com/paambaati/bumplan
cd bumplan
yarn install && yarn build
```

#### 👩🏻‍💻 Usage
```bash
yarn start "<seat_layout>" "<passengers_count>"
```

#### 🧪 Tests & Coverage
```bash
yarn run coverage
```
