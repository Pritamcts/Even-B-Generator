



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

        newModule.querySelector('.border-overlay-right').addEventListener('click', () => addModuleContainer(newModule));
        newModule.querySelector('.small-box.top-left').addEventListener('click', () => toggleDownArrow(correspondingStatic, newModule));

        // Add event listeners to func_1 and func_2
        newModule.querySelector('.func_1').addEventListener('click', () => addOvalShape(newModule, 'refine_func_2'));
        newModule.querySelector('.func_2').addEventListener('click', () => addOvalShape(newModule, 'refine_func_3'));
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
    }

    function addOvalShape(moduleElement, shapeName) {
        const newOval = document.createElement('div');
        newOval.className = 'oval-shape';
        newOval.innerText = shapeName;

        moduleElement.appendChild(newOval);

        // Adjust the position of the new oval shape
        const numShapes = moduleElement.querySelectorAll('.oval-shape').length;
        newOval.style.marginTop = `${numShapes * 10}px`;
    }

    document.querySelector('.border-overlay-right').addEventListener('click', () => {
        const static0 = document.getElementById('static_0');
        if (!createdStaticContainers.has(static0.id)) {
            addStaticContainer(static0);
        } else {
            alert('A new static container cannot be added from this element.');
        }
    });

    document.querySelector('.small-box.bottom-right').addEventListener('click', () => {
        const static0 = document.getElementById('static_0');
        const module1 = document.getElementById('module_1');
        if (module1) {
            toggleDownArrow(static0, module1);
        } else {
            alert('Module_1 not found.');
        }
    });

    document.getElementById('module_0').querySelector('.border-overlay-right').addEventListener('click', () => {
        const module0 = document.getElementById('module_0');
        if (!createdModuleContainers.has(module0.id)) {
            addModuleContainer(module0);
        } else {
            alert('A new module container cannot be added from this element.');
        }
    });

    document.getElementById('module_0').querySelector('.func_1').addEventListener('click', () => {
        const module1 = document.getElementById('module_1');
        if (module1) {
            addOvalShape(module1, 'refine_func_2');
        } else {
            alert('Module_1 not found.');
        }
    });

    document.getElementById('module_0').querySelector('.func_2').addEventListener('click', () => {
        const module1 = document.getElementById('module_1');
        if (module1) {
            addOvalShape(module1, 'refine_func_3');
        } else {
            alert('Module_1 not found.');
        }
    });

    function renderArrowsOnCanvas(canvas) {
        const ctx = canvas.getContext('2d');
        leaderLines.forEach(line => {
            if (line && line.options) {
                const start = line.start.getBoundingClientRect();
                const end = line.end.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                ctx.beginPath();
                ctx.moveTo(start.left - containerRect.left + start.width / 2, start.top - containerRect.top + start.height / 2);
                ctx.lineTo(end.left - containerRect.left + end.width / 2, end.top - containerRect.top + end.height / 2);
                ctx.lineWidth = line.options.size;
                ctx.strokeStyle = line.options.color;
                ctx.stroke();
            }
        });
    }

    // Add event listener for the download button
    document.getElementById('downloadBtn').addEventListener('click', () => {
        html2canvas(container).then(canvas => {
            renderArrowsOnCanvas(canvas);
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'diagram.png';
            link.click();
        });
    });
});
