import Vue from 'vue';
import App from './components/App.vue';
import './style.scss';
import store from './store';

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment }});


let events = window.__INITIAL_STATE__.map(event => {
    return {
        description: event.description,
        date: moment(event.date)
    };
});

let initialState = Object.assign({}, store.state, { events });
store.replaceState(initialState);

new Vue({
    el: '#app',
    data: {
        moment
    },
    components: {
        App
    },
    store,
    render(createElement) {
        let vnode = createElement(
            'div',
            { attrs: { id: 'app' } },
            [
                createElement( 'app' )
            ]
        );
        return vnode;
    }
});
