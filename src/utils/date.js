export function formatDate(string) {
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return new Date(string).toLocaleDateString('en-EN', options);
}