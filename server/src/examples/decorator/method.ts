function LogPerformance(
	_target: any,
	propertyKey: string,
	propertyDescriptor: PropertyDescriptor
) {
	const originalMethod = propertyDescriptor.value;
	propertyDescriptor.value = function (...args: any[]) {
		console.log(
			`\n🔴 ------ Performance decorator called for ${propertyKey} ------ 🔴\n`
		);
		const start = performance.now();
		const result = originalMethod.apply(this, args);
		const end = performance.now();
		const duration = (end - start).toFixed(2);

		console.log('Result:', result);
		console.log('Execution Time:', duration, 'ms');
		console.log('--------End--------\n');

		return result;
	};
}

class MathOperations {
	private operationCount: number = 0;
	private lastOperation: string = '';

	constructor(private name: string = 'Default Calculator') {}

	@LogPerformance
	multiply(a: number, b: number): number {
		this.operationCount++;
		this.lastOperation = 'multiply';
		// Simulate some processing time
		for (let i = 0; i < 1000000; i++) {}
		return a * b;
	}

	@LogPerformance
	factorial(n: number): number {
		this.operationCount++;
		this.lastOperation = 'factorial';
		if (n <= 1) return 1;
		return n * this.factorial(n - 1);
	}
}

// Usage
const math = new MathOperations('Scientific Calculator');
math.multiply(23, 45);
math.factorial(7);
