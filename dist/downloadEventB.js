document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    let staticCounter = 0;
    let moduleCounter = 0;
    const createdStaticContainers = new Set();
    const createdModuleContainers = new Set();
    const downArrows = {};
    const leaderLines = [];

    // Existing functions for adding static and module containers...

    // Function to generate Event-B context
    function generateEventBContext() {
        let contextContent = 'CONTEXT\n\tStatic_0\t›This is the context of the initial model.\n\n';
        let setsContent = 'SETS\n\n';
        let constantsContent = 'CONSTANTS\n\n';
        let axiomsContent = 'AXIOMS\n\n\taxm1: partition(static_0, {static_0_elements})\n\n';
        contextContent += setsContent + constantsContent + axiomsContent + 'END';
        return contextContent;
    }

    // Function to generate Event-B machine
    function generateEventBMachine() {
        let machineContent = 'MACHINE\n\tModule_0\n\n';
        let seesContent = 'SEES\n\tStatic_0\n\n';
        let variablesContent = 'VARIABLES\n\n';
        let invariantsContent = 'INVARIANTS\n\n';
        let eventsContent = 'EVENTS\n\n\tINITIALISATION: not extended ordinary ›\n\n';
        machineContent += seesContent + variablesContent + invariantsContent + eventsContent + 'END';
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
    document.getElementById('downloadEventBBtn').addEventListener('click', () => {
        const contextContent = generateEventBContext();
        const machineContent = generateEventBMachine();
        downloadFile('context_0.ctx', contextContent);
        downloadFile('machine_0.mch', machineContent);
    });
});
