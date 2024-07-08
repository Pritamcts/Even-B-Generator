
document.addEventListener('DOMContentLoaded', () => {
    const undoButton = document.getElementById('undo');
    const redoButton = document.getElementById('redo');

    let history = [];
    let currentStateIndex = -1;

    function saveState(action, element) {
        const state = {
            action: action,
            element: element.outerHTML
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
            } else if (state.action === 'remove') {
                const tempContainer = document.createElement('div');
                tempContainer.innerHTML = state.element;
                const element = tempContainer.firstChild;
                container.appendChild(element);
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
            } else if (state.action === 'remove') {
                const element = document.querySelector(`[id="${state.element.id}"]`);
                if (element) {
                    element.remove();
                }
            }
        }
    }

    undoButton.addEventListener('click', undo);
    redoButton.addEventListener('click', redo);
});
