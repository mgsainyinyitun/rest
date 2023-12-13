class TKBError {
    constructor(id,occureDate,group,server,serverity,fase,message) {
        this.id = id;
        this.occureDate = occureDate;
        this.group = group;
        this.server = server;
        this.serverity = serverity;
        this.fase = fase;
        this.message = message;
    }
    

     convertISOToFormattedString(isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    }

    getErrorId() {
        return this.id;
    }

    display() {
        const tkb = {
            occureDate: this.occureDate,
            group: this.group,
            server: this.server,
            serverity: this.serverity,
            fase: this.fase,
            message: this.message
        }
        const valuesArray = Object.values(tkb);
        const vString = valuesArray.join(',');
       
        return [vString];
   
    }

    getTKBError() {
        return ({
            id: this.id,
            occureDate: this.convertISOToFormattedString(this.occureDate),
            group: this.group,
            server: this.server,
            serverity: this.serverity,
            fase: this.fase,
            message: this.message
        })
    }
}

export default TKBError;