<template>
    <div id="event-form" :class="{ active: active }" :style="{ top: top, left: left }">
        <h4>Add an event</h4>
        <p>{{ date.format('dddd, MMM Do') }}</p>
        <div class="text">
            <!-- use a custom directive here to achieve instant focus on form open -->
            <!-- use keyup.enter, which comes built into vue -->
            <input v-focus type="text" name="" placeholder="Event here!" v-model="description" @keyup.enter="create">
        </div>
        <div class="buttons">
            <button @click="create" name="button">Create</button>
        </div>
        <button id="close-button" @click="close">&#10005</button>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                description: ''
            }
        },
        computed: {
            active() {
                return this.$store.state.eventFormActive;
            },
            top() {
                return this.$store.state.eventFormPosY + 'px';
            },
            left() {
                return this.$store.state.eventFormPosX + 'px';
            },
            date() {
                return this.$store.state.eventFormDate;
            }
        },
        methods: {
            close() {
                // on click of close button, set event form active to FALSE
                this.$store.commit('eventFormActive', false);
            },
            create() {
                if (this.description.length > 0) {
                    this.$store.dispatch('addEvent', this.description).then(_ => {
                        this.description = '';
                        this.$store.commit('eventFormActive', false);
                    });
                }
            }
        },
        directives: {
            focus: {
                // use update hook here
                update(el) {
                    el.focus();
                }
            }
        }
    }
</script>
