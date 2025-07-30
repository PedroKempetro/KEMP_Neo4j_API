import { Injectable, OnModuleDestroy } from '@nestjs/common';
import neo4j, { Driver, Session } from 'neo4j-driver';
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

@Injectable()
export class Neo4jService implements OnModuleDestroy {
  private  driver: Driver;

  constructor() {
    const uri = process.env.NEO4J_URI || 'bolt://localhost:7687';
    const username = process.env.NEO4J_USERNAME || 'neo4j';
    const password = process.env.NEO4J_PASSWORD || 'password';

    console.log(`🔗 Conectando ao Neo4j em: ${uri}`);
    
    this.driver = neo4j.driver(
      uri,
      neo4j.auth.basic(username, password)
    );
  }

  async createNode(label: string, properties: Record<string, any>): Promise<void> {
    const session = this.driver.session();
    try {
      const query = `CREATE (n:${label} $properties)`;
      await session.run(query, { properties });
    } finally {
      await session.close();
    }
  }

  async findNode(label: string, properties: Record<string, any>): Promise<any> {
    const session = this.driver.session();
    try {
      const query = `MATCH (n:${label}) WHERE n = $properties RETURN n`;
      const result = await session.run(query, { properties });
      return result.records.map(record => record.get('n').properties);
    } finally {
      await session.close();
    }
  }

  async executeCypher(query: string, params: Record<string, any>): Promise<any> {
    const session = this.driver.session();
    try {
      const result = await session.run(query, params);
      return result.records.map(record => record.toObject());
    } finally {
      await session.close();
    }
  }

  async getDataById(id: string) {
    return this.findNode('Data', { id });
  }

  async createData(createDataDto: any) {
    return this.createNode('Data', createDataDto);
  }

  async executeQuery(query: string) {
    return this.executeCypher(query, {});
  }

  async onModuleDestroy() {
    await this.driver.close();
  }
}