<template>
    <!-- need a root element because webpack will throw an error re: v-if -->
    <div class="">
        <div id="header">
            <div class="">
                <h1>VueJS Calendar</h1>
            </div>
            <div class="">
                <current-month></current-month>
            </div>
        </div>
        <div id='day-bar'>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
        </div>
        <div id='calendar'>
            <div v-for="week in weeks" class='calendar-week'>
                <calendar-day v-for="day in week" :day="day"></calendar-day>
            </div>
        </div>
        <event-form></event-form>
    </div>

</template>


<script>
    import CalendarDay from './CalendarDay.vue';
    import CurrentMonth from './CurrentMonth.vue';
    import EventForm from './EventForm.vue';
    export default {
        computed: {
            month() {
                return this.$store.state.currentMonth;
            },
            year() {
                return this.$store.state.currentYear;
            },
            days() {
                // Generating all days in current month
                let days = [];
                let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D');
                do {
                    days.push(currentDay);
                    currentDay = this.$moment(currentDay).add(1, 'days');
                } while ((currentDay.month() + 1) === this.month);
                // must add a few days to start and end of month!
                // add previous days to start:
                currentDay = this.$moment(days[0]);
                const SUNDAY = 0;
                const MONDAY = 1;

                // do not add days to start of month if the first day of the month is already Monday:
                if (currentDay.day() !== MONDAY) {
                    do {
                        currentDay = this.$moment(currentDay).subtract(1, 'days');
                        // use unshift to add the previous days to the beginning of the days array rather than end
                        days.unshift(currentDay);
                    } while (currentDay.day() !== MONDAY); // Monday is equal to 1, so we don't want to go back further than Monday (since it's first day of week)
                }

                // add future days to end of month:
                currentDay = this.$moment(days[days.length-1]); // get last day of month

                // do not add days to end of month if last day of month is already Sunday:
                if (currentDay.day() !== SUNDAY) {
                    do {
                        currentDay = this.$moment(currentDay).add(1, 'days');
                        days.push(currentDay);
                    } while (currentDay.day() !== SUNDAY) // same concept as above
                }
                return days;
            },
            weeks() {
                let weeks = [];
                let week = [];

                for (let day of this.days ) {
                    week.push(day);
                    if (week.length === 7) {
                        weeks.push(week);
                        week = [];
                    }
                }
                return weeks;
            }
        },
        components: {
            CalendarDay,
            CurrentMonth,
            EventForm
        }
    }

</script>
