export const exhaustiveCheck = (value: never): never => {
    throw new Error(`Unexhaustive handled value: ${value}`);
}