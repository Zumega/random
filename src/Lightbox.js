import React, { Component } from 'react';
import './Lightbox.css';

class Lightbox extends Component {
    constructor(props) {
        super(props);

        this.height = window.innerHeight + 100;

        this.state = {
            access: false,
            marginTop:  '-' + this.height + 'px'
        };

        this.handleX = this.handleX.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => {
            if (!prevState.access) {
                return {
                    ...prevState,
                    access: nextProps.trigger
                }
            }
        }, () => {
            setTimeout(() => {
                this.setState({marginTop: '0'});
            }, .5 * 1e3);
        });
    }

    handleX (back) {
        if (back) {
            // clicked the 'x'
            this.setState({marginTop: '-' + this.height + 'px'}, () => {
                setTimeout(() => {
                    this.setState({access: false});
                }, .5 * 1e3);
            });
        } else {
            // all good
            this.setState({marginTop: (this.height * 2) + 'px'}, () => {
                setTimeout(() => {
                    this.setState({access: false, marginTop: '-' + this.height + 'px'});
                }, .5 * 1e3);
            });
        }
    }

    handleSubmit (e) {
        e.preventDefault();
        console.log('GOing');

        //TODO: check for login validity

        //TODO: if valid login
        this.handleX();
    }

    render() {
        // add this to the drowdown in the tool kit
        document.getElementsByTagName('body')[0].style.overflow = (this.state.access) ? 'hidden' : 'auto';

        return (
            this.state.access &&
            <div>
                <div style={{
                    backgroundColor: 'rgba(0, 0, 0, .5)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 100,
                    width: '100%',
                    height: '100%'
                }}>
                    <div style={{
                        position: 'fixed',
                        top: '5%',
                        left: '50%',
                        zIndex: 110,
                        width: '400px',
                        minHeight: '100px',
                        marginTop: this.state.marginTop,
                        marginRight: '0',
                        marginBottom: '0',
                        marginLeft: '-200px',
                        backgroundColor: '#fff',
                        border: '1px solid #000',
                        transition: 'margin .5s linear'
                    }}>
                        <div style={{
                            float: 'right',
                            margin: '-1em -1em 0 0',
                            display: 'block',
                            backgroundColor: '#fff',
                            border: '1px solid #000',
                            fontSize: '1em',
                            textAlign: 'center',
                            lineHeight: '2em',
                            width: '2em',
                            borderRadius: '50%',
                            fontWeight: 'bold'
                        }} onClick={() => this.handleX(true)}>X</div>
                        <h3>admin login</h3>
                        <section style={{
                            overflow: 'scroll',
                            maxHeight: '500px'
                        }}>
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" placeholder="username" />
                                <input type="password" placeholder="password" />
                                <button type="submit">GO</button>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        );
    };
}

export default Lightbox;