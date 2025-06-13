# QA Automation Suite

**Automated end-to-end tests for the Demo Web App using Playwright. Containerized with Docker for reproducible runs.**

## 🚀 Prerequisites

- **Git**: to clone this repository
- **Docker & Docker Compose**: to run the web app and tests in isolated containers

## 🔧 Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/Aramia23/automation-plawright-celaralabs.git
   cd automation-playwright-celaralabs
   ```

2. **Install dependencies** (local, optional)
   ```bash
   npm install
   npx playwright install --with-deps
   ```

3. **Dockerized environment**
   - Ensure port `3100` is free.
   - Build and start both services:
     ```bash
     docker-compose up --build
     ```
   - This will:
     - Pull and run the web app on `web:3100` (accessible at `http://localhost:3100`).
     - Build the **tests** image and execute the Playwright suite against the `web` service.

## ⚙️ Running Tests

### 1. Locally (without Docker)

```bash
1. Pull the docker image containing the web app docker pull automaticbytes/demo-app

2. Run the image docker run -p 3100:3100 automaticbytes/demo-app

3. Verify the app is shown in below url http://localhost:3100

# run all tests headless
npx playwright test

# run in headed mode
npx playwright test --headed

# open last HTML report
npx playwright show-report
```

### 2. With Docker Compose

```bash
docker-compose up --build
```

- Tests will run automatically against the `web` service.
- HTML report will be generated in `playwright-report/` on the host.

### 3. Manual Docker Run

```bash
# (Optional) Remove any existing containers to avoid name conflicts
docker rm -f demo-app || true

docker rm -f automation-playwright-celaralabs || true

# 1) Build your test image (if not already built)
docker build -t automation-playwright-celaralabs .

# 2) Launch web app container
docker run -d --name demo-app -p 3100:3100 automaticbytes/demo-app

# 3) Run tests container
docker run --rm --name automation-playwright-celaralabs \
  --link demo-app:web \
  -e BASE_URL="http://web:3100" \
  automation-playwright-celaralabs

# 4) View report
npx playwright show-report playwright-report
```

## 📁 Project Structure

```
├── Dockerfile
├── docker-compose.yml
├── package.json
├── playwright.config.ts
├── web/                              # Playwright suite root
│   ├── fixtures/                     # JSON test data
│   │   ├── loginInfo.json            # credentials and login data
│   │   └── orderData.json            # checkout form data
│   ├── types.ts                      # shared TypeScript interfaces
│   ├── support/                      # Page Object Model and helpers
│   │   ├── components/               
│   │   │   ├── checkout-form.ts
│   │   │   ├── grid.ts
│   │   │   ├── header-home.ts
│   │   │   ├── login-form.ts
│   │   │   └── search.ts
│   │   ├── pages/                    # higher-level page abstractions
│   │   │   ├── checkout.ts
│   │   │   ├── grid.ts
│   │   │   ├── home.ts
│   │   │   ├── login.ts
│   │   │   └── search.ts
│   │   └── selectors/                # centralized role selectors
│   │       ├── checkout-form.ts
│   │       ├── grid.ts
│   │       ├── home.ts
│   │       ├── login-form.ts
│   │       └── search.ts
│   └── tests/                        # test definition files
│       ├── checkout.spec.ts
│       ├── grid.spec.ts
│       ├── login.spec.ts
│       └── search.spec.ts
└── playwright-report/                # Generated HTML test reports
```
