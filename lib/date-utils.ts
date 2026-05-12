export function formatRelativeTime(dateString: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'RECIENTE';
    
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
        return 'Hace unos segundos';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `Hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `Hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `Hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `Hace ${diffInMonths} ${diffInMonths === 1 ? 'mes' : 'meses'}`;
    }
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return `Hace ${diffInYears} ${diffInYears === 1 ? 'año' : 'años'}`;
}
