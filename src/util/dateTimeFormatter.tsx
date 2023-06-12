const DATE_TIME_FORMATTER = new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
});

export const formatDate = (date: Date) => {
    return DATE_TIME_FORMATTER.format(new Date(date));
};
