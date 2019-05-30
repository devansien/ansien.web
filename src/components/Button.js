import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Button.css';

class Button extends Component {
    constructor(props) {
        super(props);

        this.spanStyles = {};
        if (props.colspan !== 1) {
            this.spanStyles.gridColumn = `span ${props.colspan}`;
        }
        if (props.rowspan !== 1) {
            this.spanStyles.gridRow = `span ${props.rowspan}`;
        }

        this.state = { isToggleOn: true };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this.props.timespan);
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));

        fetch(`http://localhost:63473/api/query/${this.props.timespan}`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result
                    });

                    this.props.callbackFromP(result);
                    // debugger;
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        return (
            <div style={this.spanStyles} className="Button">
                <div className="header" onClick={this.handleClick}>
                    <h2>
                        {this.props.heading}
                    </h2>
                    {/* {this.state.isToggleOn ? 'ON' : 'OFF'} */}
                </div>
            </div>
        );
    }
}

Button.defaultProps = {
    heading: "Button",
    colspan: 1,
    rowspan: 1,
    timespan: 24
}

Button.propTypes = {
    heading: PropTypes.string,
    colspan: PropTypes.number,
    rowspan: PropTypes.number,
    timespan: PropTypes.number
}

export default Button;
