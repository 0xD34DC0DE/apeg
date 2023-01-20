import React, {createContext, useEffect, useState} from "react";

type NestedElement = {
    nestingLevel: number;
    close: () => void;
}

export type NestedDropdownContextType = {
    onHoveredItemChanged: (nestingLevel?: number) => void;
    registerNestedElement: (element: NestedElement) => void;
}

const nestedDropdownContextDefault = {
    onHoveredItemChanged: () => {
        console.log("Still not initialized");
    },
    registerNestedElement: () => {}
}

export const NestedDropdownContext = createContext<NestedDropdownContextType>(nestedDropdownContextDefault);

const NestedDropdownContextProvider = ({children}: { children: React.ReactNode }) => {
    const [nestedElements, setNestedElements] = useState<NestedElement[]>([]);
    const [currentState, setCurrentState] = useState<NestedDropdownContextType>(nestedDropdownContextDefault);

    useEffect(() => {
        setCurrentState({
            onHoveredItemChanged: (nestingLevel?: number) => {
                //console.log("onHoveredItemChanged", nestingLevel, nestedElements.length);

                if(nestingLevel == 0) {
                    console.log("onHoveredItemChanged", nestingLevel, nestedElements.length);
                    return;
                }

                if (nestingLevel === undefined) {
                    return;
                }

                for (let nestedElement of nestedElements) {
                    if (nestedElement.nestingLevel === nestingLevel) {
                        console.log("onHoveredItemChanged", nestingLevel, "found");
                        nestedElement.close();
                    }
                }

                setNestedElements(nestedElements.filter(e => e.nestingLevel <= nestingLevel));
            },
            registerNestedElement: (element: NestedElement) => {
                console.log("registerNestedElement", element);
                setNestedElements(() => [...nestedElements, element]);
            }
        });
    }, [nestedElements,]);

    return (
        <NestedDropdownContext.Provider value={currentState}>
            {children}
        </NestedDropdownContext.Provider>
    );
}

export default NestedDropdownContextProvider;