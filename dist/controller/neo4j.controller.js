"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neo4jController = void 0;
const common_1 = require("@nestjs/common");
const neo4j_service_1 = require("../service/neo4j.service");
let Neo4jController = class Neo4jController {
    constructor(neo4jService) {
        this.neo4jService = neo4jService;
    }
    async getData(id) {
        try {
            const result = await this.neo4jService.getDataById(id);
            return {
                success: true,
                data: result,
                message: 'Data retrieved successfully'
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: error.message || 'Failed to retrieve data'
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createData(createDataDto) {
        try {
            await this.neo4jService.createData(createDataDto);
            return {
                success: true,
                data: createDataDto,
                message: 'Data created successfully'
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: error.message || 'Failed to create data'
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async executeQuery(query) {
        try {
            const result = await this.neo4jService.executeQuery(query);
            return {
                success: true,
                data: result,
                message: 'Query executed successfully'
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: error.message || 'Failed to execute query'
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createNode(label, properties) {
        try {
            await this.neo4jService.createNode(label, properties);
            return {
                success: true,
                data: { label, properties },
                message: `Node with label '${label}' created successfully`
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: error.message || 'Failed to create node'
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findNodes(label, properties) {
        try {
            const searchProperties = properties || {};
            const result = await this.neo4jService.findNode(label, searchProperties);
            return {
                success: true,
                data: result,
                count: result.length,
                message: `Found ${result.length} node(s) with label '${label}'`
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: error.message || 'Failed to find nodes'
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async executeCypher(body) {
        try {
            const { query, params = {} } = body;
            const result = await this.neo4jService.executeCypher(query, params);
            return {
                success: true,
                data: result,
                count: result.length,
                message: 'Cypher query executed successfully'
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: error.message || 'Failed to execute Cypher query'
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Get)('data/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Neo4jController.prototype, "getData", null);
__decorate([
    (0, common_1.Post)('data'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Neo4jController.prototype, "createData", null);
__decorate([
    (0, common_1.Get)('query'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Neo4jController.prototype, "executeQuery", null);
__decorate([
    (0, common_1.Post)('node/:label'),
    __param(0, (0, common_1.Param)('label')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], Neo4jController.prototype, "createNode", null);
__decorate([
    (0, common_1.Get)('node/:label'),
    __param(0, (0, common_1.Param)('label')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], Neo4jController.prototype, "findNodes", null);
__decorate([
    (0, common_1.Post)('cypher'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Neo4jController.prototype, "executeCypher", null);
Neo4jController = __decorate([
    (0, common_1.Controller)('neo4j'),
    __metadata("design:paramtypes", [neo4j_service_1.Neo4jService])
], Neo4jController);
exports.Neo4jController = Neo4jController;
