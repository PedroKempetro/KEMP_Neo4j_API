"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphDatabasesService = void 0;
const common_1 = require("@nestjs/common");
let GraphDatabasesService = class GraphDatabasesService {
    constructor() {
        this.graphDatabases = [
            {
                name: 'Neo4j',
                dataModeling: 'Property Graph Model',
                queryLanguage: 'Cypher',
                useCases: ['Social Networks', 'Recommendation Systems', 'Fraud Detection'],
            },
            {
                name: 'Amazon Neptune',
                dataModeling: 'Property Graph and RDF',
                queryLanguage: 'Gremlin and SPARQL',
                useCases: ['Knowledge Graphs', 'Network Security', 'IoT Applications'],
            },
            {
                name: 'ArangoDB',
                dataModeling: 'Multi-Model (Document, Key/Value, Graph)',
                queryLanguage: 'AQL',
                useCases: ['Real-Time Analytics', 'Content Management', 'Recommendation Engines'],
            },
            {
                name: 'OrientDB',
                dataModeling: 'Multi-Model (Document and Graph)',
                queryLanguage: 'SQL-like',
                useCases: ['Access Control', 'Social Networks', 'Data Integration'],
            },
        ];
    }
    getGraphDatabases() {
        return this.graphDatabases;
    }
    findAll() {
        return this.getGraphDatabases();
    }
    findOne(name) {
        return this.getGraphDatabaseByName(name);
    }
    getGraphDatabaseByName(name) {
        return this.graphDatabases.find(db => db.name.toLowerCase() === name.toLowerCase());
    }
};
GraphDatabasesService = __decorate([
    (0, common_1.Injectable)()
], GraphDatabasesService);
exports.GraphDatabasesService = GraphDatabasesService;
