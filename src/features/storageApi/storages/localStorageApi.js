
export class localStorageApi {
    constructor() {
        this.name = 'localStorage';
        this.collectionName = 'noteList';
        this.formOpt = [
            {label: 'Collection Name', name: 'collectionName', type: 'text'},
        ];
        this.collection = null;
    }

    connect(data) {
        // debugger
        let collection = localStorage.getItem(this.collectionName);
        if(collection){
            this.collection = [...JSON.parse(collection)];
        } else {
            this.collection = [];
            this.save(this.collectionName, this.collection);
        }
        return this;
    }

    async find() {
        return this.collection;
    }

    save(collectionName, collection) {
        localStorage.setItem(collectionName, JSON.stringify(collection));
    }
    async updateOne(id, entity) {
        debugger
        const document = this.collection.find(document => document.id === id);
        if(document) {
            let index = this.collection.indexOf(document);
            const newCollect = [...this.collection];
            newCollect[index] = {id, ...entity};
            this.save(this.collectionName, newCollect);
            this.collection = [...newCollect];
            return this.collection;
        }
        return null;
    }

    async insertOne(document) {
        debugger
        const lastId  = this.collection.length > 0 ? this.collection[this.collection.length-1].id : null;
        const newId  = lastId ? Number(lastId) + 1 : 1;
        this.collection = [...this.collection, {id: String(newId), ...document}];
        this.save(this.collectionName,this.collection);
        return this.collection;
    }
}