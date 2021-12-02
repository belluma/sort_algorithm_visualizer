export const createRandomArray = (length: number): number[] => {
    return [...Array(length)].map(
        (_) => Math.ceil(Math.random() * length)
    );
};
