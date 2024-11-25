import { Entity } from '../core';
import { JsonSchema } from './json-schema';

export const validMethods = ['POST', 'PUT', 'GET'] as const;
export type Method = (typeof validMethods)[number];

export interface IntegrationProps {
  name: string;
  method: Method;
  url: string;
  headers: object;
  sourceSchemaId: string;
  sourceSchema: JsonSchema;
  targetSchemaId: string;
  targetSchema: JsonSchema;
  mappingTemplate: object;
  jsonata: string;
}

export class Integration extends Entity<IntegrationProps> {
  private constructor(props: IntegrationProps, id?: string) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get method(): Method {
    return this.props.method;
  }

  get url(): string {
    return this.props.url;
  }

  get headers(): object {
    return this.props.headers;
  }

  get sourceSchemaId(): string {
    return this.props.sourceSchemaId;
  }

  get sourceSchema(): JsonSchema {
    return this.props.sourceSchema;
  }

  get targetSchemaId(): string {
    return this.props.targetSchemaId;
  }

  get targetSchema(): JsonSchema {
    return this.props.targetSchema;
  }

  get mappingTemplate(): object {
    return this.props.mappingTemplate;
  }

  get jsonata(): string {
    return this.props.jsonata;
  }

  static create(props: IntegrationProps, id?: string): Integration {
    return new Integration(props, id);
  }
}
