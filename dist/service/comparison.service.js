"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparisonService = void 0;
const common_1 = require("@nestjs/common");
let ComparisonService = class ComparisonService {
    compareNeo4jWithOtherDatabases() {
        return 'Comparison results between Neo4j and other graph databases';
    }
    compareNeo4jWith(otherDb) {
        return `Comparing Neo4j with ${otherDb}: Neo4j offers ACID transactions and Cypher query language, while ${otherDb} may have different characteristics.`;
    }
    createDataModel(dataModel) {
        return `Data model created successfully: ${JSON.stringify(dataModel)}`;
    }
    getDataModelingDifferences() {
        return 'Data modeling differences between Neo4j and other graph databases';
    }
    getQueryLanguageDifferences() {
        return 'Query language differences between Neo4j and other graph databases';
    }
    getRealWorldUseCases() {
        return 'Real-world use cases for Neo4j and other graph databases';
    }
};
ComparisonService = __decorate([
    (0, common_1.Injectable)()
], ComparisonService);
exports.ComparisonService = ComparisonService;
