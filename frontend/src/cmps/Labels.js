import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Labels = ({ task, board, updateBoard, user, closeAll, miniTask }) => {
    const [choosenLabels, setChoosenLabels] = useState([]);
    
    useEffect(() => {
        setChoosenLabels(task.labels);
    }, [task.labels]);
    
    const updateChoosenLabels = (ev) => {
        const label = ev.target.classList[0];
        const labelIdx = choosenLabels.findIndex(currLabel => currLabel === label);
        let msg = '';
        let notificationType = '';
        
        if (labelIdx >= 0) {
            choosenLabels.splice(labelIdx, 1);
            msg = `A label was removed from the task '${task.title}'`;
            notificationType = 'danger';
        } else {
            choosenLabels.push(label);
            msg = `A label was added to the task '${task.title}'`;
            notificationType = 'success';
        }
        
        setChoosenLabels([...choosenLabels], () => onSave(msg, notificationType));
    }
    
    const onSave = (msg, notificationType) => {
        const newTask = { ...task, labels: choosenLabels };
        const newBoard = {
            ...board,
            tasks: {
                ...board.tasks,
                [newTask.id]: newTask
            }
        };
        
        updateBoard(newBoard, msg, notificationType);
    }
    
    const onStopPropagation = (ev) => {
        ev.stopPropagation();
    }
    
    const isLabelChosen = (label) => {
        return choosenLabels.includes(label) ? 'chosen' : '';
    };
    
    let updateStyle = null;
    if (miniTask) {
        updateStyle = {
            left: '12px',
            top: '36px',
        }
    }
    
    return (
        <div className="labels-container text-center"
            onClick={(ev) => onStopPropagation(ev)}
            style={{ ...updateStyle }}
        >
            <CloseIcon className="labels-container-close-btn" onClick={ev => closeAll(ev)} />
            <p className="uppercase">choose labels</p>
            <hr />
            <div className="labels-container-colors-container flex">
                <div className={`label-color-1 large-label ${isLabelChosen('label-color-1')}`} onClick={(ev) => updateChoosenLabels(ev)}></div>
                <div className={`label-color-2 large-label ${isLabelChosen('label-color-2')}`} onClick={(ev) => updateChoosenLabels(ev)}></div>
                <div className={`label-color-3 large-label ${isLabelChosen('label-color-3')}`} onClick={(ev) => updateChoosenLabels(ev)}></div>
                <div className={`label-color-4 large-label ${isLabelChosen('label-color-4')}`} onClick={(ev) => updateChoosenLabels(ev)}></div>
                <div className={`label-color-5 large-label ${isLabelChosen('label-color-5')}`} onClick={(ev) => updateChoosenLabels(ev)}></div>
                <div className={`label-color-6 large-label ${isLabelChosen('label-color-6')}`} onClick={(ev) => updateChoosenLabels(ev)}></div>
            </div>
        </div>
    );
}

export default Labels;
