
export const TruncateStringFn =  (input: string, limit: number): string => {
    return input.length > limit ? input.substring(0, limit) + '...' : input;
};
