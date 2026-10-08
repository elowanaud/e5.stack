import * as Sentry from "@sentry/node";

import env from "#start/env";

// Ensure to call this before importing any other modules!
Sentry.init({
	enabled: env.get("SENTRY_ENABLED"),
	environment: env.get("SENTRY_ENV"),
	dsn: env.get("SENTRY_DSN"),
	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for tracing.
	// We recommend adjusting this value in production
	// Learn more at
	// https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#tracesSampleRate
	tracesSampleRate: 1.0,
});
