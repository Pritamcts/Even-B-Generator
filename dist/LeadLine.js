

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
    const contextMenu = document.getElementById('contextMenu');
    const addFunctionOption = document.getElementById('addFunctionOption');
    let targetModule = null;

    const downloadJSBtn = document.createElement('button');
    downloadJSBtn.id = 'downloadJSBtn';
    downloadJSBtn.className = 'js-download';
    downloadJSBtn.textContent = 'Download JS';
    // Add the button to your navbar or wherever you want it to appear
    // document.querySelector('your-navbar-selector').appendChild(downloadJSBtn);


    // Initial LeaderLine setup

    const skyblue = '#5DADE2';
    const pink = '#FF1493';

    if (static0 && module0) {
        new LeaderLine(
            static0,
            module0,
            {
                color: skyblue,
                size: 4,
                endPlug: 'arrow3',
                path: 'straight'
            }
        );


    }
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

    document.addEventListener('click', hideContextMenu);


    function createPopup(funcName) {
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerHTML = `
            <h3>${funcName}</h3>
            <div>
                <h4>Precondition:</h4>
                <textarea class="precondition" rows="3" cols="30"></textarea>
            </div>
            <div>
                <h4>Postcondition:</h4>
                <textarea class="postcondition" rows="3" cols="30"></textarea>
            </div>
        `;
        popup.style.position = 'absolute';
        popup.style.backgroundColor = 'white';
        popup.style.border = '1px solid black';
        popup.style.padding = '10px';
        popup.style.zIndex = '1000';
        popup.style.display = 'none';
        return popup;
    }

    function positionPopup(element, popup) {
        const rect = element.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();
        
        let left = rect.right + 10;
        let top = rect.top;
    
        // Check if the popup goes off the right edge of the screen
        if (left + popupRect.width > window.innerWidth) {
            left = rect.left - popupRect.width - 10;
        }
    
        // Check if the popup goes off the bottom of the screen
        if (top + popupRect.height > window.innerHeight) {
            top = window.innerHeight - popupRect.height - 10;
        }
    
        popup.style.left = `${left}px`;
        popup.style.top = `${top}px`;
    }

    function addHoverFunctionality(element) {
        const funcName = element.className.split(' ')[1];
        const popup = createPopup(funcName);
        document.body.appendChild(popup);
    
        let timeout;
    
        element.addEventListener('mouseenter', (e) => {
            clearTimeout(timeout);
            popup.style.display = 'block';
            positionPopup(element, popup);  // Use the new function here
            popup.style.opacity = '0';
            setTimeout(() => {
              popup.style.opacity = '1';
            }, 10);
          });
    
        element.addEventListener('mouseleave', () => {
            popup.style.opacity = '0';
            timeout = setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        });
    }

    // Add hover functionality to existing func_1 and func_2
    if (module0) {
        const func1Button = module0.querySelector('.func_1');
        const func2Button = module0.querySelector('.func_2');

        if (func1Button) addHoverFunctionality(func1Button);
        if (func2Button) addHoverFunctionality(func2Button);
    }







    // Modify the addFunctionButton function
    // function addFunctionButton(moduleElement) {
    //     const existingFunctions = moduleElement.querySelectorAll('.oval-shape[class*="func_"]');
    //     const nextFuncNumber = existingFunctions.length + 1;
    //     const funcName = `func_${nextFuncNumber}`;

    //     const newButton = document.createElement('div');
    //     newButton.className = `oval-shape ${funcName} add-function-button`; // Add class here
    //     newButton.innerText = funcName;

        

    //     moduleElement.appendChild(newButton);
    //     captureState('addFunctionButton', funcName);
    //     adjustModuleHeight();
    // }



    function addFunctionButton(moduleElement) {
        const existingFunctions = moduleElement.querySelectorAll('.oval-shape[class*="func_"]');
        const nextFuncNumber = existingFunctions.length + 1;
        const funcName = `func_${nextFuncNumber}`;

        const newButton = document.createElement('div');
        newButton.className = `oval-shape ${funcName} add-function-button`;
        newButton.innerText = funcName;

        addHoverFunctionality(newButton);

        moduleElement.appendChild(newButton);
        captureState('addFunctionButton', funcName);
        adjustModuleHeight();
    }


    // Add function option click event
    addFunctionOption.addEventListener('click', () => {
        if (targetModule) {
            addFunctionButton(targetModule);
            hideContextMenu();
        }
    });

    function captureState(action, elementId) {
        const state = {
            action,
            elementId,
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
            })),
            funcButtons: Array.from(document.querySelectorAll('.oval-shape'))
                .filter(el => el.parentElement.id !== 'module_0')
                .map(el => ({
                    id: el.className.split(' ')[1],
                    parentId: el.parentElement.id,
                    outerHTML: el.outerHTML
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
            case 'addRefinementButton':
                undoAddFunctionButton(lastState);
                break;
            case 'toggleDownArrow':
                undoToggleDownArrow(lastState);
                break;
            default:
                break;
        }

        // Redraw all remaining leader lines
        leaderLines.forEach(line => line.position());
    }



    function undoAddFunctionButton(state) {
        if (state.funcButtons.length === 0) return;

        const lastFunction = state.funcButtons[state.funcButtons.length - 1];

        // Ignore function buttons in module_0
        if (lastFunction.parentId === 'module_0') return;

        const funcElement = document.querySelector(`.${lastFunction.id}`);

        if (funcElement && funcElement.parentElement.id !== 'module_0') {
            funcElement.remove();
            funcCounter--;
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

            
            Object.keys(downArrows).forEach(key => {
                if (key.startsWith(lastStaticId)) {
                    downArrows[key].remove();
                    delete downArrows[key];
                }
            });

            
            createdStaticContainers.delete(lastStaticId);

            staticCounter--;
        }
    }


    function undoAddModuleContainer(state) {
        if (state.moduleContainers.length === 0) return;

        const lastModule = state.moduleContainers[state.moduleContainers.length - 1];
        const lastModuleId = lastModule.match(/id="(module_\d+)"/)[1];
        const moduleElement = document.getElementById(lastModuleId);

        if (moduleElement) {

            moduleElement.parentElement.remove();

            
            leaderLines = leaderLines.filter(line => {
                if (line.start.id === lastModuleId || line.end.id === lastModuleId) {
                    line.remove();
                    return false;
                }
                return true;
            });

            Object.keys(downArrows).forEach(key => {
                if (key.endsWith(lastModuleId)) {
                    downArrows[key].remove();
                    delete downArrows[key];
                }
            });

            createdModuleContainers.delete(lastModuleId);

            moduleCounter--;
        }
    }

    function undoAddFunctionButton(state) {
        if (state.funcButtons.length === 0) return;

        const lastFunction = state.funcButtons[state.funcButtons.length - 1];

        if (lastFunction.parentId === 'module_0') return;

        const parentModule = document.getElementById(lastFunction.parentId);
        if (parentModule) {
            const funcButtons = parentModule.querySelectorAll('.oval-shape[class*="func_"]');
            if (funcButtons.length > 0) {
                const lastFuncButton = funcButtons[funcButtons.length - 1];
                lastFuncButton.remove();
            }
        }
    }

    function undoToggleDownArrow(state) {
        const lastDownArrow = state.downArrows[state.downArrows.length - 1];
        const key = lastDownArrow.key;
        if (downArrows[key]) {
            downArrows[key].remove();
            delete downArrows[key];
        }
    }

    function addStaticContainer(baseElement) {
        staticCounter++;
        const newStaticId = `static_${staticCounter}`;

        createdStaticContainers.add(baseElement.id);

        const newStatic = document.createElement('div');
        newStatic.id = newStaticId;
        newStatic.className = 'static_0 bg-blue-100 border-2 border-sky-600 hover:border-dashed p-4 outline-none text-center w-36 h-36 cursor-pointer shadow-md uppercase relative rounded-2xl';

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
    }

    function addModuleContainer(baseElement) {
        moduleCounter++;
        const correspondingStaticId = `static_${moduleCounter}`;
        const correspondingStatic = document.getElementById(correspondingStaticId);

        if (!correspondingStatic) {
            addStaticContainer(document.getElementById(`static_${moduleCounter - 1}`) || static0);
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
        <button class="add-button mt-2 bg-yellow-400 w-20 h-10 rounded-full flex items-center justify-center cursor-pointer text-black text-xs font-bold"></button>`;

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

        newModule.querySelector('.add-button').addEventListener('click', (event) => {
            event.stopPropagation();
            addFunctionButton(newModule);
        });

        captureState('addModuleContainer');

        return newModule;
    }

    // function addRefinementButton(moduleElement, funcName, counter) {
    //     const newButton = document.createElement('div');
    //     newButton.className = `oval-shape ${funcName}`;
    //     newButton.innerText = funcName;

    //     newButton.style.backgroundColor = '#f78cc5';
    //     newButton.style.color = 'black';

    //     newButton.addEventListener('click', function () {
    //         const nextModuleId = `module_${counter + 1}`;
    //         const nextModule = document.getElementById(nextModuleId);
    //         if (nextModule) {
    //             const refinedFuncName = `${funcName}${counter}`;
    //             const existingRefinement = nextModule.querySelector(`.${refinedFuncName}`);
    //             if (!existingRefinement) {
    //                 addRefinementButton(nextModule, refinedFuncName, counter + 1);
    //             }
    //         } else {
    //             alert(`${nextModuleId} not found.`);
    //         }
    //     });

    //     moduleElement.appendChild(newButton);

    //     captureState('addRefinementButton');
    // }


    function addRefinementButton(moduleElement, funcName, counter) {
        const newButton = document.createElement('div');
        newButton.className = `oval-shape ${funcName}`;
        newButton.innerText = funcName;

        newButton.style.backgroundColor = '#f78cc5';
        newButton.style.color = 'black';

        addHoverFunctionality(newButton);

        newButton.addEventListener('click', function () {
            const nextModuleId = `module_${counter + 1}`;
            const nextModule = document.getElementById(nextModuleId);
            if (nextModule) {
                const refinedFuncName = `${funcName}${counter}`;
                const existingRefinement = nextModule.querySelector(`.${refinedFuncName}`);
                if (!existingRefinement) {
                    addRefinementButton(nextModule, refinedFuncName, counter + 1);
                }
            } else {
                alert(`${nextModuleId} not found.`);
            }
        });

        moduleElement.appendChild(newButton);

        captureState('addRefinementButton');
    }

    function toggleDownArrow(baseElement, targetElement) {
        const baseId = baseElement.id;
        const baseNumber = parseInt(baseId.split('_')[1], 10);

        const targetModuleId = `module_${baseNumber + 1}`;
        const targetModule = document.getElementById(targetModuleId);

        if (!targetModule) {
            alert(`${targetModuleId} not found.`);
            return;
        }

        const key = `${baseId}-${targetModuleId}`;
        if (downArrows[key]) {
            downArrows[key].remove();
            delete downArrows[key];
            seesRelationships.delete(baseId);
        } else {
            downArrows[key] = new LeaderLine(
                LeaderLine.pointAnchor(baseElement, { x: '100%', y: '100%' }), 
                LeaderLine.pointAnchor(targetModule, { x: '0%', y: '0%' }),   
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
            seesRelationships.set(baseId, targetModuleId);
        }

        captureState('toggleDownArrow', key);
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

        funcCounter = 2;
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

