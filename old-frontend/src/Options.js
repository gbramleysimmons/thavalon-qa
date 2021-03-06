import React, { Component } from 'react';
import './css/App.scss';
import './css/Options.scss';


/**
 * Models the options window, which toggles the role options for the name. Requires three props:
 * a submit function, an options array, and a onChange function which will be mapped to each
 * checkbox.
 */
class Options extends Component {
    render() {
        let count = 0;
        return (
            <div className={"Options"}>
                {this.props.display ?
                        <form className={"options-form"} onSubmit={(event) => this.props.submit(event)}>
                        <div className={"checks"}>
                            {this.props.options.map(function (element) {
                                count++;
                                return (<div key={count} className={"option-ele"}>
                                    <label className="label">
                                        <input className={"check slider"} type={"checkbox"} name={element.key} defaultChecked={element.value}/>
                                        {element.key}
                                    </label>
                                </div>);
                            })}
                        </div>
                        <input className={"options-submit"} type={"submit"} value={"Done"}/>
                    </form>
                    : null
                }

            </div>
        );
    }
}

export default Options;