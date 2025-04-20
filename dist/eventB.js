// // eventBGenerator.js

// document.addEventListener('DOMContentLoaded', () => {
//     const downloadJSBtn = document.getElementById('downloadJSBtn');
//     if (downloadJSBtn) {
//         downloadJSBtn.addEventListener('click', generateAndDownloadJS);
//     }
// });

// function generateAndDownloadJS() {
//     const staticContainers = document.querySelectorAll('[id^="static_"]');
//     const moduleContainers = document.querySelectorAll('[id^="module_"]');
    
//     let jsContent = '';
    
//     staticContainers.forEach((staticContainer) => {
//         const staticId = staticContainer.id;
//         jsContent += generateContextClass(staticId);
//     });
    
//     moduleContainers.forEach((moduleContainer) => {
//         const moduleId = moduleContainer.id;
//         jsContent += generateMachineClass(moduleId);
//     });
    
//     downloadFile('generated_template.js', jsContent);
// }

// function generateContextClass(staticId) {
//     const contextNumber = staticId.split('_')[1];
//     let classContent = `
// class Context${contextNumber} {
//     constructor() {
//         this.sets = [];
//         this.constants = [];
//         this.axioms = [];
//     }

//     function1() {
//         // Implementation for function1
//         if (condition) {
//             // Do something
//         } else {
//             // Do something else
//         }
//     }

//     function2() {
//         // Implementation for function2
//         if (condition) {
//             // Do something
//         } else {
//             // Do something else
//         }
//     }
// }
// `;
//     return classContent;
// }

// function generateMachineClass(moduleId) {
//     const machineNumber = moduleId.split('_')[1];
//     let classContent = `
// class Machine${machineNumber} {
//     constructor() {
//         this.variables = [];
//         this.invariants = [];
//         this.events = [];
//     }

//     initialize() {
//         // Initialization logic
//     }

//     // Add more methods as needed
// }
// `;
//     return classContent;
// }

// function downloadFile(filename, content) {
//     const blob = new Blob([content], { type: 'text/javascript' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = filename;
//     link.click();
//     URL.revokeObjectURL(link.href);
// }







// // eventBGenerator.js

// document.addEventListener('DOMContentLoaded', () => {
//     const downloadJSBtn = document.getElementById('downloadJSBtn');
//     if (downloadJSBtn) {
//         downloadJSBtn.addEventListener('click', generateAndDownloadJS);
//     }
// });

// function generateAndDownloadJS() {
//     const staticContainers = document.querySelectorAll('[id^="static_"]');
//     let jsContent = generateContextClasses(staticContainers);
//     downloadFile('generated_template.js', jsContent);
// }

// function generateContextClasses(staticContainers) {
//     let classContent = '';
//     let contextHierarchy = [];

//     staticContainers.forEach((container, index) => {
//         const contextId = container.id;
//         const contextNumber = contextId.split('_')[1];
//         contextHierarchy.push(`Context_${contextNumber}`);

//         classContent += `
// class Context_${contextNumber} ${index > 0 ? `extends Context_${index - 1}` : ''} {
//     constructor() {
//         ${index > 0 ? 'super();' : ''}
//         this.sets = [];
//         this.constants = [];
//         this.axioms = [];
//     }

//     func_1() {
//         console.log("Executing func_1 in Context_${contextNumber}");
//         // Add your func_1 logic here
//     }

//     func_2() {
//         console.log("Executing func_2 in Context_${contextNumber}");
//         // Add your func_2 logic here
//     }

//     ${getAdditionalFunctions(container)}

//     // You can add more methods here if needed
// }
// `;
//     });

//     classContent += `
// // Example usage:
// ${contextHierarchy.map(context => `const ${context.toLowerCase()} = new ${context}();`).join('\n')}
// ${contextHierarchy.map(context => `${context.toLowerCase()}.func_1();`).join('\n')}
// ${contextHierarchy.map(context => `${context.toLowerCase()}.func_2();`).join('\n')}
// `;

//     return classContent;
// }

// function getAdditionalFunctions(container) {
//     const functions = container.querySelectorAll('.oval-shape[class*="func_"]');
//     let functionContent = '';

//     functions.forEach(func => {
//         const funcName = func.className.split(' ').find(cls => cls.startsWith('func_'));
//         if (funcName && !['func_1', 'func_2'].includes(funcName)) {
//             functionContent += `
//     ${funcName}() {
//         console.log("Executing ${funcName}");
//         // Add your ${funcName} logic here
//     }
// `;
//         }
//     });

//     return functionContent;
// }

// function downloadFile(filename, content) {
//     const blob = new Blob([content], { type: 'text/javascript' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = filename;
//     link.click();
//     URL.revokeObjectURL(link.href);
// }





document.addEventListener('DOMContentLoaded', () => {
    const downloadJSBtn = document.getElementById('downloadJSBtn');
    if (downloadJSBtn) {
        downloadJSBtn.addEventListener('click', generateAndDownloadJS);
    }

    // Set up popup event listeners for existing function buttons
    const existingFunctions = document.querySelectorAll('.oval-shape[class*="func_"]');
    existingFunctions.forEach(funcButton => {
        addHoverFunctionality(funcButton);
    });
});

function generateAndDownloadJS() {
    const staticContainers = document.querySelectorAll('[id^="static_"]');
    let jsContent = generateContextClasses(staticContainers);
    downloadFile('generated_template.js', jsContent);
}

function generateContextClasses(staticContainers) {
    let classContent = '';
    let contextHierarchy = [];

    staticContainers.forEach((container, index) => {
        const contextId = container.id;
        const contextNumber = contextId.split('_')[1];
        contextHierarchy.push(`Context_${contextNumber}`);

        classContent += `
class Context_${contextNumber} ${index > 0 ? `extends Context_${index - 1}` : ''} {
    constructor() {
        ${index > 0 ? 'super();' : ''}
        this.sets = [];
        this.constants = [];
        this.axioms = [];
    }

    func_1() {
        console.log("Executing func_1 in Context_${contextNumber}");
        // Add your func_1 logic here
    }

    func_2() {
        console.log("Executing func_2 in Context_${contextNumber}");
        // Add your func_2 logic here
    }

    ${getAdditionalFunctions(container)}

    // You can add more methods here if needed
}
`;
    });

    classContent += `
// Example usage:
${contextHierarchy.map(context => `const ${context.toLowerCase()} = new ${context}();`).join('\n')}
${contextHierarchy.map(context => `${context.toLowerCase()}.func_1();`).join('\n')}
${contextHierarchy.map(context => `${context.toLowerCase()}.func_2();`).join('\n')}
`;

    return classContent;
}

function getAdditionalFunctions(container) {
    const functions = container.querySelectorAll('.oval-shape[class*="func_"]');
    let functionContent = '';

    functions.forEach(func => {
        const funcName = func.className.split(' ').find(cls => cls.startsWith('func_'));
        if (funcName && !['func_1', 'func_2'].includes(funcName)) {
            functionContent += `
    ${funcName}() {
        console.log("Executing ${funcName}");
        // Add your ${funcName} logic here
    }
`;
        }
    });

    return functionContent;
}

function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/javascript' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

// Leader Line and UI setup
document.addEventListener('DOMContentLoaded', () => {
    // Variables and initial setup
    const static0 = document.getElementById('static_0');
    const module0 = document.getElementById('module_0');
    const container = document.getElementById('container');
    let staticCounter = 0;
    let moduleCounter = 0;
    let funcCounter = 2; // Start at 2 since we already have func_1 and func_2
    const createdStaticContainers = new Set();
    const createdModuleContainers = new Set();
    const downArrows = {};
    let leaderLines = [];
    const seesRelationships = new Map();
    const historyStack = [];
    let redoStack = []; // Stack for redo operations
    const contextMenu = document.getElementById('contextMenu');
    const addFunctionOption = document.getElementById('addFunctionOption');
    let targetModule = null;
    const popups = new Map(); // Store popups for each function

    // Initial LeaderLine setup
    const skyblue = '#5DADE2';
    const pink = '#FF1493';

    if (static0 && module0) {
        const initialLine = new LeaderLine(
            static0,
            module0,
            {
                color: skyblue,
                size: 4,
                endPlug: 'arrow3',
                path: 'straight'
            }
        );
        leaderLines.push(initialLine);
    }

    // Context menu setup
    function showContextMenu(e) {
        e.preventDefault();
        contextMenu.style.display = 'block';
        contextMenu.style.left = `${e.pageX}px`;
        contextMenu.style.top = `${e.pageY}px`;
        targetModule = e.target.closest('[id^="module_"]');
    }
    
    function hideContextMenu() {
        contextMenu.style.display = 'none';
    }

    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('[id^="module_"]')) {
            showContextMenu(e);
        } else {
            hideContextMenu();
        }
    });

    document.addEventListener('click', (e) => {
        // Only hide the context menu if we're not clicking inside a popup
        if (!e.target.closest('.popup')) {
            hideContextMenu();
        }
    });

    // Popup functionality
    function createPopup(funcName) {
        // Check if popup already exists
        if (popups.has(funcName)) {
            return popups.get(funcName);
        }
        
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.id = `popup-${funcName}`;
        popup.innerHTML = `
            <h3>${funcName}</h3>
            <div>
                <h4>Precondition:</h4>
                <textarea class="precondition" rows="3" cols="30" id="${funcName}-pre"></textarea>
            </div>
            <div>
                <h4>Postcondition:</h4>
                <textarea class="postcondition" rows="3" cols="30" id="${funcName}-post"></textarea>
            </div>
        `;
        popup.style.position = 'absolute';
        popup.style.zIndex = '1000';
        popup.style.display = 'none';
        
        // Store the popup in our map
        popups.set(funcName, popup);
        
        document.body.appendChild(popup);
        return popup;
    }

    function positionPopup(element, popup) {
        const rect = element.getBoundingClientRect();
        
        let left = rect.right + 10;
        let top = rect.top;
    
        // Check if the popup goes off the right edge of the screen
        if (left + 300 > window.innerWidth) {
            left = rect.left - 300 - 10;
        }
    
        // Check if the popup goes off the bottom of the screen
        if (top + 200 > window.innerHeight) {
            top = window.innerHeight - 200 - 10;
        }
    
        popup.style.left = `${left}px`;
        popup.style.top = `${top}px`;
    }

    function addHoverFunctionality(element) {
        const funcName = element.className.split(' ').find(cls => cls.startsWith('func_')) || 
                        element.className.split(' ').find(cls => cls.startsWith('refine_'));
        if (!funcName) return;
        
        const popup = createPopup(funcName);
    
        // Show popup on click instead of hover
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Hide all other popups first
            popups.forEach((p, key) => {
                if (key !== funcName) {
                    p.style.display = 'none';
                }
            });
            
            // Toggle this popup
            if (popup.style.display === 'block') {
                popup.style.display = 'none';
            } else {
                popup.style.display = 'block';
                positionPopup(element, popup);
                
                // Focus on the precondition textarea
                setTimeout(() => {
                    const preTextarea = document.getElementById(`${funcName}-pre`);
                    if (preTextarea) preTextarea.focus();
                }, 100);
            }
        });
    
        // Prevent popup from closing when clicking within it
        popup.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Handle clicking outside to close
        document.addEventListener('click', (e) => {
            if (!element.contains(e.target) && 
                !popup.contains(e.target)) {
                popup.style.display = 'none';
            }
        });
        
        // Prevent popup closing when typing
        popup.querySelectorAll('textarea').forEach(textarea => {
            textarea.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }

    // Add hover functionality to existing func_1 and func_2
    if (module0) {
        const func1Button = module0.querySelector('.func_1');
        const func2Button = module0.querySelector('.func_2');

        if (func1Button) addHoverFunctionality(func1Button);
        if (func2Button) addHoverFunctionality(func2Button);
    }

    // History tracking
    function captureState(action, elementId) {
        const state = {
            action,
            elementId,
            staticContainers: Array.from(document.querySelectorAll('[id^="static_"]')).map(el => el.outerHTML),
            moduleContainers: Array.from(document.querySelectorAll('[id^="module_"]')).map(el => el.outerHTML),
            leaderLines: leaderLines.map(line => ({
                startId: line.start?.id || null,
                endId: line.end?.id || null
            })),
            downArrows: Object.keys(downArrows).map(key => ({
                key,
                startId: downArrows[key].start?.id || null,
                endId: downArrows[key].end?.id || null
            })),
            funcButtons: Array.from(document.querySelectorAll('.oval-shape'))
                .map(el => ({
                    id: el.className.split(' ').find(cls => cls.startsWith('func_') || cls.startsWith('refine_')),
                    parentId: el.parentElement?.id || '',
                    outerHTML: el.outerHTML
                }))
        };
        historyStack.push(state);
        redoStack = []; // Clear redo stack on new action
    }

    function addFunctionButton(moduleElement) {
        const existingFunctions = moduleElement.querySelectorAll('.oval-shape[class*="func_"]');
        const nextFuncNumber = existingFunctions.length + 1;
        const funcName = `func_${nextFuncNumber}`;

        const newButton = document.createElement('div');
        newButton.className = `oval-shape ${funcName}`;
        newButton.innerText = funcName;

        // Add the button to the module
        moduleElement.appendChild(newButton);
        
        // Add event listeners and popup for the new button
        addHoverFunctionality(newButton);

        // If this is module_0, also add refinement to module_1 if it exists
        if (moduleElement.id === 'module_0') {
            const module1 = document.getElementById('module_1');
            if (module1) {
                // Create a refinement in module_1
                addRefinementButton(module1, `refine_${funcName}`, 1);
            }
        }

        captureState('addFunctionButton', funcName);
        adjustModuleHeight();
        return newButton;
    }

    // Add function button via context menu
    addFunctionOption.addEventListener('click', () => {
        if (targetModule) {
            addFunctionButton(targetModule);
            hideContextMenu();
        }
    });

    function addStaticContainer(baseElement) {
        staticCounter++;
        const newStaticId = `static_${staticCounter}`;

        createdStaticContainers.add(baseElement.id);

        const newStatic = document.createElement('div');
        newStatic.id = newStaticId;
        newStatic.className = `static_0 p-4 outline-none text-center w-36 h-36 cursor-pointer uppercase relative rounded-2xl`;
        newStatic.contentEditable = 'true';
        newStatic.innerHTML = `${newStaticId}
            <div class="border-overlay-right absolute top-0 right-0 w-2 h-full"></div>
            <div class="border-overlay-bottom absolute bottom-0 left-0 w-full h-2"></div>
            <div class="small-box bottom-right"></div>
            <div class="status-indicator"></div>`;

        const newContainer = document.createElement('div');
        newContainer.className = 'static-container flex items-center space-x-4';
        newContainer.appendChild(newStatic);
        container.appendChild(newContainer);

        // Position horizontally instead of vertically
        newContainer.style.position = 'absolute';
        const baseRect = baseElement.getBoundingClientRect();
        newContainer.style.left = `${baseRect.right + 80}px`;
        newContainer.style.top = `${baseRect.top}px`;

        const line = new LeaderLine(
            baseElement,
            newStatic,
            {
                color: skyblue,
                size: 4,
                endPlug: 'arrow3',
                path: 'straight'
            }
        );
        leaderLines.push(line);

        newStatic.querySelector('.border-overlay-right').addEventListener('click', () => addStaticContainer(newStatic));
        newStatic.querySelector('.small-box.bottom-right').addEventListener('click', () => {
            const moduleId = `module_${staticCounter}`;
            const module = document.getElementById(moduleId);
            if (module) {
                toggleDownArrow(newStatic, module);
            } else {
                alert(`${moduleId} not found.`);
            }
        });

        captureState('addStaticContainer', newStaticId);
        return newStatic;
    }

    function addModuleContainer(baseElement) {
        moduleCounter++;
        const correspondingStaticId = `static_${moduleCounter}`;
        const correspondingStatic = document.getElementById(correspondingStaticId);

        if (!correspondingStatic) {
            const prevStatic = document.getElementById(`static_${moduleCounter - 1}`) || static0;
            addStaticContainer(prevStatic);
        }

        createdModuleContainers.add(baseElement.id);

        const newModuleId = `module_${moduleCounter}`;

        const newModule = document.createElement('div');
        newModule.id = newModuleId;
        newModule.className = 'module_0 p-4 outline-none rounded-2xl text-center w-36 cursor-pointer uppercase relative';
        newModule.contentEditable = 'true';
        newModule.innerHTML = `${newModuleId}
            <div class="border-overlay-right absolute top-0 right-0 w-2 h-full"></div>
            <div class="small-box top-left"></div>
            <div class="status-indicator"></div>`;

        const newContainer = document.createElement('div');
        newContainer.className = 'module-row space-x-4';
        newContainer.appendChild(newModule);
        container.appendChild(newContainer);

        // Position horizontally instead of vertically
        newContainer.style.position = 'absolute';
        const baseRect = baseElement.getBoundingClientRect();
        newContainer.style.left = `${baseRect.right + 80}px`;
        newContainer.style.top = `${baseRect.top}px`;

        const line = new LeaderLine(
            baseElement,
            newModule,
            {
                color: pink,
                size: 4,
                endPlug: 'arrow3',
                path: 'straight'
            }
        );
        leaderLines.push(line);

        const updatedCorrespondingStatic = document.getElementById(correspondingStaticId);
        if (updatedCorrespondingStatic) {
            const downArrow = new LeaderLine(
                updatedCorrespondingStatic,
                newModule,
                {
                    color: skyblue,
                    size: 4,
                    endPlug: 'arrow3',
                    path: 'straight'
                }
            );
            downArrows[`${correspondingStaticId}-${newModuleId}`] = downArrow;
            leaderLines.push(downArrow);
        }

        newModule.querySelector('.border-overlay-right').addEventListener('click', () => addModuleContainer(newModule));
        newModule.querySelector('.small-box.top-left').addEventListener('click', () => {
            const updatedStatic = document.getElementById(correspondingStaticId);
            if (updatedStatic) {
                toggleDownArrow(updatedStatic, newModule);
            }
        });

        // Add context menu for adding functions
        newModule.addEventListener('contextmenu', showContextMenu);

        captureState('addModuleContainer', newModuleId);

        // Copy functions from the previous module with refinements
        const prevModule = document.getElementById(`module_${moduleCounter - 1}`);
        if (prevModule) {
            const prevFunctions = prevModule.querySelectorAll('.oval-shape[class*="func_"]');
            prevFunctions.forEach(funcElem => {
                const funcClass = funcElem.className.split(' ').find(cls => cls.startsWith('func_'));
                if (funcClass) {
                    const refinedName = `refine_${funcClass}`;
                    addRefinementButton(newModule, refinedName, moduleCounter);
                }
            });
        }

        adjustModuleHeight();
        return newModule;
    }

    function addRefinementButton(moduleElement, funcName, counter) {
        const newButton = document.createElement('div');
        newButton.className = `oval-shape ${funcName}`;
        
        // Make sure the full name is visible by abbreviating if needed
        const displayName = funcName.length > 10 ? 
            funcName.substring(0, 4) + "..." + funcName.substring(funcName.length - 4) : 
            funcName;
        
        newButton.innerText = displayName;
        newButton.title = funcName; // Add title for hover tooltip with full name

        // Styling for refinement buttons - more distinctive color
        newButton.style.backgroundColor = '#9c3fa1';
        newButton.style.color = 'white';

        addHoverFunctionality(newButton);

        // Refinement propagation
        newButton.addEventListener('dblclick', function(e) {
            e.stopPropagation(); // Prevent default click behavior
            
            // Check if there's a next module to refine to
            const nextModuleId = `module_${counter + 1}`;
            const nextModule = document.getElementById(nextModuleId);
            if (nextModule) {
                const refinedFuncName = `${funcName}${counter}`;
                const existingRefinement = nextModule.querySelector(`.${refinedFuncName}`);
                if (!existingRefinement) {
                    addRefinementButton(nextModule, refinedFuncName, counter + 1);
                }
            } else if (moduleElement.id === 'module_0') {
                // Create the next module if it doesn't exist
                const newModule = addModuleContainer(moduleElement);
                const refinedFuncName = `${funcName}${counter}`;
                addRefinementButton(newModule, refinedFuncName, counter + 1);
            }
        });

        moduleElement.appendChild(newButton);
        captureState('addRefinementButton', funcName);
        adjustModuleHeight();
        return newButton;
    }

    function toggleDownArrow(baseElement, targetElement) {
        const baseId = baseElement.id;
        const targetId = targetElement.id;
        
        const key = `${baseId}-${targetId}`;
        if (downArrows[key]) {
            downArrows[key].remove();
            delete downArrows[key];
            seesRelationships.delete(baseId);
        } else {
            downArrows[key] = new LeaderLine(
                LeaderLine.pointAnchor(baseElement, { x: '100%', y: '100%' }), 
                LeaderLine.pointAnchor(targetElement, { x: '0%', y: '0%' }),   
                {
                    color: skyblue,
                    size: 4,
                    endPlug: 'arrow3',
                    path: 'straight',
                    startSocket: 'bottom',
                    endSocket: 'top',
                    startSocketGravity: 100,
                    endSocketGravity: 100,
                    endLabel: 'Sees'
                }
            );
            leaderLines.push(downArrows[key]);
            seesRelationships.set(baseId, targetId);
        }

        captureState('toggleDownArrow', key);
    }

    // FIXED UNDO FUNCTIONALITY
    function undo() {
        if (historyStack.length <= 1) return; // Keep at least one state
        
        const currentState = historyStack.pop();
        redoStack.push(currentState);
        
        // Handle different action types
        switch(currentState.action) {
            case 'addStaticContainer':
                undoAddStaticContainer(currentState.elementId);
                break;
            case 'addModuleContainer':
                undoAddModuleContainer(currentState.elementId);
                break;
            case 'addFunctionButton':
                undoAddFunctionButton(currentState.elementId);
                break;
            case 'addRefinementButton':
                undoAddRefinementButton(currentState.elementId);
                break;
            case 'toggleDownArrow':
                undoToggleDownArrow(currentState.elementId);
                break;
            default:
                console.log("Unknown action type:", currentState.action);
        }
        
        // Update all leader lines positions
        leaderLines.forEach(line => {
            if (line.position) line.position();
        });
    }
    
    function undoAddStaticContainer(elementId) {
        // Don't attempt to remove static_0
        if (elementId === 'static_0') return;
    
        const staticElement = document.getElementById(elementId);
        if (!staticElement) return;
        
        // Find and remove any leader lines connected to this element
        for (let i = leaderLines.length - 1; i >= 0; i--) {
            const line = leaderLines[i];
            const startId = line.start?.id;
            const endId = line.end?.id;
            
            if (startId === elementId || endId === elementId) {
                line.remove();
                leaderLines.splice(i, 1);
            }
        }
        
        // Remove down arrows associated with this static container
        Object.keys(downArrows).forEach(key => {
            if (key.includes(elementId)) {
                downArrows[key].remove();
                delete downArrows[key];
            }
        });
        
        // Remove from the set of created static containers
        createdStaticContainers.delete(elementId);
        
        // Remove the container from the DOM
        const container = staticElement.closest('.static-container');
        if (container) {
            container.remove();
        } else {
            staticElement.remove(); // Fallback to direct removal
        }
        
        // Decrement counter
        if (staticCounter > 0) staticCounter--;
    }
    
    function undoAddModuleContainer(elementId) {
        // Don't attempt to remove module_0
        if (elementId === 'module_0') return;
        
        const moduleElement = document.getElementById(elementId);
        if (!moduleElement) return;
        
        // Find and remove any leader lines connected to this element
        for (let i = leaderLines.length - 1; i >= 0; i--) {
            const line = leaderLines[i];
            const startId = line.start?.id;
            const endId = line.end?.id;
            
            if (startId === elementId || endId === elementId) {
                line.remove();
                leaderLines.splice(i, 1);
            }
        }
        
        // Remove down arrows associated with this module
        Object.keys(downArrows).forEach(key => {
            if (key.includes(elementId)) {
                downArrows[key].remove();
                delete downArrows[key];
            }
        });
        
        // Remove from the set of created module containers
        createdModuleContainers.delete(elementId);
        
        // Remove the container from the DOM
        const container = moduleElement.closest('.module-row');
        if (container) {
            container.remove();
        } else {
            moduleElement.remove(); // Fallback to direct removal
        }
        
        // Decrement counter
        if (moduleCounter > 0) moduleCounter--;
    }
    function undoAddFunctionButton(elementId) {
        // Find all elements with this function class
        const functionElements = document.querySelectorAll(`.${elementId}`);
        
        // Find the last added function element (should be the one in the highest module)
        let lastModule = null;
        let lastFunctionElement = null;
        
        functionElements.forEach(element => {
            const parentModule = element.closest('[id^="module_"]');
            if (parentModule) {
                const moduleNumber = parseInt(parentModule.id.split('_')[1]);
                if (lastModule === null || moduleNumber > lastModule) {
                    lastModule = moduleNumber;
                    lastFunctionElement = element;
                }
            }
        });
        
        if (lastFunctionElement) {
            lastFunctionElement.remove();
            adjustModuleHeight();
        }
    }
    
    function undoAddRefinementButton(elementId) {
        // Very similar to undoAddFunctionButton
        const refinementElements = document.querySelectorAll(`.${elementId}`);
        
        let lastModule = null;
        let lastRefinementElement = null;
        
        refinementElements.forEach(element => {
            const parentModule = element.closest('[id^="module_"]');
            if (parentModule) {
                const moduleNumber = parseInt(parentModule.id.split('_')[1]);
                if (lastModule === null || moduleNumber > lastModule) {
                    lastModule = moduleNumber;
                    lastRefinementElement = element;
                }
            }
        });
        
        if (lastRefinementElement) {
            lastRefinementElement.remove();
            adjustModuleHeight();
        }
    }
    
    function undoToggleDownArrow(key) {
        if (downArrows[key]) {
            // Remove the down arrow
            downArrows[key].remove();
            delete downArrows[key];
            
            // Update the sees relationships map
            const [staticId, moduleId] = key.split('-');
            seesRelationships.delete(staticId);
        } else {
            // The arrow was removed, so we need to re-add it
            const [staticId, moduleId] = key.split('-');
            const staticElement = document.getElementById(staticId);
            const moduleElement = document.getElementById(moduleId);
            
            if (staticElement && moduleElement) {
                downArrows[key] = new LeaderLine(
                    LeaderLine.pointAnchor(staticElement, { x: '100%', y: '100%' }), 
                    LeaderLine.pointAnchor(moduleElement, { x: '0%', y: '0%' }),   
                    {
                        color: skyblue,
                        size: 4,
                        endPlug: 'arrow3',
                        path: 'straight',
                        startSocket: 'bottom',
                        endSocket: 'top',
                        startSocketGravity: 100,
                        endSocketGravity: 100,
                        endLabel: 'Sees'
                    }
                );
                leaderLines.push(downArrows[key]);
                seesRelationships.set(staticId, moduleId);
            }
        }
    }

    const undoBtn = document.getElementById('undoBtn');
    if (undoBtn) {
        undoBtn.addEventListener('click', undo);
    }

    // Set up initial event listeners
    if (static0) {
        const overlayRight = static0.querySelector('.border-overlay-right');
        if (overlayRight) {
            overlayRight.addEventListener('click', () => {
                if (!createdStaticContainers.has(static0.id)) {
                    addStaticContainer(static0);
                }
            });
        }

        const smallBoxBottomRight = static0.querySelector('.small-box.bottom-right');
        if (smallBoxBottomRight) {
            smallBoxBottomRight.addEventListener('click', () => {
                const module1 = document.getElementById('module_1');
                if (module1) {
                    toggleDownArrow(static0, module1);
                } else {
                    // Create module_1 first, then toggle down arrow
                    if (module0) {
                        const newModule = addModuleContainer(module0);
                        toggleDownArrow(static0, newModule);
                    }
                }
            });
        }
    }

    if (module0) {
        const overlayRightModule = module0.querySelector('.border-overlay-right');
        if (overlayRightModule) {
            overlayRightModule.addEventListener('click', () => {
                if (!createdModuleContainers.has(module0.id)) {
                    addModuleContainer(module0);
                }
            });
        }

        const func1Button = module0.querySelector('.func_1');
        const func2Button = module0.querySelector('.func_2');

        if (func1Button) {
            func1Button.addEventListener('dblclick', function() {
                const module1 = document.getElementById('module_1');
                if (module1) {
                    addRefinementButton(module1, 'refine_func_1', 1);
                } else {
                    // Create module_1 first, then add refinement
                    const newModule = addModuleContainer(module0);
                    addRefinementButton(newModule, 'refine_func_1', 1);
                }
            });
        }

        if (func2Button) {
            func2Button.addEventListener('dblclick', function() {
                const module1 = document.getElementById('module_1');
                if (module1) {
                    addRefinementButton(module1, 'refine_func_2', 1);
                } else {
                    // Create module_1 first, then add refinement
                    const newModule = addModuleContainer(module0);
                    addRefinementButton(newModule, 'refine_func_2', 1);
                }
            });
        }

        // Add context menu for adding functions
        module0.addEventListener('contextmenu', showContextMenu);
    }

    // Function to adjust module height based on content
    function adjustModuleHeight() {
        const modules = document.querySelectorAll('[id^="module_"]');
        
        modules.forEach(module => {
            const buttons = module.querySelectorAll('.oval-shape');
            let totalHeight = 60; // Base padding
            
            buttons.forEach(button => {
                totalHeight += button.offsetHeight + 12; // Button height + margin
            });
            
            // Set minimum height
            if (totalHeight < 140) totalHeight = 140;
            
            module.style.height = `${totalHeight}px`;
        });
    }

    // Call adjustModuleHeight initially and whenever DOM changes
    adjustModuleHeight();
    
    // Use MutationObserver to watch for DOM changes
    const observer = new MutationObserver(() => {
        adjustModuleHeight();
        // Reposition leader lines
        leaderLines.forEach(line => {
            if (line.position) line.position();
        });
    });
    
    observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: true
    });

    // Initialize with a state capture
    captureState('init');
    
    // Window resize handler to fix leader lines
    window.addEventListener('resize', () => {
        leaderLines.forEach(line => {
            if (line.position) line.position();
        });
    });
});