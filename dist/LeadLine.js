



// // ##############################################################################



// document.addEventListener('DOMContentLoaded', () => {
//     const static0 = document.getElementById('static_0');
//     const module0 = document.getElementById('module_0');
    
//     new LeaderLine(
//       static0,
//       module0,
//       {
//         color: 'blue',
//         size: 4,
//         endPlug: 'arrow3',
//         path: 'straight'
//       }
//     );
//   });
//   document.addEventListener('DOMContentLoaded', () => {
//     const container = document.getElementById('container');
//     let staticCounter = 0;
//     let moduleCounter = 0;
//     const createdStaticContainers = new Set();
//     const createdModuleContainers = new Set();
//     const downArrows = {};
//     const leaderLines = [];

//     function addStaticContainer(baseElement) {
//         staticCounter++;
//         const newStaticId = `static_${staticCounter}`;

//         createdStaticContainers.add(baseElement.id);

//         const newStatic = document.createElement('div');
//         newStatic.id = newStaticId;
//         newStatic.className = 'static_0 bg-blue-100 border-2 border-sky-600 hover:border-dashed p-4 outline-none text-center w-36 h-36 cursor-pointer shadow-md uppercase relative';
//         newStatic.contentEditable = 'true';
//         newStatic.innerHTML = `${newStaticId}
//             <div class="border-overlay-right absolute top-0 right-0 w-2 h-full"></div>
//             <div class="border-overlay-bottom absolute bottom-0 left-0 w-full h-2"></div>
//             <div class="small-box bottom-right"></div>`;

//         const newContainer = document.createElement('div');
//         newContainer.className = 'static-container flex items-center space-x-4';
//         newContainer.appendChild(newStatic);
//         container.appendChild(newContainer);

//         newContainer.style.position = 'absolute';
//         const baseRect = baseElement.getBoundingClientRect();
//         newContainer.style.left = `${baseRect.right + 80}px`;
//         newContainer.style.top = `${baseRect.top}px`;

//         const line = new LeaderLine(
//             baseElement,
//             newStatic,
//             {
//                 color: 'blue',
//                 size: 4,
//                 endPlug: 'arrow3',
//                 path: 'straight'
//             }
//         );
//         leaderLines.push(line);

//         newStatic.querySelector('.border-overlay-right').addEventListener('click', () => addStaticContainer(newStatic));
//         newStatic.querySelector('.small-box.bottom-right').addEventListener('click', () => {
//             const moduleId = `module_${staticCounter}`;
//             const module = document.getElementById(moduleId);
//             if (module) {
//                 toggleDownArrow(newStatic, module);
//             } else {
//                 alert(`${moduleId} not found.`);
//             }
//         });
//     }

//     function addModuleContainer(baseElement) {
//         moduleCounter++;
//         const correspondingStaticId = `static_${moduleCounter}`;
//         const correspondingStatic = document.getElementById(correspondingStaticId);

//         if (!correspondingStatic) {
//             alert(`Cannot add a module. ${correspondingStaticId} not present.`);
//             return;
//         }

//         createdModuleContainers.add(baseElement.id);

//         const newModuleId = `module_${moduleCounter}`;

//         const newModule = document.createElement('div');
//         newModule.id = newModuleId;
//         newModule.className = 'module_0 bg-pink-100 border-2 border-pink-600 hover:border-dashed p-4 outline-none rounded-2xl text-center w-36 h-52 cursor-pointer shadow-md uppercase relative';
//         newModule.contentEditable = 'true';
//         newModule.innerHTML = `${newModuleId}
//             <div class="border-overlay-right absolute top-0 right-0 w-2 h-full"></div>
//             <div class="small-box top-left"></div>`;

//         const newContainer = document.createElement('div');
//         newContainer.className = 'module-row space-x-4';
//         newContainer.appendChild(newModule);
//         container.appendChild(newContainer);

//         newContainer.style.position = 'absolute';
//         const baseRect = baseElement.getBoundingClientRect();
//         newContainer.style.left = `${baseRect.right + 80}px`;
//         newContainer.style.top = `${baseRect.top}px`;

//         const line = new LeaderLine(
//             baseElement,
//             newModule,
//             {
//                 color: 'blue',
//                 size: 4,
//                 endPlug: 'arrow3',
//                 path: 'straight'
//             }
//         );
//         leaderLines.push(line);

//         const downArrow = new LeaderLine(
//             correspondingStatic,
//             newModule,
//             {
//                 color: 'blue',
//                 size: 4,
//                 endPlug: 'arrow3',
//                 path: 'straight'
//             }
//         );
//         downArrows[`${correspondingStaticId}-${newModuleId}`] = downArrow;
//         leaderLines.push(downArrow);

//         newModule.querySelector('.border-overlay-right').addEventListener('click', () => addModuleContainer(newModule));
//         newModule.querySelector('.small-box.top-left').addEventListener('click', () => toggleDownArrow(correspondingStatic, newModule));
//     }

//     function toggleDownArrow(baseElement, targetElement) {
//         const key = `${baseElement.id}-${targetElement.id}`;
//         if (downArrows[key]) {
//             downArrows[key].remove();
//             delete downArrows[key];
//         } else {
//             downArrows[key] = new LeaderLine(
//                 baseElement,
//                 targetElement,
//                 {
//                     color: 'blue',
//                     size: 4,
//                     endPlug: 'arrow3',
//                     path: 'straight',
//                     endLabel: 'Sees'
//                 }
//             );
//             leaderLines.push(downArrows[key]);
//         }
//     }

//     document.querySelector('.border-overlay-right').addEventListener('click', () => {
//         const static0 = document.getElementById('static_0');
//         if (!createdStaticContainers.has(static0.id)) {
//             addStaticContainer(static0);
//         } else {
//             alert('A new static container cannot be added from this element.');
//         }
//     });

//     document.querySelector('.small-box.bottom-right').addEventListener('click', () => {
//         const static0 = document.getElementById('static_0');
//         const module1 = document.getElementById('module_1');
//         if (module1) {
//             toggleDownArrow(static0, module1);
//         } else {
//             alert('Module_1 not found.');
//         }
//     });

//     document.getElementById('module_0').querySelector('.border-overlay-right').addEventListener('click', () => {
//         const module0 = document.getElementById('module_0');
//         if (!createdModuleContainers.has(module0.id)) {
//             addModuleContainer(module0);
//         } else {
//             alert('A new module container cannot be added from this element.');
//         }
//     });

//     function renderArrowsOnCanvas(canvas) {
//         const ctx = canvas.getContext('2d');
//         leaderLines.forEach(line => {
//             if (line && line.options) {
//                 const start = line.start.getBoundingClientRect();
//                 const end = line.end.getBoundingClientRect();
//                 const containerRect = container.getBoundingClientRect();
//                 ctx.beginPath();
//                 ctx.moveTo(start.left - containerRect.left + start.width / 2, start.top - containerRect.top + start.height / 2);
//                 ctx.lineTo(end.left - containerRect.left + end.width / 2, end.top - containerRect.top + end.height / 2);
//                 ctx.lineWidth = line.options.size;
//                 ctx.strokeStyle = line.options.color;
//                 ctx.stroke();
//             }
//         });
//     }

//     // Add event listener for the download button
//     document.getElementById('downloadBtn').addEventListener('click', () => {
//         html2canvas(container).then(canvas => {
//             renderArrowsOnCanvas(canvas);
//             const link = document.createElement('a');
//             link.href = canvas.toDataURL('image/png');
//             link.download = 'diagram.png';
//             link.click();
//         });
//     });
// });





// document.addEventListener('DOMContentLoaded', () => {
//     const static0 = document.getElementById('static_0');
//     const module0 = document.getElementById('module_0');
    
//     if (static0 && module0) {
//         new LeaderLine(
//             static0,
//             module0,
//             {
//                 color: 'blue',
//                 size: 4,
//                 endPlug: 'arrow3',
//                 path: 'straight'
//             }
//         );
//     }
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const container = document.getElementById('container');
//     let staticCounter = 0;
//     let moduleCounter = 0;
//     const createdStaticContainers = new Set();
//     const createdModuleContainers = new Set();
//     const downArrows = {};
//     const leaderLines = [];

//     function addStaticContainer(baseElement) {
//         staticCounter++;
//         const newStaticId = `static_${staticCounter}`;

//         createdStaticContainers.add(baseElement.id);

//         const newStatic = document.createElement('div');
//         newStatic.id = newStaticId;
//         newStatic.className = 'static_0 bg-blue-100 border-2 border-sky-600 hover:border-dashed p-4 outline-none text-center w-36 h-36 cursor-pointer shadow-md uppercase relative';
//         newStatic.contentEditable = 'true';
//         newStatic.innerHTML = `${newStaticId}
//             <div class="border-overlay-right absolute top-0 right-0 w-2 h-full"></div>
//             <div class="border-overlay-bottom absolute bottom-0 left-0 w-full h-2"></div>
//             <div class="small-box bottom-right"></div>`;

//         const newContainer = document.createElement('div');
//         newContainer.className = 'static-container flex items-center space-x-4';
//         newContainer.appendChild(newStatic);
//         container.appendChild(newContainer);

//         newContainer.style.position = 'absolute';
//         const baseRect = baseElement.getBoundingClientRect();
//         newContainer.style.left = `${baseRect.right + 80}px`;
//         newContainer.style.top = `${baseRect.top}px`;

//         const line = new LeaderLine(
//             baseElement,
//             newStatic,
//             {
//                 color: 'blue',
//                 size: 4,
//                 endPlug: 'arrow3',
//                 path: 'straight'
//             }
//         );
//         leaderLines.push(line);

//         const rightOverlay = newStatic.querySelector('.border-overlay-right');
//         const bottomRightBox = newStatic.querySelector('.small-box.bottom-right');

//         if (rightOverlay) {
//             rightOverlay.addEventListener('click', () => addStaticContainer(newStatic));
//         }
        
//         if (bottomRightBox) {
//             bottomRightBox.addEventListener('click', () => {
//                 const moduleId = `module_${staticCounter}`;
//                 const module = document.getElementById(moduleId);
//                 if (module) {
//                     toggleDownArrow(newStatic, module);
//                 } else {
//                     alert(`${moduleId} not found.`);
//                 }
//             });
//         }

//         // Save the state after adding the new static container
//         saveState('add', newContainer);
//     }

//     function addModuleContainer(baseElement) {
//         moduleCounter++;
//         const correspondingStaticId = `static_${moduleCounter}`;
//         const correspondingStatic = document.getElementById(correspondingStaticId);

//         if (!correspondingStatic) {
//             alert(`Cannot add a module. ${correspondingStaticId} not present.`);
//             return;
//         }

//         createdModuleContainers.add(baseElement.id);

//         const newModuleId = `module_${moduleCounter}`;

//         const newModule = document.createElement('div');
//         newModule.id = newModuleId;
//         newModule.className = 'module_0 bg-pink-100 border-2 border-pink-600 hover:border-dashed p-4 outline-none rounded-2xl text-center w-36 h-52 cursor-pointer shadow-md uppercase relative';
//         newModule.contentEditable = 'true';
//         newModule.innerHTML = `${newModuleId}
//             <div class="border-overlay-right absolute top-0 right-0 w-2 h-full"></div>
//             <div class="small-box top-left"></div>`;

//         const newContainer = document.createElement('div');
//         newContainer.className = 'module-row space-x-4';
//         newContainer.appendChild(newModule);
//         container.appendChild(newContainer);

//         newContainer.style.position = 'absolute';
//         const baseRect = baseElement.getBoundingClientRect();
//         newContainer.style.left = `${baseRect.right + 80}px`;
//         newContainer.style.top = `${baseRect.top}px`;

//         const line = new LeaderLine(
//             baseElement,
//             newModule,
//             {
//                 color: 'blue',
//                 size: 4,
//                 endPlug: 'arrow3',
//                 path: 'straight'
//             }
//         );
//         leaderLines.push(line);

//         const downArrow = new LeaderLine(
//             correspondingStatic,
//             newModule,
//             {
//                 color: 'blue',
//                 size: 4,
//                 endPlug: 'arrow3',
//                 path: 'straight'
//             }
//         );
//         downArrows[`${correspondingStaticId}-${newModuleId}`] = downArrow;
//         leaderLines.push(downArrow);

//         const rightOverlay = newModule.querySelector('.border-overlay-right');
//         const topLeftBox = newModule.querySelector('.small-box.top-left');
//         const func1Button = newModule.querySelector('.func_1');
//         const func2Button = newModule.querySelector('.func_2');

//         if (rightOverlay) {
//             rightOverlay.addEventListener('click', () => addModuleContainer(newModule));
//         }
        
//         if (topLeftBox) {
//             topLeftBox.addEventListener('click', () => toggleDownArrow(correspondingStatic, newModule));
//         }

//         if (func1Button) {
//             func1Button.addEventListener('click', () => addOvalShape(newModule, 'refine_func_2'));
//         }

//         if (func2Button) {
//             func2Button.addEventListener('click', () => addOvalShape(newModule, 'refine_func_3'));
//         }

//         // Save the state after adding the new module container
//         saveState('add', newContainer);
//     }

//     function toggleDownArrow(baseElement, targetElement) {
//         const key = `${baseElement.id}-${targetElement.id}`;
//         if (downArrows[key]) {
//             downArrows[key].remove();
//             delete downArrows[key];
//         } else {
//             downArrows[key] = new LeaderLine(
//                 baseElement,
//                 targetElement,
//                 {
//                     color: 'blue',
//                     size: 4,
//                     endPlug: 'arrow3',
//                     path: 'straight',
//                     endLabel: 'Sees'
//                 }
//             );
//             leaderLines.push(downArrows[key]);
//         }

//         // Save the state after toggling the arrow
//         saveState('toggleArrow', targetElement);
//     }

//     function addOvalShape(moduleElement, shapeName) {
//         const newOval = document.createElement('div');
//         newOval.className = 'oval-shape';
//         newOval.innerText = shapeName;

//         moduleElement.appendChild(newOval);

//         // Adjust the position of the new oval shape
//         const numShapes = moduleElement.querySelectorAll('.oval-shape').length;
//         newOval.style.marginTop = `${numShapes * 10}px`;

//         // Save the state after adding the new oval shape
//         saveState('add', newOval);
//     }

//     const initialStaticRightOverlay = document.querySelector('.border-overlay-right');
//     const initialStaticBottomRightBox = document.querySelector('.small-box.bottom-right');
//     const initialModuleRightOverlay = document.getElementById('module_0')?.querySelector('.border-overlay-right');
//     const initialModuleFunc1Button = document.getElementById('module_0')?.querySelector('.func_1');
//     const initialModuleFunc2Button = document.getElementById('module_0')?.querySelector('.func_2');

//     if (initialStaticRightOverlay) {
//         initialStaticRightOverlay.addEventListener('click', () => {
//             const static0 = document.getElementById('static_0');
//             if (static0 && !createdStaticContainers.has(static0.id)) {
//                 addStaticContainer(static0);
//             } else {
//                 alert('A new static container cannot be added from this element.');
//             }
//         });
//     }

//     if (initialStaticBottomRightBox) {
//         initialStaticBottomRightBox.addEventListener('click', () => {
//             const static0 = document.getElementById('static_0');
//             const module1 = document.getElementById('module_1');
//             if (static0 && module1) {
//                 toggleDownArrow(static0, module1);
//             } else {
//                 alert('Module_1 not found.');
//             }
//         });
//     }

//     if (initialModuleRightOverlay) {
//         initialModuleRightOverlay.addEventListener('click', () => {
//             const module0 = document.getElementById('module_0');
//             if (module0 && !createdModuleContainers.has(module0.id)) {
//                 addModuleContainer(module0);
//             } else {
//                 alert('A new module container cannot be added from this element.');
//             }
//         });
//     }

//     if (initialModuleFunc1Button) {
//         initialModuleFunc1Button.addEventListener('click', () => {
//             const module0 = document.getElementById('module_0');
//             if (module0) {
//                 addOvalShape(module0, 'refine_func_2');
//             }
//         });
//     }

//     if (initialModuleFunc2Button) {
//         initialModuleFunc2Button.addEventListener('click', () => {
//             const module0 = document.getElementById('module_0');
//             if (module0) {
//                 addOvalShape(module0, 'refine_func_3');
//             }
//         });
//     }

//     let history = [];
//     let currentStateIndex = -1;

//     function saveState(action, element) {
//         const state = {
//             action: action,
//             element: element.cloneNode(true),
//             timestamp: new Date().toISOString()
//         };

//         history = history.slice(0, currentStateIndex + 1);
//         history.push(state);
//         currentStateIndex++;
//     }

//     function undo() {
//         if (currentStateIndex <= 0) return;
//         currentStateIndex--;

//         const previousState = history[currentStateIndex];
//         if (previousState) {
//             const parent = container.querySelector(`#${previousState.element.id}`).parentNode;
//             parent.replaceChild(previousState.element, container.querySelector(`#${previousState.element.id}`));
//         }
//     }

//     function redo() {
//         if (currentStateIndex >= history.length - 1) return;
//         currentStateIndex++;

//         const nextState = history[currentStateIndex];
//         if (nextState) {
//             const parent = container.querySelector(`#${nextState.element.id}`).parentNode;
//             parent.replaceChild(nextState.element, container.querySelector(`#${nextState.element.id}`));
//         }
//     }

//     function renderArrowsOnCanvas(canvas) {
//         const ctx = canvas.getContext('2d');
//         ctx.strokeStyle = 'blue';
//         ctx.lineWidth = 4;
//         leaderLines.forEach(line => {
//             if (line.start && line.end) {
//                 const startRect = line.start.getBoundingClientRect();
//                 const endRect = line.end.getBoundingClientRect();

//                 ctx.beginPath();
//                 ctx.moveTo(startRect.left + startRect.width / 2, startRect.top + startRect.height / 2);
//                 ctx.lineTo(endRect.left + endRect.width / 2, endRect.top + endRect.height / 2);
//                 ctx.stroke();
//             }
//         });
//     }

//     const saveAsImageBtn = document.getElementById('saveAsImageBtn');
//     if (saveAsImageBtn) {
//         saveAsImageBtn.addEventListener('click', () => {
//             const canvas = document.createElement('canvas');
//             canvas.width = container.clientWidth;
//             canvas.height = container.clientHeight;
//             renderArrowsOnCanvas(canvas);

//             html2canvas(container, {
//                 canvas: canvas
//             }).then(canvas => {
//                 const link = document.createElement('a');
//                 link.href = canvas.toDataURL('image/png');
//                 link.download = 'flow_diagram.png';
//                 link.click();
//             });
//         });
//     }

//     const undoBtn = document.getElementById('undoBtn');
//     if (undoBtn) {
//         undoBtn.addEventListener('click', undo);
//     }

//     const redoBtn = document.getElementById('redoBtn');
//     if (redoBtn) {
//         redoBtn.addEventListener('click', redo);
//     }
// });





document.addEventListener('DOMContentLoaded', () => {
    const static0 = document.getElementById('static_0');
    const module0 = document.getElementById('module_0');
    
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
  });



document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    let staticCounter = 0;
    let moduleCounter = 0;
    const createdStaticContainers = new Set();
    const createdModuleContainers = new Set();
    const downArrows = {};
    const leaderLines = [];

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

        const rightOverlay = newStatic.querySelector('.border-overlay-right');
        const bottomRightBox = newStatic.querySelector('.small-box.bottom-right');

        if (rightOverlay) {
            rightOverlay.addEventListener('click', () => addStaticContainer(newStatic));
        }
        
        if (bottomRightBox) {
            bottomRightBox.addEventListener('click', () => {
                const moduleId = `module_${staticCounter}`;
                const module = document.getElementById(moduleId);
                if (module) {
                    toggleDownArrow(newStatic, module);
                } else {
                    alert(`${moduleId} not found.`);
                }
            });
        }

        saveState('add', newContainer, line);
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
            <div class="small-box top-left"></div>`;

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

        const rightOverlay = newModule.querySelector('.border-overlay-right');
        const topLeftBox = newModule.querySelector('.small-box.top-left');
        const func1Button = newModule.querySelector('.func_1');
        const func2Button = newModule.querySelector('.func_2');

        if (rightOverlay) {
            rightOverlay.addEventListener('click', () => addModuleContainer(newModule));
        }
        
        if (topLeftBox) {
            topLeftBox.addEventListener('click', () => toggleDownArrow(correspondingStatic, newModule));
        }

        if (func1Button) {
            func1Button.addEventListener('click', () => addOvalShape(newModule, 'refine_func_2'));
        }

        if (func2Button) {
            func2Button.addEventListener('click', () => addOvalShape(newModule, 'refine_func_3'));
        }

        saveState('add', newContainer, line, downArrow);
    }

    function toggleDownArrow(baseElement, targetElement) {
        const key = `${baseElement.id}-${targetElement.id}`;
        if (downArrows[key]) {
            downArrows[key].remove();
            delete downArrows[key];
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
        }

        saveState('toggleArrow', targetElement);
    }

    function addOvalShape(moduleElement, shapeName) {
        const newOval = document.createElement('div');
        newOval.className = 'oval-shape';
        newOval.innerText = shapeName;

        moduleElement.appendChild(newOval);

        const numShapes = moduleElement.querySelectorAll('.oval-shape').length;
        newOval.style.marginTop = `${numShapes * 10}px`;

        saveState('add', newOval);
    }

    const initialStaticRightOverlay = document.querySelector('.border-overlay-right');
    const initialStaticBottomRightBox = document.querySelector('.small-box.bottom-right');
    const initialModuleRightOverlay = document.getElementById('module_0')?.querySelector('.border-overlay-right');
    const initialModuleFunc1Button = document.getElementById('module_0')?.querySelector('.func_1');
    const initialModuleFunc2Button = document.getElementById('module_0')?.querySelector('.func_2');

    if (initialStaticRightOverlay) {
        initialStaticRightOverlay.addEventListener('click', () => {
            const static0 = document.getElementById('static_0');
            if (static0 && !createdStaticContainers.has(static0.id)) {
                addStaticContainer(static0);
            } else {
                alert('A new static container cannot be added from this element.');
            }
        });
    }

    if (initialStaticBottomRightBox) {
        initialStaticBottomRightBox.addEventListener('click', () => {
            const static0 = document.getElementById('static_0');
            const module1 = document.getElementById('module_1');
            if (static0 && module1) {
                toggleDownArrow(static0, module1);
            } else {
                alert('Module_1 not found.');
            }
        });
    }

    if (initialModuleRightOverlay) {
        initialModuleRightOverlay.addEventListener('click', () => {
            const module0 = document.getElementById('module_0');
            if (module0 && !createdModuleContainers.has(module0.id)) {
                addModuleContainer(module0);
            } else {
                alert('A new module container cannot be added from this element.');
            }
        });
    }

    if (initialModuleFunc1Button) {
        initialModuleFunc1Button.addEventListener('click', () => {
            const module0 = document.getElementById('module_0');
            if (module0) {
                addOvalShape(module0, 'refine_func_2');
            }
        });
    }

    if (initialModuleFunc2Button) {
        initialModuleFunc2Button.addEventListener('click', () => {
            const module0 = document.getElementById('module_0');
            if (module0) {
                addOvalShape(module0, 'refine_func_3');
            }
        });
    }

    let history = [];
    let currentStateIndex = -1;

    function saveState(action, element, ...lines) {
        const state = {
            action: action,
            element: element.outerHTML,
            lines: lines.map(line => ({
                start: line.start.id,
                end: line.end.id,
                options: line.options
            }))
        };
        history = history.slice(0, currentStateIndex + 1);
        history.push(state);
        currentStateIndex++;
    }

    function undo() {
        if (currentStateIndex >= 0) {
            const state = history[currentStateIndex];
            currentStateIndex--;

            if (state.action === 'add') {
                const element = document.querySelector(`[id="${state.element.id}"]`);
                if (element) {
                    element.remove();
                }
            } else if (state.action === 'toggleArrow') {
                const baseElement = document.getElementById(state.lines[0].start);
                const targetElement = document.getElementById(state.lines[0].end);
                toggleDownArrow(baseElement, targetElement);
            }
        }
    }

    function redo() {
        if (currentStateIndex < history.length - 1) {
            currentStateIndex++;
            const state = history[currentStateIndex];

            if (state.action === 'add') {
                const tempContainer = document.createElement('div');
                tempContainer.innerHTML = state.element;
                const element = tempContainer.firstChild;
                container.appendChild(element);

                state.lines.forEach(line => {
                    const start = document.getElementById(line.start);
                    const end = document.getElementById(line.end);
                    const newLine = new LeaderLine(start, end, line.options);
                    leaderLines.push(newLine);
                });
            } else if (state.action === 'toggleArrow') {
                const baseElement = document.getElementById(state.lines[0].start);
                const targetElement = document.getElementById(state.lines[0].end);
                toggleDownArrow(baseElement, targetElement);
            }
        }
    }

    document.getElementById('undo').addEventListener('click', undo);
    document.getElementById('redo').addEventListener('click', redo);
});
