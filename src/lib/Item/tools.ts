export const getIcon = (tool: string) => {
    const tools: Record<string, string> = {
        "x-tao-itemusage-informational": "infoIcon.svg",
        "x-tao-option-highlighter": "wandIcon.svg",
        "x-tao-option-markReview": "markIcon.svg",
        "x-tao-option-reviewScreen": "",
        "x-tao-option-zoom": "zoomIcon.svg",
        "x-tao-option-endTestWarning" : "endIcon.svg",
        "x-tao-option-nextPartWarning" : "warningIcon.svg"
    };
    return tools[tool] || "";
}
