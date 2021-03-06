import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import Card from './Card';
import { MOCK_CARDS } from '../../constants';
import { onBack, onForward, onBackUntilPosition } from '../../utils/utils';

export default class CardList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: MOCK_CARDS,
        };

        this.goTo = this.goTo.bind(this);
        this.goToNextCard = this.goToNextCard.bind(this);
    }

    goToNextCard(forward) {
        this.setState(prevState => ({
            cards: forward
                ? onForward(prevState.cards)
                : onBack(prevState.cards),
        }));
    }

    goTo(position) {
        this.setState(prevState => ({
            cards: onBackUntilPosition(position, prevState.cards)
        }));
    }

    componentDidMount() {
        console.log(this.state.cards);
    }

    render() {
        const S = {
            container: {
                width: 400,
                height: 500,
                position: 'relative',
            },
        };

        return (
            <div style={S.container}>
                {map(this.state.cards, (card, index) => (
                    <Card
                        onClick={position => this.goTo(position)}
                        width={220}
                        height={300}
                        key={card.id}
                        backgroundColor={card.color}
                        frontImageUrl={card.frontImageUrl}
                        position={index}
                        title={card.title}
                    />
                ))}

                <div
                    style={{ position: 'absolute', bottom: 0, right: 0 }}
                    onClick={() => this.goToNextCard(true)}
                >
                    {`>>>>`}
                </div>
                <div
                    style={{ position: 'absolute', bottom: 0, left: 0 }}
                    onClick={() => this.goToNextCard(false)}
                >
                    {`<<<<`}
                </div>
            </div>
        );
    }
}
