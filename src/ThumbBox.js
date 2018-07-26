import React, { Component } from 'react';
import './ThumbBox.css';

class ThumbBox extends Component {
    constructor() {
        super();

        const boxes = [];
        const speed = 1e3;
        const size = 10;
        let count = 400;

        while(count--) {
            boxes.unshift(
                <div style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    display: 'inline-block',
                    backgroundColor: '#f00',
                    fontSize: '8px',
                    textAlign: 'center',
                    lineHeight: `${size}px`
                }}
                     key={count}
                     ref={(box) => this.setBox(box)}
                >
                </div>
            );
        }

        this.state = {
            boxes,
            refs: [],
            used: [],
            bgColorA: '#0f0',
            bgColorN: '#f0f'
        };

        this.setBox = this.setBox.bind(this);
        this.changeBox = this.changeBox.bind(this);

        setInterval(this.changeBox, speed);
    }

    setBox(box) {
        this.setState(prevState => ({
            ...prevState,
            refs: [...prevState.refs, box]
        }));
    }

    changeBox() {
        const {
            refs,
            used,
            bgColorA,
            bgColorN
        } = this.state;
        const leng = refs.length - 1;
        let i = Math.round(Math.random() * leng);
        let tmpRefs = [...refs];
        let tmpUsed = [...used];
        let a = bgColorA;
        let b = bgColorN;

        if (used.length <= leng) {
            while (used.indexOf(i) >= 0) {
                i = Math.round(Math.random() * leng);
            }
        }

        if (used.length > leng) {
            let c = a;
            a = b;
            b = c;

            tmpUsed = [];
        }

        tmpUsed.push(i);

        tmpRefs[i].style.backgroundColor = a;

        this.setState(prevState => ({
            ...prevState,
            refs: tmpRefs,
            used: tmpUsed,
            bgColorA: a,
            bgColorN: b
        }));
    };

    render() {
        return (
            <div style={{
                width: '100%',
                backgroundColor: '#aaa',
                overflow: 'hidden',
                textAlign: 'center',
                fontSize: 0
            }}>
                {
                    this.state.boxes.map(box => box)
                }
            </div>
        );
    };
}

export default ThumbBox;