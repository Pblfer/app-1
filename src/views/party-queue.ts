import { connect, html, withExtended } from 'fit-html';
import { repeat } from 'lit-html/lib/repeat';

import { State, Track } from '../state';
import sharedStyles from '../util/shared-styles';

interface PartyQueueProps {
    tracks: Track[];
}

interface PartyQueueDispatch {
}

/* tslint:disable:max-line-length */
const PartyQueue = (props: PartyQueueProps & PartyQueueDispatch) => html`
    ${sharedStyles}
    <style>
        :host {
            background-color: var(--track-bg);
            position: relative;
        }

        :host([view=search]) queue-track:first-of-type {
            padding-top: 16px;
            z-index: 1;
        }

        queue-track:nth-child(even) {
            background-color: var(--track-bg-even);
        }

        queue-track[playing] {
            background-color: #22262b;
            padding: 13px 16px;

            transform: translateX(0px); /* Dirty hack */
        }

        queue-track[playing] + queue-track {
            padding-top: 13px;
        }

        p {
            margin: 0;
            text-align: center;
        }

        paper-button {
            display: inline-block;
            margin: 20px;
        }

        festify-spinner {
            background: var(--secondary-color);
        }

        #skipBackground {
            position: absolute;
            right: 0;
            width: 100%;

            display: flex;
            align-items: flex-end;
            flex-direction: column;
            justify-content: center;

            height: 80px;
            pointer-events: none;
            transition: background-color 0.25s;
            z-index: 0;
        }

        #skipBackground.active {
            background-color: var(--primary-color);
        }

        #skipBackground p {
            line-height: 16px;
            margin: 0 32px 0 0;
            text-align: right;
        }
    </style>

    <div id="skipBackground"
         style$="display: [[_getDisplaySkipIndicator(tracks.length, state.isOwner)]]">
        <p id="skipIndicator">Skip</p>
    </div>

    <dom-flip>
        ${repeat(props.tracks, track => track.reference.id, track => html`
            <queue-track data-flip-id$="${track.reference.id}"
                         track="${track}">
            </queue-track>
        `)}
    </dom-flip>
`;
/* tslint:enable */

const mapStateToProps = (state: State): PartyQueueProps => ({

});

const mapDispatchToProps: PartyQueueDispatch = {};

customElements.define(
    'party-queue',
    withExtended(connect(
        mapStateToProps,
        mapDispatchToProps,
        PartyQueue,
    )),
);