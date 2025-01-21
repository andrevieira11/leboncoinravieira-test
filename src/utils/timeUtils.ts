export const getDayWithTime = (timestamp: number) => {
    const lastMessageDate = new Date(timestamp * 1000);
    const now = new Date();
    const isToday = lastMessageDate.toDateString() === now.toDateString();
    const isYesterday = lastMessageDate.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();
    const lastMessageTime = lastMessageDate.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
    });

    if (isToday) {
        return 'today' + ' at ' + lastMessageTime;
    } else if (isYesterday) {
        return 'yesterday' + ' at ' + lastMessageTime;
    } else {
        return lastMessageDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }) + ' at ' + lastMessageTime;
    }
}