import '../node_modules/reflect-metadata/Reflect.js';
export const requiredMetadataKey = Symbol("required");
export const minLengthMetadataKey = Symbol("minLength");
export function required(target, propertyKey, parameterIndex) {
    let existingRequiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}
export function minLength(minLength) {
    return function (target, propertyKey, parameterIndex) {
        let existingMinLengthParameters = Reflect.getOwnMetadata(minLengthMetadataKey, target, propertyKey) || [];
        existingMinLengthParameters.push([parameterIndex, minLength]);
        Reflect.defineMetadata(minLengthMetadataKey, existingMinLengthParameters, target, propertyKey);
    };
}
export function validate(target, propertyName, descriptor) {
    let method = descriptor.value;
    descriptor.value = function () {
        let requiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        let minLengthParameters = Reflect.getOwnMetadata(minLengthMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (let parameterIndex of requiredParameters) {
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined
                    || (arguments[parameterIndex] + '').length === 0) {
                    throw new Error("Missing required argument.");
                }
            }
        }
        if (minLengthParameters) {
            for (let [paramIndex, minLen] of minLengthParameters) {
                if (paramIndex >= arguments.length || (arguments[paramIndex] + '').length < minLen) {
                    throw new Error(`The argument [${paramIndex}]:${arguments[paramIndex]} should be a string with length at least ${minLen} characters.`);
                }
            }
        }
        return method.apply(this, arguments);
    };
}
//# sourceMappingURL=decorators.js.map