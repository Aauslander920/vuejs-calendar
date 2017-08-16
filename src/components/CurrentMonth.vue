<template>
    <div class="">
        <div class="">
            {{ formattedDate }}
        </div>
        <button type="button" name="button" @click="dec">-</button>
        <button type="button" name="button" @click="inc">+</button>
    </div>


</template>

<script>
    export default {
        computed: {
            formattedDate() {
                // taken from App component currentDay
                return this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D').format('MMMM YYYY');
            },
            month() {
                // taken from App component
                return this.$store.state.currentMonth;
            },
            year() {
                // taken from App component
                return this.$store.state.currentYear;
            }
        },
        methods: {
            dec() {
                // January is 1, so can't go lower than 1
                // commit method calls the name of the mutation from store
                if (this.month === 1) {
                    this.$store.commit('setCurrentMonth', 12);
                    this.$store.commit('setCurrentYear', this.year -1);
                } else {
                    console.log(this.month);
                    this.$store.commit('setCurrentMonth', this.month -1);
                }
                this.$store.commit('eventFormActive', false);
            },
            inc() {
                if (this.month === 12) {
                    this.$store.commit('setCurrentMonth', 1);
                    this.$store.commit('setCurrentYear', this.year +1);
                } else {
                    this.$store.commit('setCurrentMonth', this.month +1);
                }
                this.$store.commit('eventFormActive', false);
            }
        }
    }

</script>
