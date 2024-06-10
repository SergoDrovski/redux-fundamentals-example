
export class localStorageApi {
    constructor() {
        this.name = 'localStorage';
        this.collectionName = 'noteList';
        this.formOpt = [
            {label: 'Collection Name', name: 'collectionName', type: 'text'},
        ];
        this.collection = null;
    }

    save(collectionName, collection) {
        localStorage.setItem(collectionName, JSON.stringify(collection));
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

    updateOne(id, entity) {
        // debugger
        let newDocument;
        this.collection = this.collection.map(document => {
            if(document.id === id) {
                document = newDocument = {id, ...entity}
            }
            return document;
        })
        if (newDocument) {
            this.save(this.collectionName, this.collection);
            return newDocument;
        }
        return null;
    }

    deleteOne(id) {
        // debugger
        const document = this.collection.find(document => document.id === id);
        if(document) {
            const newCollect = this.collection.filter((document) => document.id !== id);
            this.save(this.collectionName, newCollect);
            this.collection = [...newCollect];
            return null;
        }
        return {status: 'delete error'};
    }

    insertOne(document) {
        // debugger
        const lastId  = this.collection.length > 0 ? this.collection[this.collection.length-1].id : null;
        const newId  = lastId ? Number(lastId) + 1 : 1;
        const newDoc  = {id: String(newId), createdAt: new Date().toISOString(), ...document};
        this.collection = [...this.collection, newDoc];
        this.save(this.collectionName,this.collection);
        return newDoc;
    }
}