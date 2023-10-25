import React, { Component } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default class Labels extends Component {
    state = {
        choosenLabels: []
    }

    componentDidMount = () => {
        this.setNewState();
    }

    setNewState = () => {
        this.setState({ choosenLabels: this.props.task.labels })
    }

    updateChoosenLabels = (ev) => {
        const label = ev.target.classList[0];
        const choosenLabels = this.state.choosenLabels;
        const labelIdx = choosenLabels.findIndex(currLabel => currLabel === label);
        let msg = '';
        let notificationType = '';
        if (labelIdx >= 0) {
            choosenLabels.splice(labelIdx, 1);
            msg = `A label was removed from the task '${this.props.task.title}'`;
            notificationType = 'danger';
        } else {
            choosenLabels.push(label);
            msg = `A label was added to the task '${this.props.task.title}'`;
            notificationType = 'success';
        }
        this.setState({ choosenLabels }, () => this.onSave(msg, notificationType));
    }

    onSave = (msg, notificationType) => {
        const newTask = { ...this.props.task, labels: this.state.choosenLabels };
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        this.props.updateBoard(newBoard, msg, notificationType);
    }

    onStopPropagation = (ev) => {
        ev.stopPropagation();
    }

    isLabelChosen = (label) => {
        return this.state.choosenLabels.includes(label);
    }

    render() {
        return (
            <div className="labels-container text-center" onClick={(ev) => this.onStopPropagation(ev)}>
                <CloseIcon className="labels-container-close-btn" onClick={ev => this.props.closeAll(ev)} /> 
                <p className="uppercase">choose labels</p>
                <div className="labels-container-colors-container flex ">
                    <div className={`label-color-1 large-label ${this.isLabelChosen('label-color-1') ? 'chosen' : ''}`} onClick={(ev) => this.updateChoosenLabels(ev)}></div>
                    <div className={`label-color-2 large-label ${this.isLabelChosen('label-color-2') ? 'chosen' : ''}`} onClick={(ev) => this.updateChoosenLabels(ev)}></div>
                    <div className={`label-color-3 large-label ${this.isLabelChosen('label-color-3') ? 'chosen' : ''}`} onClick={(ev) => this.updateChoosenLabels(ev)}></div>
                    <div className={`label-color-4 large-label ${this.isLabelChosen('label-color-4') ? 'chosen' : ''}`} onClick={(ev) => this.updateChoosenLabels(ev)}></div>
                    <div className={`label-color-5 large-label ${this.isLabelChosen('label-color-5') ? 'chosen' : ''}`} onClick={(ev) => this.updateChoosenLabels(ev)}></div>
                    <div className={`label-color-6 large-label ${this.isLabelChosen('label-color-6') ? 'chosen' : ''}`} onClick={(ev) => this.updateChoosenLabels(ev)}></div>
                </div>
            </div>
        );
    }
}
