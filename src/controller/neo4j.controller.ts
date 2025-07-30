import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Neo4jService } from "../service/neo4j.service";

@Controller("neo4j")
export class Neo4jController {
  constructor(private readonly neo4jService: Neo4jService) {}

  private formatSuccessResponse(data: any, message: string, count?: number) {
    const response: any = {
      success: true,
      data,
      message,
    };

    if (count !== undefined) {
      response.count = count;
    }

    return response;
  }

  private handleError(error: any, defaultMessage: string): never {
    throw new HttpException(
      {
        success: false,
        message: error.message || defaultMessage,
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }

  @Get("data/:id")
  async getData(@Param("id") id: string) {
    try {
      const result = await this.neo4jService.getDataById(id);
      return this.formatSuccessResponse(result, "Data retrieved successfully");
    } catch (error: any) {
      this.handleError(error, "Failed to retrieve data");
    }
  }

  @Post("data")
  async createData(@Body() createDataDto: any) {
    try {
      await this.neo4jService.createData(createDataDto);
      return this.formatSuccessResponse(
        createDataDto,
        "Data created successfully"
      );
    } catch (error: any) {
      this.handleError(error, "Failed to create data");
    }
  }

  @Get("query")
  async executeQuery(@Query("query") query: string) {
    try {
      const result = await this.neo4jService.executeQuery(query);
      return this.formatSuccessResponse(result, "Query executed successfully");
    } catch (error: any) {
      this.handleError(error, "Failed to execute query");
    }
  }

  @Post("node/:label")
  async createNode(@Param("label") label: string, @Body() properties: any) {
    try {
      await this.neo4jService.createNode(label, properties);
      const responseData = { label, properties };
      return this.formatSuccessResponse(
        responseData,
        `Node with label '${label}' created successfully`
      );
    } catch (error: any) {
      this.handleError(error, "Failed to create node");
    }
  }

  @Get("node/:label")
  async findNodes(@Param("label") label: string, @Query() properties: any) {
    try {
      const searchProperties = properties || {};
      const result = await this.neo4jService.findNode(label, searchProperties);
      const message = `Found ${result.length} node(s) with label '${label}'`;
      return this.formatSuccessResponse(result, message, result.length);
    } catch (error: any) {
      this.handleError(error, "Failed to find nodes");
    }
  }

  @Post("cypher")
  async executeCypher(@Body() body: { query: string; params?: any }) {
    try {
      const { query, params = {} } = body;
      const result = await this.neo4jService.executeCypher(query, params);
      return this.formatSuccessResponse(
        result,
        "Cypher query executed successfully",
        result.length
      );
    } catch (error: any) {
      this.handleError(error, "Failed to execute Cypher query");
    }
  }
}
