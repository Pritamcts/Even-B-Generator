

document.addEventListener('DOMContentLoaded', () => {

   
    // Variables and initial setup
    const static0 = document.getElementById('static_0');
    const module0 = document.getElementById('module_0');
    const container = document.getElementById('container');
    let staticCounter = 0;
    let moduleCounter = 0;
    let funcCounter = 0; // Counter for function buttons
    const createdStaticContainers = new Set();
    const createdModuleContainers = new Set();
    const downArrows = {};
    let leaderLines = [];
    const seesRelationships = new Map();
    const historyStack = [];
    let redoStack = []; // Stack for redo operations

    // Initial LeaderLine setup
    if (static0 && module0) {
        new LeaderLine(
            static0,
            module0,
            {
                color: 'blue',
                size: 4,
                endPlug: 'arrow3',
                path: 'straight'
            }
        );
    }

    function captureState(action) {
        const state = {
            action,
            staticContainers: Array.from(document.querySelectorAll('[id^="static_"]')).map(el => el.outerHTML),
            moduleContainers: Array.from(document.querySelectorAll('[id^="module_"]')).map(el => el.outerHTML),
            leaderLines: leaderLines.map(line => ({
                startId: line.startElement ? line.startElement.id : null,
                endId: line.endElement ? line.endElement.id : null
            })),
            downArrows: Object.keys(downArrows).map(key => ({
                key,
                startId: downArrows[key].startElement ? downArrows[key].startElement.id : null,
                endId: downArrows[key].endElement ? downArrows[key].endElement.id : null
            }))
        };
        historyStack.push(state);
        redoStack = []; // Clear redo stack on new action
    }

    function undo() {
        if (historyStack.length === 0) return;

        const lastState = historyStack.pop();
        redoStack.push(lastState);

        switch (lastState.action) {
            case 'addStaticContainer':
                undoAddStaticContainer(lastState);
                break;
            case 'addModuleContainer':
                undoAddModuleContainer(lastState);
                break;
            case 'addFunctionButton':
                undoAddFunctionButton(lastState);
                break;
            case 'toggleDownArrow':
                undoToggleDownArrow(lastState);
                break;
            case 'addLeaderLine':
                undoAddLeaderLine(lastState);
                break;
            default:
                break;
        }
    }

    

    function undoAddStaticContainer(state) {
        if (state.staticContainers.length === 0) return;

        const lastStatic = state.staticContainers[state.staticContainers.length - 1];
        const lastStaticId = lastStatic.match(/id="(static_\d+)"/)[1];
        const staticElement = document.getElementById(lastStaticId);

        if (staticElement) {
            // Remove the static container
            staticElement.parentElement.remove();

            // Remove associated leader lines
            leaderLines = leaderLines.filter(line => {
                if (line.start.id === lastStaticId || line.end.id === lastStaticId) {
                    line.remove();
                    return false;
                }
                return true;
            });

            // Remove the static container from created set
            createdStaticContainers.delete(lastStaticId);
        }
    }

    function undoAddModuleContainer(state) {
    if (state.moduleContainers.length === 0) return;

    const lastModule = state.moduleContainers[state.moduleContainers.length - 1];
    const lastModuleId = lastModule.match(/id="(module_\d+)"/)[1];
    const moduleElement = document.getElementById(lastModuleId);

    if (moduleElement) {
        // Remove the module container
        moduleElement.parentElement.remove();

        // Remove associated leader lines
        leaderLines = leaderLines.filter(line => {
            if (line.start.id === lastModuleId || line.end.id === lastModuleId) {
                line.remove();
                return false;
            }
            return true;
        });

        // Remove associated down arrows
        Object.keys(downArrows).forEach(key => {
            if (key.includes(lastModuleId)) {
                downArrows[key].remove();
                delete downArrows[key];
            }
        });

        // Remove the module container from created set
        createdModuleContainers.delete(lastModuleId);
    }
}
    function undoAddFunctionButton(state) {
        const lastFunction = state.staticContainers[state.staticContainers.length - 1];
        const lastFunctionId = lastFunction.match(/class="oval-shape (func_\d+)"/)[1];
        document.querySelector(`.${lastFunctionId}`).remove();
    }

    function undoToggleDownArrow(state) {
        const lastDownArrow = state.downArrows[state.downArrows.length - 1];
        const key = lastDownArrow.key;
        if (downArrows[key]) {
            downArrows[key].remove();
            delete downArrows[key];
        }
    }

    function undoAddLeaderLine(state) {
        const lastLine = state.leaderLines[state.leaderLines.length - 1];
        const lineToRemove = leaderLines.find(line =>
            line.startElement.id === lastLine.startId && line.endElement.id === lastLine.endId
        );
        if (lineToRemove) {
            lineToRemove.remove();
            const index = leaderLines.indexOf(lineToRemove);
            leaderLines.splice(index, 1);
        }
    }

    function addStaticContainer(baseElement) {
        staticCounter++;
        const newStaticId = `static_${staticCounter}`;

        createdStaticContainers.add(baseElement.id);

        const newStatic = document.createElement('div');
        newStatic.id = newStaticId;
        newStatic.className = 'static_0 bg-blue-100 border-2 border-sky-600 hover:border-dashed p-4 outline-none text-center w-36 h-36 cursor-pointer shadow-md uppercase relative';
        newStatic.contentEditable = 'true';
        newStatic.innerHTML = `${newStaticId}
            <div class="border-overlay-right absolute top-0 right-0 w-2 h-full"></div>
            <div class="border-overlay-bottom absolute bottom-0 left-0 w-full h-2"></div>
            <div class="small-box bottom-right"></div>`;

        const newContainer = document.createElement('div');
        newContainer.className = 'static-container flex items-center space-x-4';
        newContainer.appendChild(newStatic);
        container.appendChild(newContainer);

        newContainer.style.position = 'absolute';
        const baseRect = baseElement.getBoundingClientRect();
        newContainer.style.left = `${baseRect.right + 80}px`;
        newContainer.style.top = `${baseRect.top}px`;

        const line = new LeaderLine(
            baseElement,
            newStatic,
            {
                color: 'blue',
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

        captureState('addStaticContainer'); // Capture the state after adding
    }

    function addModuleContainer(baseElement) {
        moduleCounter++;
        const correspondingStaticId = `static_${moduleCounter}`;
        const correspondingStatic = document.getElementById(correspondingStaticId);

        if (!correspondingStatic) {
            alert(`Cannot add a module. ${correspondingStaticId} not present.`);
            return;
        }

        createdModuleContainers.add(baseElement.id);

        const newModuleId = `module_${moduleCounter}`;

        const newModule = document.createElement('div');
        newModule.id = newModuleId;
        newModule.className = 'module_0 bg-pink-100 border-2 border-pink-600 hover:border-dashed p-4 outline-none rounded-2xl text-center w-36 h-52 cursor-pointer shadow-md uppercase relative';
        newModule.contentEditable = 'true';
        newModule.innerHTML = `${newModuleId}
            <div class="border-overlay-right absolute top-0 right-0 w-2 h-full"></div>
            <div class="small-box top-left"></div>
            <button class="add-button mt-2 bg-yellow-400 w-20 h-10 rounded-full flex items-center justify-center cursor-pointer text-black text-xs font-bold">Add</button>`;

        const newContainer = document.createElement('div');
        newContainer.className = 'module-row space-x-4';
        newContainer.appendChild(newModule);
        container.appendChild(newContainer);

        newContainer.style.position = 'absolute';
        const baseRect = baseElement.getBoundingClientRect();
        newContainer.style.left = `${baseRect.right + 80}px`;
        newContainer.style.top = `${baseRect.top}px`;

        const line = new LeaderLine(
            baseElement,
            newModule,
            {
                color: 'blue',
                size: 4,
                endPlug: 'arrow3',
                path: 'straight'
            }
        );
        leaderLines.push(line);

        const downArrow = new LeaderLine(
            correspondingStatic,
            newModule,
            {
                color: 'blue',
                size: 4,
                endPlug: 'arrow3',
                path: 'straight'
            }
        );
        downArrows[`${correspondingStaticId}-${newModuleId}`] = downArrow;
        leaderLines.push(downArrow);

        newModule.querySelector('.border-overlay-right').addEventListener('click', () => addModuleContainer(newModule));
        newModule.querySelector('.small-box.top-left').addEventListener('click', () => toggleDownArrow(correspondingStatic, newModule));

        // Add event listener for the new Add button
        newModule.querySelector('.add-button').addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the click from triggering the contenteditable
            addFunctionButton(newModule);
        });

        captureState('addModuleContainer'); // Capture the state after adding

        return newModule;
    }

    function addFunctionButton(moduleElement) {
        funcCounter++;
        const funcName = `func_${funcCounter}`;
        const newButton = document.createElement('div');
        newButton.className = `oval-shape ${funcName}`;
        newButton.innerText = funcName;

        newButton.addEventListener('click', function () {
            if (!this.hasClicked) {
                const nextModuleId = `module_${funcCounter + 1}`;
                const nextModule = document.getElementById(nextModuleId);
                if (nextModule) {
                    const refinedFuncName = `${funcName}${funcCounter}`;
                    addRefinementButton(nextModule, refinedFuncName, funcCounter + 1);
                    this.hasClicked = true;
                } else {
                    alert(`${nextModuleId} not found.`);
                }
            }
        });

        moduleElement.appendChild(newButton);

        captureState('addFunctionButton'); // Capture the state after adding
    }

    function addRefinementButton(moduleElement, funcName, counter) {
        const newButton = document.createElement('div');
        newButton.className = `oval-shape ${funcName}`;
        newButton.innerText = funcName;

        newButton.addEventListener('click', function () {
            if (!this.hasClicked) {
                const nextModuleId = `module_${counter + 1}`;
                const nextModule = document.getElementById(nextModuleId);
                if (nextModule) {
                    const refinedFuncName = `${funcName}${counter}`;
                    addRefinementButton(nextModule, refinedFuncName, counter + 1);
                    this.hasClicked = true;
                } else {
                    alert(`${nextModuleId} not found.`);
                }
            }
        });

        moduleElement.appendChild(newButton);

        captureState('addRefinementButton'); // Capture the state after adding
    }

    function toggleDownArrow(baseElement, targetElement) {
        const key = `${baseElement.id}-${targetElement.id}`;
        if (downArrows[key]) {
            downArrows[key].remove();
            delete downArrows[key];
            seesRelationships.delete(baseElement.id);
        } else {
            downArrows[key] = new LeaderLine(
                baseElement,
                targetElement,
                {
                    color: 'blue',
                    size: 4,
                    endPlug: 'arrow3',
                    path: 'straight',
                    endLabel: 'Sees'
                }
            );
            leaderLines.push(downArrows[key]);
            seesRelationships.set(baseElement.id, targetElement.id);
        }

        captureState('toggleDownArrow'); // Capture the state after toggling
    }


    // Undo functionality
    const undoBtn = document.getElementById('undoBtn');
    if (undoBtn) {
        undoBtn.addEventListener('click', () => {
            undo();
        });
    }

    const overlayRight = document.querySelector('.border-overlay-right');
    if (overlayRight) {
        overlayRight.addEventListener('click', () => {
            if (static0 && !createdStaticContainers.has(static0.id)) {
                addStaticContainer(static0);
            } else {
                alert('A new static container cannot be added from this element.');
            }
        });
    }

    const smallBoxBottomRight = document.querySelector('.small-box.bottom-right');
    if (smallBoxBottomRight) {
        smallBoxBottomRight.addEventListener('click', () => {
            const module1 = document.getElementById('module_1');
            if (static0 && module1) {
                toggleDownArrow(static0, module1);
            } else {
                alert('Module_1 not found.');
            }
        });
    }

    if (module0) {
        const overlayRightModule = module0.querySelector('.border-overlay-right');
        if (overlayRightModule) {
            overlayRightModule.addEventListener('click', () => {
                if (!createdModuleContainers.has(module0.id)) {
                    addModuleContainer(module0);
                } else {
                    alert('A new module container cannot be added from this element.');
                }
            });
        }

        // Add the Add button to module_0
        const addButton = document.createElement('button');
        addButton.className = 'add-button mt-2 bg-yellow-400 w-20 h-10 rounded-full flex items-center justify-center cursor-pointer text-black text-xs font-bold';
        addButton.textContent = 'Add';
        addButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the click from triggering the contenteditable
            addModuleContainer(module0);
        });
        module0.appendChild(addButton);

        // Add event listeners for the initial module_0
        const func1Button = module0.querySelector('.func_1');
        const func2Button = module0.querySelector('.func_2');

        if (func1Button) {
            func1Button.addEventListener('click', function () {
                if (!this.hasClicked) {
                    const module1 = document.getElementById('module_1');
                    if (module1) {
                        addRefinementButton(module1, 'refine_func_1', 1);
                        this.hasClicked = true;
                    }
                }
            });
        }

        if (func2Button) {
            func2Button.addEventListener('click', function () {
                if (!this.hasClicked) {
                    const module1 = document.getElementById('module_1');
                    if (module1) {
                        addRefinementButton(module1, 'refine_func_2', 1);
                        this.hasClicked = true;
                    }
                }
            });
        }
    }

    // Function to generate Event-B context
    function generateEventBContext(staticId) {
        let contextContent = `CONTEXT\n\t${staticId}\t›This is the context of the model.\n\n`;
        let setsContent = 'SETS\n\n';
        let constantsContent = 'CONSTANTS\n\n';
        let axiomsContent = `AXIOMS\n\n\taxm1: partition(${staticId.toLowerCase()}, {${staticId.toLowerCase()}_elements})\n\n`;

        // Check if this context sees any machine
        const seenMachine = seesRelationships.get(staticId);
        if (seenMachine) {
            contextContent += `SEES\n\t${seenMachine}\n\n`;
        }

        contextContent += setsContent + constantsContent + axiomsContent + 'END';
        return contextContent;
    }

    // Function to generate Event-B machine
    function generateEventBMachine(moduleId) {
        let machineContent = `MACHINE\n\t${moduleId}\n\n`;
        let variablesContent = 'VARIABLES\n\n';
        let invariantsContent = 'INVARIANTS\n\n';
        let eventsContent = 'EVENTS\n\n\tINITIALISATION: not extended ordinary ›\n\n';
        machineContent += variablesContent + invariantsContent + eventsContent + 'END';
        return machineContent;
    }

    // Function to download a file
    function downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    // Add event listener for the download Event-B button
    const downloadEventBBtn = document.getElementById('downloadEventBBtn');
    if (downloadEventBBtn) {
        downloadEventBBtn.addEventListener('click', () => {
            const staticContainers = document.querySelectorAll('[id^="static_"]');
            const moduleContainers = document.querySelectorAll('[id^="module_"]');

            // Download context files for all static containers
            staticContainers.forEach((staticContainer) => {
                const staticId = staticContainer.id;
                const contextNumber = staticId.split('_')[1];
                const contextContent = generateEventBContext(staticId);
                downloadFile(`context_${contextNumber}.buc`, contextContent);
            });

            // Download machine files for all module containers
            moduleContainers.forEach((moduleContainer) => {
                const moduleId = moduleContainer.id;
                const machineNumber = moduleId.split('_')[1];
                const machineContent = generateEventBMachine(moduleId);
                downloadFile(`machine_${machineNumber}.bum`, machineContent);
            });
        });
    }
});
