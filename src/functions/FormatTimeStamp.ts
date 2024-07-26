interface Timestamp {
    seconds: number;
    nanoseconds: number;
}
  
export const FormatTimestamp = (timestamp: Timestamp): string =>{
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
  
    // Format the date according to your desired locale and options
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
  
    const formattedDate = date.toLocaleDateString('es-AR', options); // Use 'es-AR' for Spanish (Argentina) locale
  
    // Extract day, month, and time parts
    const [day, month, year, time] = formattedDate.split(' ');
  
    // Return the formatted string in the desired format
    return `${day} ${month} - ${time} hs`;
}