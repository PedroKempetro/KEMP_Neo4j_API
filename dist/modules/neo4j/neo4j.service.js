"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neo4jService = void 0;
const common_1 = require("@nestjs/common");
const neo4j_driver_1 = __importDefault(require("neo4j-driver"));
const dotenv = __importStar(require("dotenv"));
// Carrega as variáveis de ambiente
dotenv.config();
let Neo4jService = class Neo4jService {
    constructor() {
        const uri = process.env.NEO4J_URI || 'bolt://localhost:7687';
        const username = process.env.NEO4J_USERNAME || 'neo4j';
        const password = process.env.NEO4J_PASSWORD || 'password';
        console.log(`🔗 Conectando ao Neo4j em: ${uri}`);
        console.log(`👤 Usuário: ${username}`);
        console.log(`🔑 Senha: ${password.replace(/./g, '*')}`);
        try {
            this.driver = neo4j_driver_1.default.driver(uri, neo4j_driver_1.default.auth.basic(username, password));
            // Teste a conexão imediatamente
            this.testConnection();
        }
        catch (error) {
            console.error('❌ Erro ao criar driver Neo4j:', error);
            throw error;
        }
    }
    async testConnection() {
        const session = this.driver.session();
        try {
            console.log('🧪 Testando conexão Neo4j...');
            await session.run('RETURN 1 as test');
            console.log('✅ Conexão Neo4j estabelecida com sucesso!');
        }
        catch (error) {
            console.error('❌ Erro na conexão Neo4j:', error.message || error);
            throw error;
        }
        finally {
            await session.close();
        }
    }
    async createNode(label, properties) {
        const session = this.driver.session();
        try {
            const query = `CREATE (n:${label} $properties)`;
            await session.run(query, { properties });
        }
        finally {
            await session.close();
        }
    }
    async findNode(label, properties) {
        const session = this.driver.session();
        try {
            const query = `MATCH (n:${label}) WHERE n = $properties RETURN n`;
            const result = await session.run(query, { properties });
            return result.records.map(record => record.get('n').properties);
        }
        finally {
            await session.close();
        }
    }
    async executeCypher(query, params) {
        const session = this.driver.session();
        try {
            const result = await session.run(query, params);
            return result.records.map(record => record.toObject());
        }
        finally {
            await session.close();
        }
    }
    async getDataById(id) {
        return this.findNode('Data', { id });
    }
    async createData(createDataDto) {
        return this.createNode('Data', createDataDto);
    }
    async executeQuery(query) {
        return this.executeCypher(query, {});
    }
    async onModuleDestroy() {
        await this.driver.close();
    }
};
Neo4jService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], Neo4jService);
exports.Neo4jService = Neo4jService;
