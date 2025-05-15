import 'reflect-metadata';

type Constructor = new (...args: any[]) => {};

function Log(message: string) {
	return function (constructor: Function) {
		console.log(`${message}: ${constructor.name}`);
	};
}

@Log('The decorators are awesome')
class TestUser {
	constructor(public name: string) {}
}

const ControllerKey = Symbol('Controller');

function Controller(basePath: string = '/') {
	return function (constructor: Function) {
		Reflect.defineMetadata(ControllerKey, basePath, constructor);
	};
}

@Controller('/users')
class UserController {
	constructor(public name: string) {}
}

@Controller('/posts')
class PostController {
	constructor(public name: string) {}
}

const data = [UserController, PostController].map((c) =>
	Reflect.getMetadata(ControllerKey, c)
);
console.log(data);
