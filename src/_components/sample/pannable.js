export function pannable(node) {
	let x
	let y

	/**
	 * @param {{ clientX: any; clientY: any; }} event
	 */
	function handleMousedown(event) {
		x = event.clientX
		y = event.clientY

		node.dispatchEvent(
			new CustomEvent('panstart', {
				detail: {x, y},
			}),
		)

		globalThis.addEventListener('mousemove', handleMousemove)
		globalThis.addEventListener('mouseup', handleMouseup)
	}

	/**
	 * @param {{ clientX: number; clientY: number; }} event
	 */
	function handleMousemove(event) {
		const dx = event.clientX - x
		const dy = event.clientY - y
		x = event.clientX
		y = event.clientY

		node.dispatchEvent(
			new CustomEvent('panmove', {
				detail: {x, y, dx, dy},
			}),
		)
	}

	/**
	 * @param {{ clientX: any; clientY: any; }} event
	 */
	function handleMouseup(event) {
		x = event.clientX
		y = event.clientY

		node.dispatchEvent(
			new CustomEvent('panend', {
				detail: {x, y},
			}),
		)

		globalThis.removeEventListener('mousemove', handleMousemove)
		globalThis.removeEventListener('mouseup', handleMouseup)
	}

	node.addEventListener('mousedown', handleMousedown)

	return {
		destroy() {
			node.removeEventListener('mousedown', handleMousedown)
		},
	}
}
