import { Module } from '@nestjs/common';
import { Neo4jModule } from './neo4j.module';

@Module({
  imports: [Neo4jModule],
})
export class AppModule {}