# Start from the official Playwright image that already bundles browsers
FROM mcr.microsoft.com/playwright:focal

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci
RUN npx playwright install --with-deps

# Copy everything else
COPY . .

# By default, run tests headlessly and generate HTML report
CMD ["npx", "playwright", "test", "--reporter=html"]
