import React, { Component } from 'react';

import mapDynamicComponents from "./mapDynamicComponents"

export default class DynamicComponent extends Component {
    state = {
        componentType: 'text',
    }

    componentDidMount() {
        this.setState({ componentType: this.props.task.type });
    }

    getComponent() {
        return mapDynamicComponents[this.state.componentType];
    }

    render() {
        const Cmp = this.getComponent();
        return <React.Fragment>
            <Cmp
                toggleRender={this.props.toggleRender}
                column={this.props.column}
                provided={this.props.provided}
                innerRef={this.props.innerRef}
                task={this.props.task}
                onTaskId={this.props.onTaskId}
                showEditBtn={this.props.showEditBtn}
                toggleMiniDetails={this.props.toggleMiniDetails}
                user={this.props.user}
            >
            </Cmp>
        </React.Fragment>
    }
}