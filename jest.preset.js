const nxPreset = require('@nx/jest/preset').default;

module.exports = {
    ...nxPreset,
    transform: {
        // svg
        '^.+\\.(ts|js|html|svg)$': 'ts-jest',
    }
};
