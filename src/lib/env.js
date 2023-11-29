/**
 * Retrieves the environment configuration.
 * @returns {Object} The environment configuration object.
 */
export function getEnv() {
	return import.meta.env ?? {}
}
