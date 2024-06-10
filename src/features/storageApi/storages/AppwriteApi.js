import {client} from "@/api/client";

export class AppwriteApi {
    constructor() {
        this.name = 'AppwriteApi';
        this.projectId = null;
        this.databaseId = null;
        this.collectionId = null;
        this.AppwriteKey = null;
        this.formOpt = [
            {label: 'projectId', name: 'projectId', type: 'text'},
            {label: 'databaseId', name: 'databaseId', type: 'text'},
            {label: 'collectionId', name: 'collectionId', type: 'text'},
            {label: 'AppwriteKey', name: 'AppwriteKey', type: 'text'},
        ];
       this.endpoint = 'https://cloud.appwrite.io/v1/databases'

    }

    setConnectData({projectId, databaseId, collectionId, AppwriteKey}) {
        this.projectId = projectId;
        this.databaseId = databaseId;
        this.collectionId = collectionId;
        this.AppwriteKey = AppwriteKey;
        this.headers = {
            'Content-Type': 'application/json',
            'X-Appwrite-Response-Format': '1.5.0',
            'X-Appwrite-Project': this.projectId,
            'X-Appwrite-Key': this.AppwriteKey,
        }
    }


    async connect(data) {
        this.setConnectData(data);
        return client.get(
            this.endpoint + `/${this.databaseId}/collections/${this.collectionId}/documents`,
            {headers: this.headers}
        )
    }

    async find() {
        // debugger
        const collection = await client.get(
            this.endpoint + `/${this.databaseId}/collections/${this.collectionId}/documents`,
            {headers: this.headers}
        )
        return collection.documents.map((document)=>{
            return this.normalizeDoc(document)
        });
    }

    async updateOne(id, entity) {
        // debugger
        const body = {
            permissions: ["write(\"any\")"],
            data: {
                title: entity.title,
                status:entity.status,
                todos: entity.todos.map(todo => {
                    let newTodo = {
                        text: todo.text,
                        completed: todo.completed
                    }
                    if(todo.id) newTodo.$id = todo.id
                    return newTodo
                })
            }
        }

        const document = await client.patch(
            this.endpoint + `/${this.databaseId}/collections/${this.collectionId}/documents/${id}`,
            body,
            {headers: this.headers},
        )

        return this.normalizeDoc(document);
    }

    async deleteOne(id) {
        // debugger
        return client.delete(
            this.endpoint + `/${this.databaseId}/collections/${this.collectionId}/documents/${id}`,
            null,
            {headers: this.headers},
        );
    }

    async insertOne(entity) {
        // debugger
        const body = {
            documentId: "unique()",
            permissions: ["write(\"any\")"],
            data: entity
        }

        const document = await client.post(
            this.endpoint + `/${this.databaseId}/collections/${this.collectionId}/documents`,
            body,
            {headers: this.headers},
        )

        return this.normalizeDoc(document);
    }

    normalizeDoc(document) {
        return {
            id: document.$id,
            title: document.title,
            status: document.status,
            createdAt: document.$createdAt,
            todos: document.todos.map(todo => {
                return {
                    id: todo.$id,
                    text: todo.text,
                    completed: todo.completed
                }
            })
        }
    }
}