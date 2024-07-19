// // downloadEventB.js

// document.addEventListener('DOMContentLoaded', () => {
//     const container = document.getElementById('container');

//     // Function to generate Event-B context
//     function generateEventBContext(staticId) {
//         let contextContent = `CONTEXT\n\t${staticId}\t›This is the context of the model.\n\n`;
//         let setsContent = 'SETS\n\n';
//         let constantsContent = 'CONSTANTS\n\n';
//         let axiomsContent = `AXIOMS\n\n\taxm1: partition(${staticId.toLowerCase()}, {${staticId.toLowerCase()}_elements})\n\n`;
//         contextContent += setsContent + constantsContent + axiomsContent + 'END';
//         return contextContent;
//     }

//     // Function to generate Event-B machine
//     function generateEventBMachine(moduleId, seenContext) {
//         let machineContent = `MACHINE\n\t${moduleId}\n\n`;
//         let seesContent = `SEES\n\t${seenContext}\n\n`;
//         let variablesContent = 'VARIABLES\n\n';
//         let invariantsContent = 'INVARIANTS\n\n';
//         let eventsContent = 'EVENTS\n\n\tINITIALISATION: not extended ordinary ›\n\n';
//         machineContent += seesContent + variablesContent + invariantsContent + eventsContent + 'END';
//         return machineContent;
//     }

//     // Function to download a file
//     function downloadFile(filename, content) {
//         const blob = new Blob([content], { type: 'text/plain' });
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = filename;
//         link.click();
//         URL.revokeObjectURL(link.href);
//     }

//     // Add event listener for the download Event-B button
//     document.getElementById('downloadEventBBtn').addEventListener('click', () => {
//         const staticContainers = document.querySelectorAll('[id^="static_"]');
//         const moduleContainers = document.querySelectorAll('[id^="module_"]');

//         staticContainers.forEach((staticContainer, index) => {
//             const staticId = staticContainer.id;
//             const contextContent = generateEventBContext(staticId);
//             downloadFile(`${staticId}.buc`, contextContent);

//             if (moduleContainers[index]) {
//                 const moduleId = moduleContainers[index].id;
//                 const machineContent = generateEventBMachine(moduleId, staticId);
//                 downloadFile(`${moduleId}.bum`, machineContent);
//             }
//         });
//     });
// });