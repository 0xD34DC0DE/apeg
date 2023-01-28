export const RandomBackgroundColor = (): {backgroundColor: string} => {
    return {
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }
}