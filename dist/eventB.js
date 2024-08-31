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







// eventBGenerator.js

document.addEventListener('DOMContentLoaded', () => {
    const downloadJSBtn = document.getElementById('downloadJSBtn');
    if (downloadJSBtn) {
        downloadJSBtn.addEventListener('click', generateAndDownloadJS);
    }
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