export type HandleType = "color" | "vector" | "matrix" | "scalar" | "string" | "boolean" | "object";

export const handleTypeColors = {
    color: "#c7c729",
    vector: "#6363c7",
    matrix: "#ff904f",
    scalar: "#a1a1a1",
    string: "#70b2ff",
    boolean: "#cca6d6",
    object: "#00d6a3",
}

export const handleTypeCompatibilities: {[key in HandleType]: HandleType[]} = {
    color: ["color", "vector", "scalar"],
    vector: ["vector", "color", "scalar"],
    matrix: ["matrix"],
    scalar: ["scalar", "vector", "color", "boolean"],
    string: ["string"],
    boolean: ["boolean", "scalar", "vector", "color"],
    object: ["object"],
}