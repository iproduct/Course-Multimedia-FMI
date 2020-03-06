export function resolvePromiseAfterTimeout(result, timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result), timeout);
    });
}
//# sourceMappingURL=utilities.js.map