import 'reflect-metadata';

import { injectable, inject, container, delay } from 'tsyringe';
import { A } from './A';
import { B } from './B';

const AService = container.resolve(A);
const BService = container.resolve(B);

console.log(AService);
console.log(BService);
