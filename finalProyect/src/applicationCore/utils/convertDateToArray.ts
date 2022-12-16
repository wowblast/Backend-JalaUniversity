export function ConvertDateToArray(date: Date): number[]{
    return date.toString().split("").reverse().map(d => parseInt(d)).filter(char => !Number.isNaN(char))
}

