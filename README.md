# testkube.io navigation Playwright E2E

This repo contains Playwright E2E tests that validate basic navigation on:

```text
https://testkube.io
```

## Local run

```bash
npm ci
npx playwright install --with-deps
BASE_URL=https://testkube.io npm test
```

## Run in Testkube

Apply the workflow:

```bash
kubectl apply -f testkube/testworkflow.yaml
```

Execute it:

```bash
testkube run tw testkube-io-navigation-playwright --follow
```

Artifacts (HTML report, traces, etc.) are collected from:

```text
playwright-report/
test-results/
```\