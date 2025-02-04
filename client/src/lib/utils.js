function formatTo12Hour(isoString) {
    const date = new Date(isoString);
    
    // Get UTC components (since ISO string ends with Z)
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    
    // Convert to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const twelveHour = hours % 12 || 12; 
  
    return `${twelveHour}:${minutes}:${seconds} ${ampm}`;
  }
  
export default formatTo12Hour;