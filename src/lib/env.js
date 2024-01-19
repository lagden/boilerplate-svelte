/**
 * Retrieves the environment variables from the import.meta object.
 *
 * @returns {Object} An object containing environment variables, or an empty object if not available.
 * @function
 * @exports
 */
export function getEnv() {
	// @ts-ignore
	return import.meta.env ?? {}
}
